import type { Article, Product } from '../types';
import { STOREFRONT_CONFIG } from '../config/storefront';

const API_URL = (import.meta.env.VITE_SUITE_API_URL ?? 'https://api.suite.ng').replace(/\/+$/, '');
const NAIRA_PER_CATALOGUE_UNIT = 1_500;
export const CATALOGUE_UNIT_IN_KOBO = NAIRA_PER_CATALOGUE_UNIT * 100;

interface PublicListing {
  id: string;
  title: string;
  price: string | number;
  compareAtPrice: string | number | null;
  category: string;
  description: string | null;
  product: Partial<Product>;
  media: Array<{ url?: string }>;
}
interface PublicContent {
  kind: 'post' | 'page' | 'banner';
  slug: string;
  title: string;
  excerpt: string | null;
  body: Article['body'];
  heroMedia: { url?: string } | null;
  featured: boolean;
  publishedAt: string;
}
export interface PublicStorefront {
  slug: string;
  customDomain: string | null;
  name: string;
  description: string | null;
  currency: string;
  theme: Record<string, unknown>;
  deliveryConfig: Record<string, unknown>;
  seo: Record<string, unknown>;
  listings: PublicListing[];
  content: PublicContent[];
}

const category = (value: string): Product['category'] => {
  const allowed: Product['category'][] = ['iphone','mac','ipad','watch','airpods','samsung','gaming','laptops','audio','power','anker','accessories','gear','deals'];
  return allowed.includes(value as Product['category']) ? value as Product['category'] : 'accessories';
};

export async function fetchSuiteStorefront(signal?: AbortSignal): Promise<{ storefront: PublicStorefront; products: Product[]; articles: Article[] }> {
  const response = await fetch(`${API_URL}/public/storefronts/${encodeURIComponent(STOREFRONT_CONFIG.slug)}`, { signal });
  if (!response.ok) throw new Error('Storefront is unavailable');
  const data = await response.json() as PublicStorefront;
  const products = data.listings.map((listing): Product => {
    const supplied = listing.product;
    const image = supplied.imageUrl ?? listing.media[0]?.url ?? '';
    const price = Number(listing.price) / NAIRA_PER_CATALOGUE_UNIT;
    const original = listing.compareAtPrice === null ? undefined : Number(listing.compareAtPrice) / NAIRA_PER_CATALOGUE_UNIT;
    return {
      id: listing.id, name: listing.title, tagline: supplied.tagline ?? listing.description ?? '',
      condition: supplied.condition ?? 'new', category: category(listing.category), price,
      ...(original === undefined ? {} : { originalPrice: original }), monthlyPrice: supplied.monthlyPrice ?? price / 24,
      rating: supplied.rating ?? 0, reviewCount: supplied.reviewCount ?? 0,
      colors: supplied.colors?.length ? supplied.colors : [{ name: 'Standard', hex: '#d4d4d4', image }],
      ...(supplied.storageOptions ? { storageOptions: supplied.storageOptions } : {}),
      ...(supplied.optionGroups ? { optionGroups: supplied.optionGroups } : {}),
      imageUrl: image, ...(supplied.additionalImages ? { additionalImages: supplied.additionalImages } : {}),
      // A published listing is an offer the merchant can fulfil or source. It
      // is deliberately independent of today's counted inventory units.
      inStock: true, pickupAvailable: supplied.pickupAvailable ?? true,
      specs: supplied.specs ?? {}, description: supplied.description ?? listing.description ?? '',
      reviews: supplied.reviews ?? [], ...(supplied.preOwned ? { preOwned: supplied.preOwned } : {}),
    };
  });
  const articles = data.content.filter((entry) => entry.kind === 'post').map((entry): Article => ({
    slug: entry.slug, title: entry.title, dek: entry.excerpt ?? '', category: 'TechieBase',
    date: entry.publishedAt, readMinutes: Math.max(1, Math.ceil(JSON.stringify(entry.body).length / 1200)),
    image: entry.heroMedia?.url ?? '', featured: entry.featured, body: entry.body,
  }));
  return { storefront: data, products, articles };
}

export interface SuiteCheckoutResponse {
  reference: string;
  statusToken: string;
  status: 'pending';
  amountMinor: number;
  currency: string;
  checkoutUrl: string;
}

export async function createSuiteCheckout(input: {
  expectedAmountMinor: number;
  items: Array<{ listingId: string; quantity: number; selection: Record<string, string> }>;
  customer: { name: string; email: string; phone: string };
  fulfillment: { method: 'delivery' | 'pickup'; street?: string; city?: string; state?: string; postalCode?: string };
  company?: string;
}): Promise<SuiteCheckoutResponse> {
  const response = await fetch(`${API_URL}/public/storefronts/${encodeURIComponent(STOREFRONT_CONFIG.slug)}/checkout`, {
    method: 'POST',
    // text/plain makes this a simple cross-origin request. Suite still grants
    // response access only to the custom domain recorded for this storefront.
    headers: { 'content-type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(input),
  });
  const body = await response.json().catch(() => ({})) as Partial<SuiteCheckoutResponse> & { error?: string };
  if (!response.ok || typeof body.checkoutUrl !== 'string') {
    throw new Error(body.error ?? 'Secure checkout is temporarily unavailable.');
  }
  return body as SuiteCheckoutResponse;
}

export async function fetchSuiteOrderStatus(reference: string, token: string): Promise<{
  reference: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'expired' | 'refunded';
  amountMinor: number;
  currency: string;
  storefrontName: string;
  createdAt: string;
  paidAt: string | null;
}> {
  const response = await fetch(
    `${API_URL}/public/storefronts/${encodeURIComponent(STOREFRONT_CONFIG.slug)}/orders/${encodeURIComponent(reference)}?token=${encodeURIComponent(token)}`,
    { cache: 'no-store' },
  );
  if (!response.ok) throw new Error('We could not verify this order.');
  return response.json();
}
