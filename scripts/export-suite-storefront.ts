import { ARTICLES } from '../src/data/articles.ts';
import { PRODUCTS } from '../src/data/products.ts';
import type { Product } from '../src/types.ts';

const SITE_ORIGIN = 'https://techiebaseng.com';
const NAIRA_PER_CATALOGUE_UNIT = 1_500;
const SOURCE = 'techiebase-static-catalogue';

const slugify = (value: string): string => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const absoluteUrl = (value: string): string => value.startsWith('/') ? `${SITE_ORIGIN}${value}` : value;

function manufacturerFor(product: Product): string {
  if (['iphone', 'mac', 'ipad', 'watch', 'airpods'].includes(product.category)) return 'Apple';
  if (product.category === 'samsung') return 'Samsung';
  if (product.category === 'anker') return 'Anker';

  const prefixes: Array<[RegExp, string]> = [
    [/^(?:PlayStation|DualSense)/i, 'Sony'], [/^Xbox/i, 'Microsoft'], [/^Nintendo/i, 'Nintendo'],
    [/^ASUS/i, 'Asus'], [/^Lenovo/i, 'Lenovo'], [/^HP\b/i, 'HP'], [/^Dell/i, 'Dell'],
    [/^Acer/i, 'Acer'], [/^Sony/i, 'Sony'], [/^Bose/i, 'Bose'], [/^JBL/i, 'JBL'],
    [/^Anker/i, 'Anker'], [/^Marshall/i, 'Marshall'], [/^Bang & Olufsen/i, 'Bang & Olufsen'],
    [/^DJI/i, 'DJI'], [/^Apple/i, 'Apple'], [/^AirTag/i, 'Apple'], [/^iPhone/i, 'Apple'],
    [/^EA SPORTS/i, 'EA'], [/^Call of Duty/i, 'Activision'], [/^Grand Theft Auto/i, 'Rockstar Games'],
    [/^Mario Kart/i, 'Nintendo'], [/^TechieBase/i, 'TechieBase'],
  ];
  return prefixes.find(([pattern]) => pattern.test(product.name))?.[1] ?? 'Generic';
}

function catalogueName(title: string, manufacturer: string): string {
  const escaped = manufacturer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const withoutManufacturer = title.replace(new RegExp(`^${escaped}\\s+`, 'i'), '').trim();
  return withoutManufacturer || title;
}

function catalogueCategory(product: Product): string {
  if (product.category === 'iphone' || product.category === 'samsung') return 'Phone';
  if (product.category === 'ipad') return 'Tablet';
  if (product.category === 'mac' || product.category === 'laptops') return 'Laptop';
  if (product.category === 'watch') return 'Smartwatch';
  if (product.category === 'airpods' || product.category === 'audio') return 'Audio';
  if (product.category === 'gaming') return 'Gaming Console';
  if (['accessories', 'anker', 'power'].includes(product.category)) return 'Accessory';
  return 'Other Gadget';
}

function productPayload(product: Product): Product {
  return {
    ...structuredClone(product),
    price: product.price * NAIRA_PER_CATALOGUE_UNIT,
    ...(product.originalPrice === undefined ? {} : { originalPrice: product.originalPrice * NAIRA_PER_CATALOGUE_UNIT }),
    monthlyPrice: product.monthlyPrice * NAIRA_PER_CATALOGUE_UNIT,
    ...(product.storageOptions ? {
      storageOptions: product.storageOptions.map((option) => ({
        ...option, priceDelta: option.priceDelta * NAIRA_PER_CATALOGUE_UNIT,
      })),
    } : {}),
    imageUrl: absoluteUrl(product.imageUrl),
    ...(product.additionalImages ? { additionalImages: product.additionalImages.map(absoluteUrl) } : {}),
    colors: product.colors.map((color) => ({
      ...color,
      ...(color.image ? { image: absoluteUrl(color.image) } : {}),
    })),
    ...(product.optionGroups ? {
      optionGroups: product.optionGroups.map((group) => ({
        ...group,
        choices: group.choices.map((choice) => ({
          ...choice,
          priceDelta: choice.priceDelta * NAIRA_PER_CATALOGUE_UNIT,
          ...(choice.image ? { image: absoluteUrl(choice.image) } : {}),
        })),
      })),
    } : {}),
  };
}

const products = PRODUCTS.map((product) => {
  const payload = productPayload(product);
  const manufacturer = manufacturerFor(product);
  const media = [payload.imageUrl, ...(payload.additionalImages ?? []),
    ...payload.colors.flatMap((color) => color.image ? [color.image] : []),
    ...(payload.optionGroups ?? []).flatMap((group) => group.choices.flatMap((choice) => choice.image ? [choice.image] : []))];
  return {
    sourceId: product.id,
    manufacturer,
    catalogName: catalogueName(product.name, manufacturer),
    catalogCategory: catalogueCategory(product),
    storageOptions: product.storageOptions?.map((option) => option.capacity) ?? [],
    listing: {
      slug: slugify(product.id), title: product.name, description: product.description,
      price: product.price * NAIRA_PER_CATALOGUE_UNIT,
      compareAtPrice: product.originalPrice === undefined ? null : product.originalPrice * NAIRA_PER_CATALOGUE_UNIT,
      status: 'published', featured: product.badge === 'BEST SELLER' || product.badge === 'NEW',
      category: product.category, product: payload,
      media: [...new Set(media)].map((url) => ({ url })),
      seo: { source: SOURCE, sourceId: product.id },
    },
  };
});

const content = ARTICLES.map((article) => ({
  sourceId: article.slug, kind: 'post', slug: article.slug, title: article.title,
  excerpt: article.dek, body: article.body,
  heroMedia: article.image ? { url: absoluteUrl(article.image) } : null,
  seo: { source: SOURCE, sourceId: article.slug }, status: 'published',
  featured: article.featured ?? false, publishedAt: new Date(article.date).toISOString(),
}));

process.stdout.write(JSON.stringify({
  version: 1, source: SOURCE,
  storefront: {
    name: 'TechieBase',
    description: 'Phones, laptops, gaming, audio and everyday technology from TechieBase.',
    customDomain: 'techiebaseng.com', currency: 'NGN', theme: {},
    deliveryConfig: { contact: { whatsApp: '2348143270982' } },
    seo: { title: 'TechieBase', description: 'Shop phones, laptops, gaming, audio and everyday technology.' },
  },
  products, content,
}));
