import type { Article, Product } from '../types';

const API_URL = (import.meta.env.VITE_SUITE_API_URL ?? 'https://api.suite.ng').replace(/\/+$/, '');
const STOREFRONT = import.meta.env.VITE_SUITE_STOREFRONT ?? 'techiebase';
const NAIRA_PER_CATALOGUE_UNIT = 1_500;

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
interface PublicStorefront { listings: PublicListing[]; content: PublicContent[] }

const category = (value: string): Product['category'] => {
  const allowed: Product['category'][] = ['iphone','mac','ipad','watch','airpods','samsung','gaming','laptops','audio','power','anker','accessories','gear','deals'];
  return allowed.includes(value as Product['category']) ? value as Product['category'] : 'accessories';
};

export async function fetchSuiteStorefront(signal?: AbortSignal): Promise<{ products: Product[]; articles: Article[] }> {
  const response = await fetch(`${API_URL}/public/storefronts/${encodeURIComponent(STOREFRONT)}`, { signal });
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
      inStock: supplied.inStock ?? true, pickupAvailable: supplied.pickupAvailable ?? true,
      specs: supplied.specs ?? {}, description: supplied.description ?? listing.description ?? '',
      reviews: supplied.reviews ?? [], ...(supplied.preOwned ? { preOwned: supplied.preOwned } : {}),
    };
  });
  const articles = data.content.filter((entry) => entry.kind === 'post').map((entry): Article => ({
    slug: entry.slug, title: entry.title, dek: entry.excerpt ?? '', category: 'TechieBase',
    date: entry.publishedAt, readMinutes: Math.max(1, Math.ceil(JSON.stringify(entry.body).length / 1200)),
    image: entry.heroMedia?.url ?? '', featured: entry.featured, body: entry.body,
  }));
  return { products, articles };
}
