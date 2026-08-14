import { PreOwnedDetail, Product, ProductBundle, ProductColor, StoreLocation, TradeInQuote } from '../types';

export const STORE_LOCATIONS: StoreLocation[] = [
  { id: 'ikeja', name: 'TechieBase Ikeja', address: '2A Olaide Tomori Street, Ikeja, Lagos', status: 'In Stock for Today\'s Pickup', distance: 'Ikeja' },
  { id: 'lekki', name: 'TechieBase Lekki', address: 'Admiralty Way, Lekki Phase 1, Lagos', status: 'In Stock for Today\'s Pickup', distance: 'Lekki' },
  { id: 'abuja', name: 'TechieBase Abuja', address: 'Wuse 2, Abuja, FCT', status: 'Order now for Pickup Tomorrow', distance: 'Abuja' },
  { id: 'port-harcourt', name: 'TechieBase Port Harcourt', address: 'GRA Phase 2, Port Harcourt, Rivers', status: 'Order now for Pickup Tomorrow', distance: 'Port Harcourt' },
];

type IPhoneSeed = {
  id: string;
  name: string;
  generation: number;
  price: number;
  display: string;
  chip: string;
  camera: string;
  storage: string[];
  tagline: string;
  finish: 'classic' | 'modern' | 'pro' | 'air';
  colors?: ProductColor[];
  badge?: Product['badge'];
};

const IPHONE_FINISHES: Record<IPhoneSeed['finish'], ProductColor[]> = {
  classic: [
    { name: 'Black', hex: '#202124' },
    { name: 'White', hex: '#f2f1ed' },
    { name: 'Red', hex: '#b8202a' },
  ],
  modern: [
    { name: 'Black', hex: '#272729' },
    { name: 'Blue', hex: '#a7c1d9' },
    { name: 'Pink', hex: '#e8c7c8' },
    { name: 'White', hex: '#f3f2ee' },
  ],
  pro: [
    { name: 'Natural Titanium', hex: '#aaa196' },
    { name: 'Black Titanium', hex: '#2f3032' },
    { name: 'White Titanium', hex: '#e7e5df' },
  ],
  air: [
    { name: 'Space Black', hex: '#242526' },
    { name: 'Cloud White', hex: '#f1f2ed' },
    { name: 'Sky Blue', hex: '#bfd2de' },
    { name: 'Light Gold', hex: '#e6d8ba' },
  ],
};

const IPHONE_IMAGES = {
  classic: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
  modern: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&q=85',
  latest: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=85',
};

const IPHONE_PRODUCT_MEDIA: Partial<Record<string, { main: string; gallery: string[] }>> = {
  'iphone-17e': {
    main: '/images/products/apple/iphone-17e-lineup.webp',
    gallery: ['/images/products/apple/iphone-17e.webp'],
  },
  'iphone-17': {
    main: '/images/products/apple/iphone-17.webp',
    gallery: ['/images/products/apple/iphone-17-lineup.webp'],
  },
  'iphone-air': {
    main: '/images/products/apple/iphone-air.webp',
    gallery: ['/images/products/apple/iphone-air-profile.webp'],
  },
  'iphone-17-pro': {
    main: '/images/products/apple/iphone-17-pro.webp',
    gallery: ['/images/products/apple/iphone-17-pro-orange.webp'],
  },
  'iphone-17-pro-max': {
    main: '/images/products/apple/iphone-17-pro.webp',
    gallery: ['/images/products/apple/iphone-17-pro-orange.webp'],
  },
  'iphone-16e': {
    main: '/images/products/apple/iphone-16e.webp',
    gallery: ['/images/products/apple/iphone-16e-lineup.webp'],
  },
  'iphone-16': {
    main: '/images/products/apple/iphone-16.webp',
    gallery: ['/images/products/apple/iphone-16-lineup.webp'],
  },
  'iphone-16-plus': {
    main: '/images/products/apple/iphone-16.webp',
    gallery: ['/images/products/apple/iphone-16-lineup.webp'],
  },
  'iphone-15': {
    main: '/images/products/apple/iphone15.webp',
    gallery: ['/images/products/apple/iphone15lineup.webp'],
  },
  'iphone-15-plus': {
    main: '/images/products/apple/iphone15.webp',
    gallery: ['/images/products/apple/iphone15lineup.webp'],
  },
  'iphone-15-pro': {
    main: '/images/products/apple/iphone15pro.webp',
    gallery: ['/images/products/apple/iphone15prolineup.webp'],
  },
  'iphone-15-pro-max': {
    main: '/images/products/apple/iphone15pro.webp',
    gallery: ['/images/products/apple/iphone15prolineup.webp'],
  },
  'iphone-14': {
    main: '/images/products/apple/iphone14.webp',
    gallery: ['/images/products/apple/iphone14lineup.webp'],
  },
  'iphone-14-plus': {
    main: '/images/products/apple/iphone14.webp',
    gallery: ['/images/products/apple/iphone14lineup.webp'],
  },
  'iphone-14-pro': {
    main: '/images/products/apple/iphone14pro.webp',
    gallery: ['/images/products/apple/iphone14prolineup.webp'],
  },
  'iphone-14-pro-max': {
    main: '/images/products/apple/iphone14pro.webp',
    gallery: ['/images/products/apple/iphone14prolineup.webp'],
  },
  'iphone-13-mini': {
    main: '/images/products/apple/iphone13.webp',
    gallery: ['/images/products/apple/iphone13lineup.webp'],
  },
  'iphone-13': {
    main: '/images/products/apple/iphone13.webp',
    gallery: ['/images/products/apple/iphone13lineup.webp'],
  },
  'iphone-13-pro': {
    main: '/images/products/apple/iphone13pro.webp',
    gallery: ['/images/products/apple/iphone13prolineup.webp'],
  },
  'iphone-13-pro-max': {
    main: '/images/products/apple/iphone13pro.webp',
    gallery: ['/images/products/apple/iphone13prolineup.webp'],
  },
};

const IPHONE_SEEDS: IPhoneSeed[] = [
  {
    id: 'iphone-17e', name: 'iPhone 17e', generation: 17, price: 599,
    display: '6.1-inch Super Retina XDR display', chip: 'A19 chip', camera: '48MP Fusion camera',
    storage: ['256GB', '512GB'], tagline: 'Essential power. Exceptional value.', finish: 'modern', badge: 'NEW',
    colors: [
      { name: 'Black', hex: '#202124' },
      { name: 'White', hex: '#f4f3ef' },
      { name: 'Soft Pink', hex: '#ebcfd0' },
    ],
  },
  {
    id: 'iphone-17', name: 'iPhone 17', generation: 17, price: 799,
    display: '6.3-inch Super Retina XDR display with ProMotion', chip: 'A19 chip', camera: '48MP Dual Fusion camera system',
    storage: ['256GB', '512GB'], tagline: 'More delightful. More durable. More capable.', finish: 'modern', badge: 'NEW',
    colors: [
      { name: 'Black', hex: '#272729' },
      { name: 'Lavender', hex: '#d3cae1' },
      { name: 'Mist Blue', hex: '#c6d9e4' },
      { name: 'Sage', hex: '#b9c5ad' },
      { name: 'White', hex: '#f3f2ee' },
    ],
  },
  {
    id: 'iphone-air', name: 'iPhone Air', generation: 17, price: 999,
    display: '6.5-inch Super Retina XDR display with ProMotion', chip: 'A19 Pro chip', camera: '48MP Fusion camera',
    storage: ['256GB', '512GB', '1TB'], tagline: 'The thinnest iPhone ever. Pro power inside.', finish: 'air', badge: 'NEW',
  },
  {
    id: 'iphone-17-pro', name: 'iPhone 17 Pro', generation: 17, price: 1099,
    display: '6.3-inch Super Retina XDR display with ProMotion', chip: 'A19 Pro chip', camera: '48MP Pro Fusion camera system',
    storage: ['256GB', '512GB', '1TB'], tagline: 'The most powerful iPhone experience.', finish: 'pro', badge: 'NEW',
    colors: [
      { name: 'Deep Blue', hex: '#263147' },
      { name: 'Cosmic Orange', hex: '#d96b32' },
      { name: 'Silver', hex: '#d7d5cf' },
    ],
  },
  {
    id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', generation: 17, price: 1199,
    display: '6.9-inch Super Retina XDR display with ProMotion', chip: 'A19 Pro chip', camera: '48MP Pro Fusion camera system',
    storage: ['256GB', '512GB', '1TB', '2TB'], tagline: 'Maximum performance. Maximum battery life.', finish: 'pro', badge: 'NEW',
    colors: [
      { name: 'Deep Blue', hex: '#263147' },
      { name: 'Cosmic Orange', hex: '#d96b32' },
      { name: 'Silver', hex: '#d7d5cf' },
    ],
  },
  {
    id: 'iphone-16e', name: 'iPhone 16e', generation: 16, price: 599,
    display: '6.1-inch Super Retina XDR display', chip: 'A18 chip', camera: '48MP 2-in-1 camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'Built for Apple Intelligence. Priced for more people.', finish: 'modern', badge: 'POPULAR',
    colors: [
      { name: 'Black', hex: '#242426' },
      { name: 'White', hex: '#f2f1ed' },
    ],
  },
  {
    id: 'iphone-16', name: 'iPhone 16', generation: 16, price: 799,
    display: '6.1-inch Super Retina XDR display', chip: 'A18 chip', camera: '48MP Fusion camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'Camera Control. Action button. A18 power.', finish: 'modern', badge: 'POPULAR',
    colors: [
      { name: 'Black', hex: '#242426' },
      { name: 'White', hex: '#f2f1ed' },
      { name: 'Pink', hex: '#e8b9ca' },
      { name: 'Teal', hex: '#7aa6a1' },
      { name: 'Ultramarine', hex: '#6267a9' },
    ],
  },
  {
    id: 'iphone-16-plus', name: 'iPhone 16 Plus', generation: 16, price: 899,
    display: '6.7-inch Super Retina XDR display', chip: 'A18 chip', camera: '48MP Fusion camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'A bigger display and outstanding battery life.', finish: 'modern',
    colors: [
      { name: 'Black', hex: '#242426' },
      { name: 'White', hex: '#f2f1ed' },
      { name: 'Pink', hex: '#e8b9ca' },
      { name: 'Teal', hex: '#7aa6a1' },
      { name: 'Ultramarine', hex: '#6267a9' },
    ],
  },
  {
    id: 'iphone-15', name: 'iPhone 15', generation: 15, price: 699,
    display: '6.1-inch Super Retina XDR display with Dynamic Island', chip: 'A16 Bionic chip', camera: '48MP Main camera',
    storage: ['128GB', '256GB', '512GB'], tagline: 'Dynamic Island. USB-C. A huge leap for the camera.', finish: 'modern', badge: 'POPULAR',
    colors: [
      { name: 'Black', hex: '#242426' },
      { name: 'Blue', hex: '#cad7dc' },
      { name: 'Green', hex: '#cad4c5' },
      { name: 'Yellow', hex: '#e8dfa9' },
      { name: 'Pink', hex: '#e6c7c9' },
    ],
  },
  {
    id: 'iphone-15-plus', name: 'iPhone 15 Plus', generation: 15, price: 799,
    display: '6.7-inch Super Retina XDR display with Dynamic Island', chip: 'A16 Bionic chip', camera: '48MP Main camera',
    storage: ['128GB', '256GB', '512GB'], tagline: 'More screen. More battery. More to love.', finish: 'modern',
    colors: [
      { name: 'Black', hex: '#242426' },
      { name: 'Blue', hex: '#cad7dc' },
      { name: 'Green', hex: '#cad4c5' },
      { name: 'Yellow', hex: '#e8dfa9' },
      { name: 'Pink', hex: '#e6c7c9' },
    ],
  },
  {
    id: 'iphone-15-pro', name: 'iPhone 15 Pro', generation: 15, price: 899,
    display: '6.1-inch Super Retina XDR display with ProMotion', chip: 'A17 Pro chip', camera: '48MP Pro camera system',
    storage: ['128GB', '256GB', '512GB', '1TB'], tagline: 'Titanium design. A17 Pro. Action button.', finish: 'pro', badge: 'POPULAR',
    colors: [
      { name: 'Black Titanium', hex: '#3c3b3a' },
      { name: 'White Titanium', hex: '#f2f1ed' },
      { name: 'Blue Titanium', hex: '#4d5965' },
      { name: 'Natural Titanium', hex: '#a99f91' },
    ],
  },
  {
    id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', generation: 15, price: 999,
    display: '6.7-inch Super Retina XDR display with ProMotion', chip: 'A17 Pro chip', camera: '48MP Pro system with 5x Telephoto',
    storage: ['256GB', '512GB', '1TB'], tagline: 'The ultimate titanium iPhone with 5x zoom.', finish: 'pro',
    colors: [
      { name: 'Black Titanium', hex: '#3c3b3a' },
      { name: 'White Titanium', hex: '#f2f1ed' },
      { name: 'Blue Titanium', hex: '#4d5965' },
      { name: 'Natural Titanium', hex: '#a99f91' },
    ],
  },
  {
    id: 'iphone-14', name: 'iPhone 14', generation: 14, price: 599,
    display: '6.1-inch Super Retina XDR display', chip: 'A15 Bionic chip', camera: 'Advanced dual-camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'A brilliant display with dependable all-day power.', finish: 'modern', badge: 'POPULAR',
    colors: [
      { name: 'Midnight', hex: '#252b2d' },
      { name: 'Blue', hex: '#a9c1d0' },
      { name: 'Starlight', hex: '#f0ebe3' },
      { name: 'Purple', hex: '#d5ced8' },
      { name: '(PRODUCT)RED', hex: '#b51f2a' },
    ],
  },
  {
    id: 'iphone-14-plus', name: 'iPhone 14 Plus', generation: 14, price: 699,
    display: '6.7-inch Super Retina XDR display', chip: 'A15 Bionic chip', camera: 'Advanced dual-camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'Big-screen versatility and excellent battery life.', finish: 'modern',
    colors: [
      { name: 'Midnight', hex: '#252b2d' },
      { name: 'Blue', hex: '#a9c1d0' },
      { name: 'Starlight', hex: '#f0ebe3' },
      { name: 'Purple', hex: '#d5ced8' },
      { name: '(PRODUCT)RED', hex: '#b51f2a' },
    ],
  },
  {
    id: 'iphone-14-pro', name: 'iPhone 14 Pro', generation: 14, price: 799,
    display: '6.1-inch Always-On display with ProMotion', chip: 'A16 Bionic chip', camera: '48MP Pro camera system',
    storage: ['128GB', '256GB', '512GB', '1TB'], tagline: 'Dynamic Island and a powerful 48MP Pro camera.', finish: 'pro',
    colors: [
      { name: 'Space Black', hex: '#343437' },
      { name: 'Silver', hex: '#e3e2dd' },
      { name: 'Gold', hex: '#d4c5b2' },
      { name: 'Deep Purple', hex: '#5b5664' },
    ],
  },
  {
    id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', generation: 14, price: 899,
    display: '6.7-inch Always-On display with ProMotion', chip: 'A16 Bionic chip', camera: '48MP Pro camera system',
    storage: ['128GB', '256GB', '512GB', '1TB'], tagline: 'The expansive Pro experience with all-day battery.', finish: 'pro',
    colors: [
      { name: 'Space Black', hex: '#343437' },
      { name: 'Silver', hex: '#e3e2dd' },
      { name: 'Gold', hex: '#d4c5b2' },
      { name: 'Deep Purple', hex: '#5b5664' },
    ],
  },
  {
    id: 'iphone-13-mini', name: 'iPhone 13 mini', generation: 13, price: 449,
    display: '5.4-inch Super Retina XDR display', chip: 'A15 Bionic chip', camera: 'Dual 12MP camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'Serious power in a delightfully compact design.', finish: 'modern', badge: 'POPULAR',
    colors: [
      { name: 'Pink', hex: '#e8c7c8' },
      { name: 'Blue', hex: '#56798b' },
      { name: 'Midnight', hex: '#232a2d' },
      { name: 'Starlight', hex: '#f1ebe1' },
      { name: '(PRODUCT)RED', hex: '#b8202a' },
    ],
  },
  {
    id: 'iphone-13', name: 'iPhone 13', generation: 13, price: 499,
    display: '6.1-inch Super Retina XDR display', chip: 'A15 Bionic chip', camera: 'Dual 12MP camera system',
    storage: ['128GB', '256GB', '512GB'], tagline: 'A bright OLED display and excellent everyday camera.', finish: 'modern', badge: 'POPULAR',
    colors: [
      { name: 'Pink', hex: '#e8c7c8' },
      { name: 'Blue', hex: '#56798b' },
      { name: 'Midnight', hex: '#232a2d' },
      { name: 'Starlight', hex: '#f1ebe1' },
      { name: '(PRODUCT)RED', hex: '#b8202a' },
    ],
  },
  {
    id: 'iphone-13-pro', name: 'iPhone 13 Pro', generation: 13, price: 599,
    display: '6.1-inch Super Retina XDR display with ProMotion', chip: 'A15 Bionic chip', camera: '12MP Pro camera system',
    storage: ['128GB', '256GB', '512GB', '1TB'], tagline: 'ProMotion, pro cameras, and enduring performance.', finish: 'pro',
    colors: [
      { name: 'Graphite', hex: '#54524f' },
      { name: 'Gold', hex: '#d9c7ad' },
      { name: 'Silver', hex: '#e7e4df' },
      { name: 'Sierra Blue', hex: '#9bb5c7' },
    ],
  },
  {
    id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', generation: 13, price: 649,
    display: '6.7-inch Super Retina XDR display with ProMotion', chip: 'A15 Bionic chip', camera: '12MP Pro camera system',
    storage: ['128GB', '256GB', '512GB', '1TB'], tagline: 'A cinematic camera and a massive ProMotion display.', finish: 'pro',
    colors: [
      { name: 'Graphite', hex: '#54524f' },
      { name: 'Gold', hex: '#d9c7ad' },
      { name: 'Silver', hex: '#e7e4df' },
      { name: 'Sierra Blue', hex: '#9bb5c7' },
    ],
  },
  {
    id: 'iphone-12-mini', name: 'iPhone 12 mini', generation: 12, price: 349,
    display: '5.4-inch Super Retina XDR display', chip: 'A14 Bionic chip', camera: 'Dual 12MP camera system',
    storage: ['64GB', '128GB', '256GB'], tagline: 'Compact, capable, and ready for 5G.', finish: 'classic', badge: 'POPULAR',
  },
  {
    id: 'iphone-12', name: 'iPhone 12', generation: 12, price: 399,
    display: '6.1-inch Super Retina XDR display', chip: 'A14 Bionic chip', camera: 'Dual 12MP camera system',
    storage: ['64GB', '128GB', '256GB'], tagline: 'OLED brilliance, Ceramic Shield, and 5G.', finish: 'classic', badge: 'POPULAR',
  },
  {
    id: 'iphone-12-pro', name: 'iPhone 12 Pro', generation: 12, price: 499,
    display: '6.1-inch Super Retina XDR display', chip: 'A14 Bionic chip', camera: '12MP Pro camera system with LiDAR',
    storage: ['128GB', '256GB', '512GB'], tagline: 'A refined stainless-steel design with Pro cameras.', finish: 'pro',
  },
  {
    id: 'iphone-12-pro-max', name: 'iPhone 12 Pro Max', generation: 12, price: 549,
    display: '6.7-inch Super Retina XDR display', chip: 'A14 Bionic chip', camera: '12MP Pro camera system with LiDAR',
    storage: ['128GB', '256GB', '512GB'], tagline: 'A big-screen Pro camera experience built for 5G.', finish: 'pro',
  },
  {
    id: 'iphone-11', name: 'iPhone 11', generation: 11, price: 299,
    display: '6.1-inch Liquid Retina HD display', chip: 'A13 Bionic chip', camera: 'Dual 12MP camera system',
    storage: ['64GB', '128GB', '256GB'], tagline: 'A colourful classic with a reliable dual-camera system.', finish: 'classic', badge: 'POPULAR',
  },
  {
    id: 'iphone-11-pro', name: 'iPhone 11 Pro', generation: 11, price: 399,
    display: '5.8-inch Super Retina XDR display', chip: 'A13 Bionic chip', camera: 'Triple 12MP Pro camera system',
    storage: ['64GB', '256GB', '512GB'], tagline: 'The original triple-camera Pro iPhone.', finish: 'pro',
  },
  {
    id: 'iphone-11-pro-max', name: 'iPhone 11 Pro Max', generation: 11, price: 449,
    display: '6.5-inch Super Retina XDR display', chip: 'A13 Bionic chip', camera: 'Triple 12MP Pro camera system',
    storage: ['64GB', '256GB', '512GB'], tagline: 'A large OLED display with the classic Pro camera system.', finish: 'pro',
  },
];

const IPHONE_VARIANTS: Product[] = IPHONE_SEEDS.map((seed, index) => {
  const productMedia = IPHONE_PRODUCT_MEDIA[seed.id];
  const fallbackImageUrl = seed.generation >= 16
    ? IPHONE_IMAGES.latest
    : seed.generation >= 13
      ? IPHONE_IMAGES.modern
      : IPHONE_IMAGES.classic;
  const imageUrl = productMedia?.main ?? fallbackImageUrl;

  return {
    id: seed.id,
    name: seed.name,
    tagline: seed.tagline,
    condition: 'new',
    category: 'iphone',
    price: seed.price,
    originalPrice: seed.generation < 17 ? seed.price + 50 : undefined,
    monthlyPrice: Number((seed.price / 24).toFixed(2)),
    rating: seed.generation >= 16 ? 4.9 : seed.generation >= 14 ? 4.8 : 4.7,
    reviewCount: Math.max(420, 9800 - index * 287),
    colors: seed.colors ?? IPHONE_FINISHES[seed.finish],
    storageOptions: seed.storage.map((capacity, storageIndex) => ({
      capacity,
      priceDelta: [0, 100, 300, 500][storageIndex] || storageIndex * 200,
    })),
    imageUrl,
    additionalImages: productMedia?.gallery ?? [IPHONE_IMAGES.latest, IPHONE_IMAGES.modern, IPHONE_IMAGES.classic]
      .filter((image) => image !== imageUrl),
    badge: seed.badge,
    stockUrgency: seed.generation >= 16
      ? 'Available for express delivery or pickup in Ikeja'
      : 'Limited verified stock available',
    inStock: true,
    pickupAvailable: true,
    specs: {
      Display: seed.display,
      Chip: seed.chip,
      Camera: seed.camera,
      Connectivity: seed.generation >= 12 ? '5G cellular connectivity' : '4G LTE connectivity',
      Security: 'Face ID with Secure Enclave',
    },
    description: `${seed.name} combines ${seed.display.toLowerCase()}, ${seed.chip}, and a ${seed.camera.toLowerCase()} in a durable design. Every device is inspected and covered by the TechieBase warranty.`,
    reviews: [],
  };
});

/* ------------------------------------------------------------------------
   Beyond Apple: Samsung, gaming, Windows laptops, audio and power.
   These share one compact seed shape so a new line is a few lines of data
   rather than a 40-line object.

   NOTE: imagery is stock photography standing in for real product shots.
   Every URL below has been checked to resolve and to show the right kind of
   product, but the Apple-grade look needs cut-outs on white — see the
   storefront notes before launch.
   ------------------------------------------------------------------------ */

const CATALOG_IMAGES = {
  galaxyS: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85',
  galaxyUltra: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?auto=format&fit=crop&w=900&q=85',
  galaxyFold: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85',
  galaxyTab: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=900&q=85',
  galaxyWear: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
  ps5: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=85',
  ps5Console: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=900&q=85',
  controllers: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=900&q=85',
  xbox: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=900&q=85',
  xboxPad: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=900&q=85',
  gamingRig: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=85',
  gamingDesk: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85',
  gamingMouse: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=85',
  laptopDell: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=85',
  laptopSlim: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=85',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',
  headphonesAlt: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85',
  speaker: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85',
  powerBank: 'https://images.unsplash.com/photo-1619489646924-b4fce76b1db5?auto=format&fit=crop&w=900&q=85',
  charger: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85',
  adapters: 'https://images.unsplash.com/photo-1600490722773-35753aea6332?auto=format&fit=crop&w=900&q=85',
};

type CatalogSeed = {
  id: string;
  name: string;
  category: Product['category'];
  tagline: string;
  /** Catalogue price in USD; formatNaira applies the store's conversion rate. */
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  storage?: string[];
  image: string;
  badge?: Product['badge'];
  stockUrgency?: string;
  inStock?: boolean;
  specs: Record<string, string>;
  description: string;
};

const buildProduct = (seed: CatalogSeed): Product => ({
  id: seed.id,
  name: seed.name,
  tagline: seed.tagline,
  condition: 'new',
  category: seed.category,
  price: seed.price,
  originalPrice: seed.originalPrice,
  monthlyPrice: Number((seed.price / 24).toFixed(2)),
  rating: seed.rating,
  reviewCount: seed.reviewCount,
  colors: seed.colors,
  storageOptions: seed.storage?.map((capacity, index) => ({
    capacity,
    priceDelta: [0, 100, 250, 450][index] ?? index * 200,
  })),
  imageUrl: seed.image,
  badge: seed.badge,
  stockUrgency: seed.stockUrgency,
  inStock: seed.inStock ?? true,
  pickupAvailable: true,
  specs: seed.specs,
  description: seed.description,
  reviews: [],
});

const CATALOG_SEEDS: CatalogSeed[] = [
  /* --- Samsung --------------------------------------------------------- */
  {
    id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', category: 'samsung',
    tagline: 'The most powerful Galaxy. 200MP and a built-in S Pen.',
    price: 1250, originalPrice: 1350, rating: 4.8, reviewCount: 6120,
    storage: ['256GB', '512GB', '1TB'], image: CATALOG_IMAGES.galaxyUltra, badge: 'NEW',
    stockUrgency: 'Available for express delivery or pickup in Ikeja',
    colors: [
      { name: 'Titanium Black', hex: '#2b2b2d' },
      { name: 'Titanium Grey', hex: '#8d8d92' },
      { name: 'Titanium Silverblue', hex: '#b9c4d0' },
    ],
    specs: {
      Display: '6.9-inch QHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Elite for Galaxy',
      Camera: '200MP wide, 50MP ultra wide, 50MP + 10MP telephoto',
      Battery: '5,000mAh with 45W super fast charging',
      Extras: 'Built-in S Pen, Galaxy AI, IP68',
    },
    description: 'Galaxy S25 Ultra pairs a 200MP camera system with Snapdragon 8 Elite performance, a titanium frame and the S Pen built in. Sold with full Nigerian warranty and TechieBase setup support.',
  },
  {
    id: 'galaxy-s25-plus', name: 'Galaxy S25+', category: 'samsung',
    tagline: 'Big screen, big battery, Galaxy AI throughout.',
    price: 950, rating: 4.7, reviewCount: 3480,
    storage: ['256GB', '512GB'], image: CATALOG_IMAGES.galaxyS, badge: 'NEW',
    colors: [
      { name: 'Navy', hex: '#2f3a4b' },
      { name: 'Icy Blue', hex: '#c3d5e2' },
      { name: 'Mint', hex: '#cfe0cd' },
      { name: 'Silver Shadow', hex: '#b6b7ba' },
    ],
    specs: {
      Display: '6.7-inch QHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Elite for Galaxy',
      Camera: '50MP wide, 12MP ultra wide, 10MP telephoto',
      Battery: '4,900mAh with 45W fast charging',
      Extras: 'Galaxy AI, IP68, Armor Aluminium frame',
    },
    description: 'A larger Dynamic AMOLED display and all-day battery, with the same Galaxy AI toolkit as the Ultra. A strong everyday flagship for people who want screen size without the S Pen.',
  },
  {
    id: 'galaxy-s25', name: 'Galaxy S25', category: 'samsung',
    tagline: 'Flagship power in a genuinely compact body.',
    price: 800, rating: 4.7, reviewCount: 5210,
    storage: ['128GB', '256GB', '512GB'], image: CATALOG_IMAGES.galaxyS, badge: 'POPULAR',
    colors: [
      { name: 'Navy', hex: '#2f3a4b' },
      { name: 'Icy Blue', hex: '#c3d5e2' },
      { name: 'Mint', hex: '#cfe0cd' },
    ],
    specs: {
      Display: '6.2-inch FHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Elite for Galaxy',
      Camera: '50MP wide, 12MP ultra wide, 10MP telephoto',
      Battery: '4,000mAh with 25W fast charging',
      Extras: 'Galaxy AI, IP68, wireless PowerShare',
    },
    description: 'The compact Galaxy flagship. Same processor and Galaxy AI features as its larger siblings in a phone that still works one-handed.',
  },
  {
    id: 'galaxy-z-fold-6', name: 'Galaxy Z Fold6', category: 'samsung',
    tagline: 'A phone that opens into a tablet.',
    price: 1800, originalPrice: 1950, rating: 4.6, reviewCount: 1890,
    storage: ['256GB', '512GB', '1TB'], image: CATALOG_IMAGES.galaxyFold, badge: 'HOT DEAL',
    stockUrgency: 'Limited verified stock available',
    colors: [
      { name: 'Silver Shadow', hex: '#b6b7ba' },
      { name: 'Navy', hex: '#2f3a4b' },
      { name: 'Pink', hex: '#e3c3c8' },
    ],
    specs: {
      Display: '7.6-inch main AMOLED 2X + 6.3-inch cover display',
      Processor: 'Snapdragon 8 Gen 3 for Galaxy',
      Camera: '50MP wide, 12MP ultra wide, 10MP telephoto',
      Battery: '4,400mAh with 25W fast charging',
      Extras: 'IPX8, S Pen compatible, multi-window multitasking',
    },
    description: 'Z Fold6 unfolds a 7.6-inch display for real multitasking, then folds down to pocket size. The most capable device Samsung makes for people who work on their phone.',
  },
  {
    id: 'galaxy-z-flip-6', name: 'Galaxy Z Flip6', category: 'samsung',
    tagline: 'Full-size screen. Half the footprint.',
    price: 1100, rating: 4.6, reviewCount: 2740,
    storage: ['256GB', '512GB'], image: CATALOG_IMAGES.galaxyFold,
    colors: [
      { name: 'Blue', hex: '#5d7f9e' },
      { name: 'Yellow', hex: '#e8d08a' },
      { name: 'Mint', hex: '#cfe0cd' },
      { name: 'Silver Shadow', hex: '#b6b7ba' },
    ],
    specs: {
      Display: '6.7-inch FHD+ AMOLED 2X + 3.4-inch Flex Window',
      Processor: 'Snapdragon 8 Gen 3 for Galaxy',
      Camera: '50MP wide, 12MP ultra wide',
      Battery: '4,000mAh with 25W fast charging',
      Extras: 'FlexCam, IPX8, Galaxy AI',
    },
    description: 'A flagship that folds in half. The Flex Window handles replies, music and selfies without opening the phone.',
  },
  {
    id: 'galaxy-tab-s10-ultra', name: 'Galaxy Tab S10 Ultra', category: 'samsung',
    tagline: 'A 14.6-inch canvas with the S Pen in the box.',
    price: 1000, rating: 4.7, reviewCount: 1180,
    storage: ['256GB', '512GB', '1TB'], image: CATALOG_IMAGES.galaxyTab,
    colors: [
      { name: 'Moonstone Grey', hex: '#8a8d90' },
      { name: 'Platinum Silver', hex: '#c9cbcd' },
    ],
    specs: {
      Display: '14.6-inch Dynamic AMOLED 2X, 120Hz',
      Processor: 'MediaTek Dimensity 9300+',
      Battery: '11,200mAh with 45W fast charging',
      Audio: 'Quad speakers tuned by AKG',
      Extras: 'S Pen included, IP68, Samsung DeX',
    },
    description: 'The largest Galaxy Tab, built for drawing, split-screen work and media. DeX turns it into a desktop when you pair a keyboard.',
  },
  {
    id: 'galaxy-watch-7', name: 'Galaxy Watch7', category: 'samsung',
    tagline: 'Energy score, sleep coaching, and a brighter display.',
    price: 300, originalPrice: 330, rating: 4.5, reviewCount: 2260,
    image: CATALOG_IMAGES.galaxyWear,
    colors: [
      { name: 'Green', hex: '#5c6f5a' },
      { name: 'Cream', hex: '#e6ded1' },
      { name: 'Silver', hex: '#c4c6c9' },
    ],
    specs: {
      Display: 'Super AMOLED, up to 2,000 nits',
      Sensors: 'BioActive sensor, ECG, blood oxygen, skin temperature',
      Battery: 'Up to 40 hours with always-on display off',
      Durability: '5ATM + IP68, sapphire crystal glass',
      Compatibility: 'Android 11 or later',
    },
    description: 'Galaxy Watch7 tracks sleep, workouts and recovery, and gives you a daily energy score. Pairs with any recent Android phone.',
  },
  {
    id: 'galaxy-buds-3-pro', name: 'Galaxy Buds3 Pro', category: 'samsung',
    tagline: 'Adaptive ANC with 24-bit Hi-Fi sound.',
    price: 250, rating: 4.5, reviewCount: 1930,
    image: CATALOG_IMAGES.headphonesAlt,
    colors: [
      { name: 'Silver', hex: '#c4c6c9' },
      { name: 'White', hex: '#f2f1ee' },
    ],
    specs: {
      Audio: '2-way speaker with 24-bit Hi-Fi playback',
      'Noise Cancelling': 'Adaptive ANC with voice detect',
      Battery: 'Up to 26 hours with the case',
      Durability: 'IP57 water and dust resistance',
      Extras: 'Real-time interpreter, 360 Audio',
    },
    description: 'Buds3 Pro bring adaptive noise cancelling and Hi-Fi playback, with real-time interpretation when paired with a recent Galaxy phone.',
  },

  /* --- Gaming ---------------------------------------------------------- */
  {
    id: 'ps5-pro', name: 'PlayStation 5 Pro', category: 'gaming',
    tagline: 'Ray tracing, 8K output, and a 2TB SSD.',
    price: 700, rating: 4.8, reviewCount: 3410,
    image: CATALOG_IMAGES.ps5, badge: 'NEW',
    stockUrgency: 'High demand — reserve for pickup in Ikeja or Lekki',
    colors: [{ name: 'Glacier White', hex: '#f0f1f3' }],
    specs: {
      GPU: 'Custom RDNA-based GPU with advanced ray tracing',
      Storage: '2TB custom NVMe SSD',
      Resolution: 'Up to 8K output, 120fps at 4K',
      Upscaling: 'PlayStation Spectral Super Resolution',
      'In the box': 'Console, DualSense wireless controller, cables',
    },
    description: 'The most powerful PlayStation. PS5 Pro adds a larger GPU, AI upscaling and a 2TB drive, so the biggest titles run at higher frame rates without dropping resolution.',
  },
  {
    id: 'ps5-slim-disc', name: 'PlayStation 5 Slim (Disc)', category: 'gaming',
    tagline: 'The full PS5 library, discs included.',
    price: 550, originalPrice: 600, rating: 4.8, reviewCount: 8890,
    image: CATALOG_IMAGES.ps5Console, badge: 'BEST SELLER',
    stockUrgency: 'In stock for today\'s pickup',
    colors: [{ name: 'Glacier White', hex: '#f0f1f3' }],
    specs: {
      GPU: 'Custom RDNA 2 GPU with hardware ray tracing',
      Storage: '1TB custom NVMe SSD',
      Drive: 'Detachable Ultra HD Blu-ray disc drive',
      Resolution: 'Up to 4K at 120fps, 8K output support',
      'In the box': 'Console, DualSense wireless controller, cables',
    },
    description: 'The standard PS5 in its slimmer chassis, with the disc drive for physical games and 4K Blu-ray. Every console is sourced new and covered by the TechieBase warranty.',
  },
  {
    id: 'ps5-digital', name: 'PlayStation 5 Digital Edition', category: 'gaming',
    tagline: 'Same console, download-only, lower price.',
    price: 480, rating: 4.7, reviewCount: 5240,
    image: CATALOG_IMAGES.ps5Console, badge: 'POPULAR',
    colors: [{ name: 'Glacier White', hex: '#f0f1f3' }],
    specs: {
      GPU: 'Custom RDNA 2 GPU with hardware ray tracing',
      Storage: '1TB custom NVMe SSD',
      Drive: 'No disc drive — digital downloads only',
      Resolution: 'Up to 4K at 120fps',
      'In the box': 'Console, DualSense wireless controller, cables',
    },
    description: 'Identical performance to the disc model without the optical drive. The best value entry into the PS5 library if you buy games from the PlayStation Store.',
  },
  {
    id: 'dualsense-controller', name: 'DualSense Wireless Controller', category: 'gaming',
    tagline: 'Haptic feedback and adaptive triggers.',
    price: 75, rating: 4.7, reviewCount: 12400,
    image: CATALOG_IMAGES.controllers, badge: 'POPULAR',
    colors: [
      { name: 'White', hex: '#f0f1f3' },
      { name: 'Midnight Black', hex: '#25262a' },
      { name: 'Cosmic Red', hex: '#8e2733' },
      { name: 'Starlight Blue', hex: '#4f6f9c' },
    ],
    specs: {
      Feedback: 'Dual actuator haptics and adaptive triggers',
      Audio: 'Built-in microphone and 3.5mm headset jack',
      Battery: 'Rechargeable, roughly 12 hours per charge',
      Connectivity: 'Bluetooth and USB-C',
      Compatibility: 'PS5, PC and Mac',
    },
    description: 'The controller that made haptics matter. A second pad is the first thing most PS5 owners buy.',
  },
  {
    id: 'dualsense-edge', name: 'DualSense Edge Pro Controller', category: 'gaming',
    tagline: 'Swappable sticks, back paddles, saved profiles.',
    price: 200, rating: 4.5, reviewCount: 1620,
    image: CATALOG_IMAGES.controllers,
    colors: [{ name: 'White', hex: '#f0f1f3' }],
    specs: {
      Customisation: 'Swappable stick caps and back buttons',
      Profiles: 'Multiple saved control profiles per game',
      Triggers: 'Adjustable trigger travel stops',
      Parts: 'Replaceable stick modules',
      'In the box': 'Carry case, braided USB-C cable, spare components',
    },
    description: 'The competitive DualSense. Remap everything, shorten the triggers, and swap out stick modules instead of replacing the whole pad.',
  },
  {
    id: 'xbox-series-x', name: 'Xbox Series X', category: 'gaming',
    tagline: 'Microsoft\'s fastest, most powerful console.',
    price: 500, rating: 4.7, reviewCount: 6150,
    image: CATALOG_IMAGES.xbox,
    colors: [{ name: 'Carbon Black', hex: '#1f2124' }],
    specs: {
      GPU: '12 teraflops RDNA 2',
      Storage: '1TB custom NVMe SSD',
      Resolution: 'True 4K at up to 120fps',
      Drive: '4K UHD Blu-ray',
      Extras: 'Quick Resume, Smart Delivery, Game Pass ready',
    },
    description: 'Series X targets true 4K at high frame rates and pairs neatly with Game Pass. Quick Resume lets you hold several games suspended at once.',
  },
  {
    id: 'xbox-series-s', name: 'Xbox Series S', category: 'gaming',
    tagline: 'Compact, all-digital, Game Pass ready.',
    price: 300, originalPrice: 340, rating: 4.6, reviewCount: 4820,
    image: CATALOG_IMAGES.xboxPad,
    colors: [
      { name: 'Robot White', hex: '#f1f2f2' },
      { name: 'Carbon Black', hex: '#1f2124' },
    ],
    specs: {
      GPU: '4 teraflops RDNA 2',
      Storage: '512GB custom NVMe SSD',
      Resolution: 'Up to 1440p at 120fps',
      Drive: 'All-digital, no disc drive',
      Extras: 'Quick Resume, Game Pass ready',
    },
    description: 'The smallest current-gen console. Best paired with Game Pass on a 1080p or 1440p screen, where it punches far above its price.',
  },
  {
    id: 'nintendo-switch-oled', name: 'Nintendo Switch OLED', category: 'gaming',
    tagline: 'Handheld, tabletop, or docked to the TV.',
    price: 350, rating: 4.8, reviewCount: 9310,
    image: CATALOG_IMAGES.gamingDesk, badge: 'POPULAR',
    colors: [
      { name: 'White', hex: '#f2f2f0' },
      { name: 'Neon Red / Blue', hex: '#d63b30' },
    ],
    specs: {
      Display: '7-inch OLED touchscreen',
      Storage: '64GB internal, microSD expandable',
      Modes: 'Handheld, tabletop and docked TV play',
      Battery: 'Roughly 4.5 to 9 hours',
      Extras: 'Wide adjustable stand, wired LAN port in dock',
    },
    description: 'The OLED revision is the best way to play Nintendo\'s library handheld. Docking it turns the same console into a TV system in seconds.',
  },
  {
    id: 'gaming-headset-pro', name: 'Pro Wireless Gaming Headset', category: 'gaming',
    tagline: 'Low-latency wireless with a broadcast mic.',
    price: 100, rating: 4.4, reviewCount: 2140,
    image: CATALOG_IMAGES.headphones,
    colors: [
      { name: 'Black', hex: '#232427' },
      { name: 'White', hex: '#eeeeec' },
    ],
    specs: {
      Audio: '50mm drivers with virtual surround',
      Wireless: '2.4GHz low-latency USB-C dongle plus Bluetooth',
      Microphone: 'Detachable noise-cancelling boom mic',
      Battery: 'Up to 30 hours',
      Compatibility: 'PS5, Xbox, Switch, PC and mobile',
    },
    description: 'A wireless headset that switches between console and phone without re-pairing, with a detachable mic for party chat.',
  },
  {
    id: 'gaming-mouse-lightspeed', name: 'Lightspeed Wireless Gaming Mouse', category: 'gaming',
    tagline: '60g, 26K DPI, 70-hour battery.',
    price: 60, rating: 4.6, reviewCount: 3380,
    image: CATALOG_IMAGES.gamingMouse,
    colors: [
      { name: 'Black', hex: '#1e1f22' },
      { name: 'White', hex: '#f0f0ee' },
    ],
    specs: {
      Sensor: '26,000 DPI optical sensor',
      Weight: '60g lightweight shell',
      Battery: 'Up to 70 hours per charge',
      Switches: 'Optical switches rated to 100M clicks',
      Connectivity: '2.4GHz wireless and USB-C',
    },
    description: 'A lightweight competitive mouse with a wireless connection quick enough that most players cannot tell it from wired.',
  },
  {
    id: 'gaming-pc-starter', name: 'TechieBase Starter Gaming PC', category: 'gaming',
    tagline: 'Built, tested and delivered ready to play.',
    price: 1200, rating: 4.6, reviewCount: 480,
    image: CATALOG_IMAGES.gamingRig,
    stockUrgency: 'Built to order — about 5 working days',
    colors: [{ name: 'Black', hex: '#1c1d20' }],
    specs: {
      Processor: 'Ryzen 5 / Core i5 class, 6 cores',
      Graphics: '8GB dedicated GPU for 1080p and 1440p play',
      Memory: '16GB DDR5',
      Storage: '1TB NVMe SSD',
      Warranty: '12-month TechieBase build warranty',
    },
    description: 'A pre-built tower assembled and stress-tested in-store, sized for 1080p and 1440p gaming. We install Windows and your launchers before handover.',
  },

  /* --- Windows laptops -------------------------------------------------- */
  {
    id: 'dell-xps-15', name: 'Dell XPS 15', category: 'laptops',
    tagline: 'A creator laptop with a near-borderless display.',
    price: 1500, originalPrice: 1650, rating: 4.6, reviewCount: 2180,
    storage: ['512GB', '1TB', '2TB'], image: CATALOG_IMAGES.laptopDell, badge: 'BEST SELLER',
    colors: [{ name: 'Platinum Silver', hex: '#c8cacc' }],
    specs: {
      Display: '15.6-inch OLED 3.5K InfinityEdge, 100% DCI-P3',
      Processor: 'Intel Core Ultra 7',
      Graphics: 'NVIDIA RTX 4050 discrete graphics',
      Memory: '16GB LPDDR5',
      Build: 'CNC aluminium with carbon-fibre palm rest',
    },
    description: 'The XPS 15 is the Windows machine most often cross-shopped with a MacBook Pro: colour-accurate OLED, discrete graphics, and a chassis that holds up.',
  },
  {
    id: 'hp-spectre-x360', name: 'HP Spectre x360 14', category: 'laptops',
    tagline: 'A laptop and a tablet, hinged in the middle.',
    price: 1300, rating: 4.5, reviewCount: 1460,
    storage: ['512GB', '1TB'], image: CATALOG_IMAGES.laptopSlim,
    colors: [
      { name: 'Nightfall Black', hex: '#232529' },
      { name: 'Nocturne Blue', hex: '#3a4a5f' },
    ],
    specs: {
      Display: '14-inch 2.8K OLED touchscreen',
      Processor: 'Intel Core Ultra 7 with NPU',
      Memory: '16GB LPDDR5x',
      Battery: 'Up to 14 hours mixed use',
      Extras: 'Included stylus, 360-degree hinge, fingerprint reader',
    },
    description: 'A convertible that works as a laptop, folds flat for presenting, and takes pen input for notes. The OLED panel is a genuine step up from typical business laptops.',
  },
  {
    id: 'thinkpad-x1-carbon', name: 'Lenovo ThinkPad X1 Carbon', category: 'laptops',
    tagline: 'Under 1.1kg, built for people who travel.',
    price: 1600, rating: 4.7, reviewCount: 1920,
    storage: ['512GB', '1TB'], image: CATALOG_IMAGES.laptopSlim,
    colors: [{ name: 'Black', hex: '#1d1e21' }],
    specs: {
      Display: '14-inch 2.8K OLED, low blue light certified',
      Processor: 'Intel Core Ultra 7 vPro',
      Memory: '32GB LPDDR5x',
      Durability: 'MIL-STD-810H tested chassis',
      Keyboard: 'ThinkPad keyboard with TrackPoint',
    },
    description: 'The business ultrabook standard. Light enough to forget in a bag, with the best keyboard on any Windows laptop and enterprise-grade security built in.',
  },
  {
    id: 'asus-rog-strix-g16', name: 'ASUS ROG Strix G16', category: 'laptops',
    tagline: 'Desktop-class gaming in a 16-inch body.',
    price: 1400, originalPrice: 1550, rating: 4.5, reviewCount: 1340,
    storage: ['1TB', '2TB'], image: CATALOG_IMAGES.laptopDell, badge: 'HOT DEAL',
    colors: [{ name: 'Eclipse Grey', hex: '#3a3c40' }],
    specs: {
      Display: '16-inch QHD+ 240Hz, G-SYNC compatible',
      Processor: 'Intel Core i9 HX-series',
      Graphics: 'NVIDIA RTX 4070 with 140W total graphics power',
      Memory: '16GB DDR5, upgradable',
      Cooling: 'Tri-fan cooling with liquid metal on the CPU',
    },
    description: 'A gaming laptop that does not throttle under load. The 240Hz QHD+ panel and RTX 4070 handle competitive titles and creative work equally well.',
  },
  {
    id: 'acer-aspire-5', name: 'Acer Aspire 5', category: 'laptops',
    tagline: 'The dependable everyday laptop.',
    price: 550, originalPrice: 620, rating: 4.3, reviewCount: 4270,
    storage: ['256GB', '512GB'], image: CATALOG_IMAGES.laptopSlim, badge: 'POPULAR',
    colors: [{ name: 'Steel Grey', hex: '#8f9295' }],
    specs: {
      Display: '15.6-inch Full HD IPS',
      Processor: 'Intel Core i5 or AMD Ryzen 5',
      Memory: '8GB DDR4, upgradable to 32GB',
      Storage: 'NVMe SSD with a free second drive bay',
      Ports: 'USB-C, USB-A, HDMI, Ethernet',
    },
    description: 'The laptop we recommend most often for students and office work: fast enough for everything ordinary, easy to upgrade, and priced sensibly.',
  },

  /* --- Audio ------------------------------------------------------------ */
  {
    id: 'sony-wh-1000xm5', name: 'Sony WH-1000XM5', category: 'audio',
    tagline: 'Reference noise cancelling for long journeys.',
    price: 400, originalPrice: 450, rating: 4.8, reviewCount: 11200,
    image: CATALOG_IMAGES.headphones, badge: 'BEST SELLER',
    colors: [
      { name: 'Black', hex: '#232427' },
      { name: 'Silver', hex: '#dedbd4' },
      { name: 'Midnight Blue', hex: '#2c3a4d' },
    ],
    specs: {
      'Noise Cancelling': 'Dual processor with eight microphones',
      Battery: 'Up to 30 hours, 3 hours from a 3-minute charge',
      Audio: '30mm carbon-fibre drivers, LDAC and DSEE Extreme',
      Calls: 'Four beamforming mics with AI noise reduction',
      Extras: 'Speak-to-Chat, multipoint pairing, carry case',
    },
    description: 'Still the benchmark for noise cancelling on flights and in traffic. Multipoint pairing means your laptop and phone stay connected at the same time.',
  },
  {
    id: 'bose-qc-ultra', name: 'Bose QuietComfort Ultra', category: 'audio',
    tagline: 'Immersive Audio and Bose\'s quietest mode yet.',
    price: 430, rating: 4.7, reviewCount: 5640,
    image: CATALOG_IMAGES.headphonesAlt,
    colors: [
      { name: 'Black', hex: '#212226' },
      { name: 'White Smoke', hex: '#e7e5e0' },
    ],
    specs: {
      'Noise Cancelling': 'CustomTune adaptive cancellation',
      Audio: 'Bose Immersive Audio spatialisation',
      Battery: 'Up to 24 hours, 18 with Immersive Audio',
      Comfort: 'Plush synthetic leather earcups',
      Extras: 'Foldable design with hard carry case',
    },
    description: 'The most comfortable pair in this price range, with cancellation that adapts to the shape of your ears. Immersive Audio widens the stage for music and film.',
  },
  {
    id: 'jbl-charge-5', name: 'JBL Charge 5', category: 'audio',
    tagline: 'Waterproof, loud, and it charges your phone.',
    price: 180, rating: 4.6, reviewCount: 8930,
    image: CATALOG_IMAGES.speaker, badge: 'POPULAR',
    colors: [
      { name: 'Black', hex: '#232427' },
      { name: 'Blue', hex: '#3a6ea5' },
      { name: 'Red', hex: '#b23a35' },
      { name: 'Teal', hex: '#3f8f8b' },
    ],
    specs: {
      Audio: 'Racetrack driver with separate tweeter',
      Battery: 'Up to 20 hours, doubles as a power bank',
      Durability: 'IP67 waterproof and dustproof',
      Pairing: 'PartyBoost to link multiple JBL speakers',
      Charging: 'USB-C',
    },
    description: 'The portable speaker we sell most of. Genuinely waterproof, loud enough for a compound, and the built-in battery will top up a phone.',
  },
  {
    id: 'soundcore-q30', name: 'Anker Soundcore Life Q30', category: 'audio',
    tagline: 'Serious noise cancelling on a real budget.',
    price: 80, rating: 4.5, reviewCount: 15600,
    image: CATALOG_IMAGES.headphonesAlt, badge: 'POPULAR',
    colors: [
      { name: 'Black', hex: '#232427' },
      { name: 'Navy', hex: '#2f3a4b' },
    ],
    specs: {
      'Noise Cancelling': 'Hybrid ANC with transport, indoor and outdoor modes',
      Battery: 'Up to 40 hours with ANC on',
      Audio: '40mm drivers with a custom EQ app',
      Charging: '5 minutes for 4 hours of playback',
      Extras: 'Folding design with travel case',
    },
    description: 'The value pick. You give up some fit and call quality against the flagships, but the cancellation and 40-hour battery are remarkable at this price.',
  },
  {
    id: 'marshall-emberton-ii', name: 'Marshall Emberton II', category: 'audio',
    tagline: 'A pocket speaker that sounds like a room.',
    price: 170, rating: 4.6, reviewCount: 3120,
    image: CATALOG_IMAGES.speaker,
    colors: [
      { name: 'Black and Brass', hex: '#26251f' },
      { name: 'Cream', hex: '#e0d7c2' },
    ],
    specs: {
      Audio: 'True Stereophonic multi-directional sound',
      Battery: 'Over 30 hours of playtime',
      Durability: 'IP67 dust and water resistant',
      Charging: 'USB-C, 20 minutes for 6 hours',
      Extras: 'Stack mode to link multiple speakers',
    },
    description: 'Small enough for a bag, with the multi-directional sound Marshall calls True Stereophonic. The one to pick if you care how a speaker looks on a shelf.',
  },

  /* --- Power & charging ------------------------------------------------- */
  {
    id: 'anker-737-powerbank', name: 'Anker 737 Power Bank (24K)', category: 'anker',
    tagline: '24,000mAh and 140W — it charges laptops.',
    price: 150, rating: 4.7, reviewCount: 6480,
    image: CATALOG_IMAGES.powerBank, badge: 'BEST SELLER',
    stockUrgency: 'Popular during grid outages — stock moves quickly',
    colors: [{ name: 'Black', hex: '#1f2023' }],
    specs: {
      Capacity: '24,000mAh (86.4Wh)',
      Output: '140W max via USB-C, three ports total',
      Display: 'Smart digital display with live power draw',
      Recharge: 'Full recharge in about an hour at 140W',
      Compatibility: 'MacBook Pro, Windows laptops, phones, Switch',
    },
    description: 'Big enough to charge a MacBook Pro from empty and still refill a phone twice. The digital readout tells you exactly what is going in and out.',
  },
  {
    id: 'anker-gan-65w', name: 'Anker 65W GaN Charger', category: 'anker',
    tagline: 'One small brick for laptop, tablet and phone.',
    price: 60, rating: 4.8, reviewCount: 9120,
    image: CATALOG_IMAGES.charger, badge: 'POPULAR',
    colors: [
      { name: 'White', hex: '#f2f2f0' },
      { name: 'Black', hex: '#1f2023' },
    ],
    specs: {
      Output: '65W total across three ports',
      Technology: 'GaN II for a smaller, cooler body',
      Ports: 'Two USB-C, one USB-A',
      Safety: 'ActiveShield 2.0 temperature monitoring',
      Plug: 'UK three-pin',
    },
    description: 'Replaces the three separate bricks in your bag. Fast-charges a MacBook Air at full speed while topping up a phone and earbuds alongside it.',
  },
  {
    id: 'anker-maggo-3in1', name: 'Anker MagGo 3-in-1 Charging Station', category: 'anker',
    tagline: 'Foldable 15W Qi2 charging for iPhone, Watch and AirPods.',
    price: 110, originalPrice: 130, rating: 4.9, reviewCount: 3410,
    image: CATALOG_IMAGES.charger, badge: 'NEW',
    colors: [
      { name: 'Space Black', hex: '#1f2023' },
      { name: 'Glacier White', hex: '#f2f2f0' },
    ],
    specs: {
      Wireless: '15W Qi2 fast charging',
      Structure: 'Compact foldable design',
      Compatibility: 'iPhone 12 and later, Apple Watch and AirPods',
      Included: '40W USB-C wall charger and cable',
    },
    description: 'A tidy desk and travel charger. Set your iPhone upright for StandBy while charging your Watch and wireless earbuds at the same time.',
  },
  {
    id: 'anker-prime-20k', name: 'Anker Prime 20,000mAh Power Bank (200W)', category: 'anker',
    tagline: '200W total output for laptops, phones and everything between.',
    price: 180, originalPrice: 210, rating: 4.9, reviewCount: 1850,
    image: CATALOG_IMAGES.powerBank, badge: 'HOT DEAL',
    colors: [{ name: 'Anker Black', hex: '#111215' }],
    specs: {
      Capacity: '20,000mAh',
      Output: '200W total across two USB-C ports and USB-A',
      Display: 'Colour status display with live power metrics',
      Recharge: 'Up to 100W USB-C input',
    },
    description: 'Built for demanding travel days. It can fast-charge two laptops and gives a clear live readout of power, temperature and remaining runtime.',
  },
  {
    id: 'anker-soundcore-liberty4', name: 'Anker Soundcore Liberty 4 NC', category: 'anker',
    tagline: 'Adaptive noise cancellation with long-haul battery life.',
    price: 100, originalPrice: 120, rating: 4.8, reviewCount: 5290,
    image: CATALOG_IMAGES.headphonesAlt, badge: 'BEST SELLER',
    colors: [
      { name: 'Velvet Black', hex: '#1a1a1a' },
      { name: 'Pastel Blue', hex: '#9bbcd4' },
      { name: 'Clear White', hex: '#f4f4f4' },
    ],
    specs: {
      ANC: 'Adaptive ANC 2.0',
      Battery: 'Up to 10 hours, 50 hours with the case',
      Audio: '11mm driver with LDAC support',
      Calls: 'Six-microphone call system',
    },
    description: 'Strong noise cancellation, dependable calls and enough battery for a full week of commuting at a much more approachable price.',
  },
  {
    id: 'baseus-20k-powerbank', name: 'Baseus 20,000mAh Power Bank', category: 'power',
    tagline: 'The everyday backup battery.',
    price: 45, originalPrice: 55, rating: 4.4, reviewCount: 7340,
    image: CATALOG_IMAGES.powerBank,
    colors: [
      { name: 'Black', hex: '#1f2023' },
      { name: 'White', hex: '#efefed' },
    ],
    specs: {
      Capacity: '20,000mAh',
      Output: '22.5W fast charge, four ports',
      Display: 'Digital battery percentage',
      Cables: 'Built-in USB-C cable',
      'Recharge time': 'About 5 hours',
    },
    description: 'The sensible everyday power bank: enough for four phone charges, fast enough to be useful, and small enough to actually carry.',
  },
  {
    id: 'surge-extension-usb', name: 'Surge-Protected Extension Block', category: 'power',
    tagline: 'Protects your gear from unstable mains.',
    price: 35, rating: 4.5, reviewCount: 2860,
    image: CATALOG_IMAGES.adapters,
    colors: [{ name: 'White', hex: '#f2f2f0' }],
    specs: {
      Sockets: 'Four UK three-pin sockets',
      USB: 'Two USB-C and two USB-A ports',
      Protection: 'Surge and overload protection with indicator',
      Cable: '2-metre heavy-duty cable',
      Rating: '13A / 3,250W',
    },
    description: 'Built for Nigerian mains. Surge protection and a clear fault indicator, so a spike after an outage does not take your laptop with it.',
  },
  {
    id: 'portable-power-station-300', name: 'Portable Power Station 300W', category: 'power',
    tagline: 'Runs a router, laptop and lights through an outage.',
    price: 400, originalPrice: 450, rating: 4.6, reviewCount: 1240,
    image: CATALOG_IMAGES.powerBank, badge: 'HOT DEAL',
    stockUrgency: 'Limited stock — ask about generator and solar bundles',
    colors: [{ name: 'Graphite', hex: '#3b3d41' }],
    specs: {
      Capacity: '300Wh lithium battery',
      Output: '300W AC continuous, 600W surge',
      Ports: 'Two AC sockets, USB-C PD, USB-A, 12V DC',
      Recharge: 'Wall, car or solar panel input',
      Runtime: 'Roughly 8 hours for a router plus laptop',
    },
    description: 'A silent alternative to a small generator for desk work. Keeps a router, laptop and a couple of lights running through a typical outage, and recharges from solar.',
  },
];

const EXPANDED_CATALOG: Product[] = CATALOG_SEEDS.map(buildProduct);

/* ------------------------------------------------------------------------
   Pre-owned stock. Individual handsets rather than SKUs, so each carries a
   grade, a battery reading where the device reports one, a shorter warranty
   and a real unit count.
   ------------------------------------------------------------------------ */

type PreOwnedSeed = CatalogSeed & {
  grade: PreOwnedDetail['grade'];
  batteryHealth?: number;
  warrantyMonths: number;
  unitsAvailable: number;
  note: string;
};

const buildPreOwned = (seed: PreOwnedSeed): Product => ({
  ...buildProduct(seed),
  condition: 'pre-owned',
  preOwned: {
    grade: seed.grade,
    batteryHealth: seed.batteryHealth,
    warrantyMonths: seed.warrantyMonths,
    unitsAvailable: seed.unitsAvailable,
    note: seed.note,
  },
});

const PRE_OWNED_SEEDS: PreOwnedSeed[] = [
  {
    id: 'pre-iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'iphone',
    tagline: 'Titanium Pro Max, inspected and battery-tested.',
    price: 780, originalPrice: 999, rating: 4.8, reviewCount: 0,
    storage: ['256GB'], image: IPHONE_IMAGES.modern,
    grade: 'Excellent', batteryHealth: 92, warrantyMonths: 6, unitsAvailable: 2,
    note: 'Faint micro-scratches on the frame, screen is flawless. Original box included.',
    colors: [{ name: 'Natural Titanium', hex: '#aaa196' }],
    specs: {
      Display: '6.7-inch Super Retina XDR with ProMotion',
      Chip: 'A17 Pro chip',
      Camera: '48MP Pro system with 5x Telephoto',
      'Battery health': '92% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'A tested 15 Pro Max in excellent condition. Every pre-owned device passes our 30-point inspection, arrives factory reset with iCloud cleared, and carries a 6-month warranty.',
  },
  {
    id: 'pre-iphone-14-pro', name: 'iPhone 14 Pro', category: 'iphone',
    tagline: 'Dynamic Island and a 48MP Pro camera, for much less.',
    price: 520, originalPrice: 799, rating: 4.7, reviewCount: 0,
    storage: ['128GB', '256GB'], image: IPHONE_IMAGES.modern, badge: 'POPULAR',
    grade: 'Very good', batteryHealth: 88, warrantyMonths: 6, unitsAvailable: 4,
    note: 'Light wear on the corners from case use. No screen marks.',
    colors: [{ name: 'Deep Purple', hex: '#584f61' }, { name: 'Space Black', hex: '#2f3032' }],
    specs: {
      Display: '6.1-inch Always-On display with ProMotion',
      Chip: 'A16 Bionic chip',
      Camera: '48MP Pro camera system',
      'Battery health': '88% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'The 14 Pro is the value pick in pre-owned iPhones — Dynamic Island, Always-On display and the 48MP sensor at roughly half the launch price.',
  },
  {
    id: 'pre-iphone-13', name: 'iPhone 13', category: 'iphone',
    tagline: 'Still the best-value iPhone we stock.',
    price: 330, originalPrice: 499, rating: 4.6, reviewCount: 0,
    storage: ['128GB'], image: IPHONE_IMAGES.modern, badge: 'BEST SELLER',
    grade: 'Very good', batteryHealth: 86, warrantyMonths: 6, unitsAvailable: 7,
    note: 'Visible but minor scuffs on the frame. Screen and camera glass clean.',
    colors: [{ name: 'Midnight', hex: '#272729' }, { name: 'Starlight', hex: '#f3f2ee' }],
    specs: {
      Display: '6.1-inch Super Retina XDR display',
      Chip: 'A15 Bionic chip',
      Camera: 'Dual 12MP camera system',
      'Battery health': '86% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'Five years of iOS updates still ahead of it and a battery above our 85% floor. The phone we recommend most often to people upgrading from an older Android.',
  },
  {
    id: 'pre-iphone-12', name: 'iPhone 12', category: 'iphone',
    tagline: 'OLED and 5G on a tight budget.',
    price: 240, originalPrice: 399, rating: 4.5, reviewCount: 0,
    storage: ['64GB', '128GB'], image: IPHONE_IMAGES.classic,
    grade: 'Good', batteryHealth: 83, warrantyMonths: 3, unitsAvailable: 5,
    note: 'Honest daily wear on the frame and back. Fully functional, screen unmarked.',
    colors: [{ name: 'Black', hex: '#202124' }, { name: 'Blue', hex: '#31577d' }],
    specs: {
      Display: '6.1-inch Super Retina XDR display',
      Chip: 'A14 Bionic chip',
      Camera: 'Dual 12MP camera system',
      'Battery health': '83% maximum capacity',
      Warranty: '3-month TechieBase warranty',
    },
    description: 'Graded Good — it shows its age cosmetically and works perfectly. If you want OLED and 5G at the lowest price we can honestly sell, this is it.',
  },
  {
    id: 'pre-macbook-air-m2', name: 'MacBook Air 13" (M2)', category: 'mac',
    tagline: 'Silent, light, and plenty fast for years yet.',
    price: 720, originalPrice: 1099, rating: 4.8, reviewCount: 0,
    storage: ['256GB', '512GB'], image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85',
    grade: 'Excellent', batteryHealth: 94, warrantyMonths: 6, unitsAvailable: 3,
    note: 'Under 80 charge cycles. No marks on the lid or palm rest.',
    colors: [{ name: 'Midnight', hex: '#2e3642' }, { name: 'Starlight', hex: '#efe6d8' }],
    specs: {
      Display: '13.6-inch Liquid Retina display',
      Chip: 'Apple M2 with 8-core CPU',
      Memory: '8GB unified memory',
      'Battery health': '94% — under 80 cycles',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'A barely-used M2 Air. Fanless, around 15 hours of battery, and still receiving macOS updates for years. The strongest value in our pre-owned Mac stock.',
  },
  {
    id: 'pre-macbook-pro-14-m1', name: 'MacBook Pro 14" (M1 Pro)', category: 'mac',
    tagline: 'Pro display, ports, and real sustained performance.',
    price: 950, originalPrice: 1599, rating: 4.8, reviewCount: 0,
    storage: ['512GB', '1TB'], image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=85',
    grade: 'Very good', batteryHealth: 89, warrantyMonths: 6, unitsAvailable: 2,
    note: 'Light scuffing on the base. Screen and keyboard in excellent order.',
    colors: [{ name: 'Space Grey', hex: '#575759' }],
    specs: {
      Display: '14.2-inch Liquid Retina XDR, 120Hz ProMotion',
      Chip: 'Apple M1 Pro, 8-core CPU / 14-core GPU',
      Memory: '16GB unified memory',
      'Battery health': '89% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'The machine that brought back HDMI, SD and MagSafe. An M1 Pro still outruns most new Windows laptops at this price, and the XDR display has no equivalent.',
  },
  {
    id: 'pre-galaxy-s23-ultra', name: 'Galaxy S23 Ultra', category: 'samsung',
    tagline: '200MP and an S Pen, two generations down in price.',
    price: 560, originalPrice: 1199, rating: 4.7, reviewCount: 0,
    storage: ['256GB', '512GB'], image: CATALOG_IMAGES.galaxyUltra,
    grade: 'Very good', batteryHealth: 90, warrantyMonths: 6, unitsAvailable: 3,
    note: 'Minor frame wear. S Pen included and working.',
    colors: [{ name: 'Phantom Black', hex: '#2b2b2d' }, { name: 'Green', hex: '#4c5a4e' }],
    specs: {
      Display: '6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Gen 2 for Galaxy',
      Camera: '200MP wide with 10x optical zoom',
      'Battery health': '90% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'Still one of the best camera phones ever made, and the last Ultra with a true 10x optical periscope. Comes with the S Pen and a 6-month warranty.',
  },
  {
    id: 'pre-galaxy-s22', name: 'Galaxy S22', category: 'samsung',
    tagline: 'Compact Galaxy flagship, sensible money.',
    price: 290, originalPrice: 799, rating: 4.4, reviewCount: 0,
    storage: ['128GB', '256GB'], image: CATALOG_IMAGES.galaxyS,
    grade: 'Good', batteryHealth: 84, warrantyMonths: 3, unitsAvailable: 6,
    note: 'Cosmetic wear on the frame and a hairline mark on the back glass.',
    colors: [{ name: 'Phantom Black', hex: '#2b2b2d' }, { name: 'Pink Gold', hex: '#e5c9bd' }],
    specs: {
      Display: '6.1-inch FHD+ Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Gen 1',
      Camera: '50MP wide, 12MP ultra wide, 10MP telephoto',
      'Battery health': '84% maximum capacity',
      Warranty: '3-month TechieBase warranty',
    },
    description: 'A genuinely small Android flagship, which barely exists new any more. Graded Good for cosmetics — mechanically sound throughout.',
  },
  {
    id: 'pre-ipad-pro-11-m1', name: 'iPad Pro 11" (M1)', category: 'ipad',
    tagline: 'Desktop-class chip, tablet price.',
    price: 430, originalPrice: 899, rating: 4.7, reviewCount: 0,
    storage: ['128GB', '256GB'], image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85',
    grade: 'Excellent', batteryHealth: 93, warrantyMonths: 6, unitsAvailable: 2,
    note: 'No visible wear. Screen protector fitted from new.',
    colors: [{ name: 'Space Grey', hex: '#575759' }, { name: 'Silver', hex: '#dcdde0' }],
    specs: {
      Display: '11-inch Liquid Retina, 120Hz ProMotion',
      Chip: 'Apple M1',
      Camera: '12MP wide with LiDAR',
      'Battery health': '93% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'The same M1 as the MacBook Air, in an iPad. Handles Procreate, heavy split-screen work and external displays without complaint.',
  },
  {
    id: 'pre-ps5-disc', name: 'PlayStation 5 (Disc)', category: 'gaming',
    tagline: 'Tested console, controller, and every cable.',
    price: 390, originalPrice: 550, rating: 4.6, reviewCount: 0,
    image: CATALOG_IMAGES.ps5Console,
    grade: 'Very good', warrantyMonths: 3, unitsAvailable: 4,
    note: 'Light dust marks on the panels, cleaned and stress-tested for 4 hours.',
    colors: [{ name: 'Glacier White', hex: '#f0f1f3' }],
    specs: {
      GPU: 'Custom RDNA 2 GPU with hardware ray tracing',
      Storage: '825GB custom NVMe SSD',
      Drive: 'Ultra HD Blu-ray',
      Condition: 'Panels cleaned, fans serviced, thermals verified',
      Warranty: '3-month TechieBase warranty',
    },
    description: 'A launch-model PS5 with the disc drive, serviced and stress-tested before sale. Ships with one DualSense pad, HDMI and power cables.',
  },
  {
    id: 'pre-apple-watch-s9', name: 'Apple Watch Series 9', category: 'watch',
    tagline: 'Double tap and a brighter display, pre-owned.',
    price: 210, originalPrice: 399, rating: 4.6, reviewCount: 0,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
    grade: 'Excellent', batteryHealth: 91, warrantyMonths: 6, unitsAvailable: 3,
    note: 'Case and screen unmarked. Supplied with a new replacement band.',
    colors: [{ name: 'Midnight', hex: '#272729' }, { name: 'Starlight', hex: '#f3f2ee' }],
    specs: {
      Display: 'Always-On Retina, up to 2,000 nits',
      Chip: 'S9 SiP with double tap gesture',
      Sensors: 'ECG, blood oxygen, temperature sensing',
      'Battery health': '91% maximum capacity',
      Warranty: '6-month TechieBase warranty',
    },
    description: 'Series 9 in excellent condition with a fresh band. All health sensors tested and the battery comfortably above our threshold.',
  },
  {
    id: 'pre-airpods-pro-2', name: 'AirPods Pro (2nd gen)', category: 'airpods',
    tagline: 'Sanitised, tested, with new ear tips.',
    price: 130, originalPrice: 249, rating: 4.5, reviewCount: 0,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=85',
    grade: 'Very good', warrantyMonths: 3, unitsAvailable: 5,
    note: 'Case shows light scuffing. Ear tips replaced with new, buds sanitised.',
    colors: [{ name: 'White', hex: '#f4f4f2' }],
    specs: {
      'Noise Cancelling': 'Active Noise Cancellation with Adaptive Transparency',
      Chip: 'Apple H2',
      Battery: 'Tested to 5 hours per charge, 28 with the case',
      Condition: 'New ear tips fitted, buds and case sanitised',
      Warranty: '3-month TechieBase warranty',
    },
    description: 'Pre-owned AirPods Pro with fresh tips and a verified battery. We test playback time on every pair before they go on the shelf.',
  },
];

const PRE_OWNED_STOCK: Product[] = PRE_OWNED_SEEDS.map(buildPreOwned);

/** Everything here is brand new; condition is stamped on during assembly. */
const CURATED_NEW: Array<Omit<Product, 'condition'>> = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    tagline: 'Hello, Apple Intelligence. Titanium powerhouse.',
    category: 'iphone',
    price: 999,
    originalPrice: 1099,
    monthlyPrice: 41.62,
    rating: 4.9,
    reviewCount: 14820,
    badge: 'BEST SELLER',
    stockUrgency: 'Only 3 left for pickup in Ikeja',
    inStock: true,
    pickupAvailable: true,
    imageUrl: '/images/products/apple/iphone-16-pro.webp',
    additionalImages: [
      '/images/products/apple/iphone-16-pro-lineup.webp'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A385' },
      { name: 'Natural Titanium', hex: '#BAA392' },
      { name: 'White Titanium', hex: '#F0ECE8' },
      { name: 'Black Titanium', hex: '#2E2F32' }
    ],
    storageOptions: [
      { capacity: '128GB', priceDelta: 0 },
      { capacity: '256GB', priceDelta: 100 },
      { capacity: '512GB', priceDelta: 300 },
      { capacity: '1TB', priceDelta: 500 }
    ],
    specs: {
      'Display': '6.3" Super Retina XDR with ProMotion (120Hz)',
      'Chip': 'A18 Pro chip with 6-core GPU & Apple Intelligence',
      'Camera': '48MP Fusion, 48MP Ultra Wide, 5x Telephoto',
      'Battery': 'Up to 27 hours video playback',
      'Finish': 'Grade 5 Titanium with textured matte glass'
    },
    description: 'iPhone 16 Pro. Featuring a stunning Grade 5 titanium design, Camera Control for instant photo capture, 4K 120 fps Dolby Vision recording, and the powerhouse A18 Pro chip designed from the ground up for Apple Intelligence.',
    reviews: [
      {
        id: 'r1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2 days ago',
        title: 'The Camera Control button is a game-changer!',
        comment: 'Upgraded from the 13 Pro. The 5x optical zoom and new Camera Control button make taking pro-level photos effortless. The Desert Titanium finish is gorgeous.',
        verified: true,
        helpfulCount: 142
      },
      {
        id: 'r2',
        author: 'Elena Rostova',
        rating: 5,
        date: '1 week ago',
        title: 'Battery life lasts well over 24 hours',
        comment: 'Sleek, lightweight, super responsive screen. Apple Intelligence features like photo clean-up and smart email summaries are immensely useful.',
        verified: true,
        helpfulCount: 89
      }
    ]
  },
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    tagline: 'The ultimate iPhone. Largest display, longest battery life.',
    category: 'iphone',
    price: 1199,
    originalPrice: 1299,
    monthlyPrice: 49.95,
    rating: 4.9,
    reviewCount: 9410,
    badge: 'HOT DEAL',
    stockUrgency: 'High Demand — Order within 1 hr for Free Express Delivery',
    inStock: true,
    pickupAvailable: true,
    imageUrl: '/images/products/apple/iphone-16-pro.webp',
    additionalImages: [
      '/images/products/apple/iphone-16-pro-lineup.webp'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A385' },
      { name: 'Natural Titanium', hex: '#BAA392' },
      { name: 'Black Titanium', hex: '#2E2F32' },
      { name: 'White Titanium', hex: '#F0ECE8' }
    ],
    storageOptions: [
      { capacity: '256GB', priceDelta: 0 },
      { capacity: '512GB', priceDelta: 200 },
      { capacity: '1TB', priceDelta: 400 }
    ],
    specs: {
      'Display': '6.9" Super Retina XDR — Largest iPhone screen ever',
      'Chip': 'A18 Pro chip with 6-core Neural Engine',
      'Camera': '48MP Fusion Camera, 5x Optical Zoom, 4K 120 fps',
      'Battery': 'Up to 33 hours video playback — Longest battery ever',
      'Durability': 'Latest-generation Ceramic Shield front'
    },
    description: 'The giant 6.9-inch display on iPhone 16 Pro Max gives you the most expansive canvas for video editing, gaming, and multitasking, powered by titanium durability and unmatched battery stamina.',
    reviews: [
      {
        id: 'r3',
        author: 'David K.',
        rating: 5,
        date: '3 days ago',
        title: 'Unbelievable 6.9" screen and battery beast',
        comment: 'I easily get 2 full days of battery on moderate usage. The display brightness under direct sunlight is incredible.',
        verified: true,
        helpfulCount: 76
      }
    ]
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air 13" (M3)',
    tagline: 'Lean. Mean. M3 machine.',
    category: 'mac',
    price: 999,
    originalPrice: 1099,
    monthlyPrice: 83.25,
    rating: 4.8,
    reviewCount: 8230,
    badge: 'BEST SELLER',
    stockUrgency: 'Includes a free ₦225,000 education store credit',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Midnight', hex: '#2C3641' },
      { name: 'Starlight', hex: '#E2D8C3' },
      { name: 'Space Gray', hex: '#7D7E80' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    storageOptions: [
      { capacity: '256GB SSD / 16GB RAM', priceDelta: 0 },
      { capacity: '512GB SSD / 16GB RAM', priceDelta: 200 },
      { capacity: '1TB SSD / 24GB RAM', priceDelta: 600 }
    ],
    specs: {
      'Processor': 'Apple M3 chip (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory standard',
      'Display': '13.6" Liquid Retina display with 500 nits brightness',
      'Battery': 'Up to 18 hours battery life with MagSafe charging',
      'Weight': '2.7 pounds ultra-portable aluminum body'
    },
    description: 'Strikingly thin and fast, MacBook Air with the M3 chip leverages built-in Apple Intelligence, AV1 decode, and dual external display support in a silent fanless design.',
    reviews: [
      {
        id: 'r4',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '5 days ago',
        title: 'Perfect student laptop!',
        comment: 'Lightweight, lightning fast for coding and photo editing, and Midnight looks phenomenal with the fingerprint resistant seal.',
        verified: true,
        helpfulCount: 210
      }
    ]
  },
  {
    id: 'macbook-pro-14-m3',
    name: 'MacBook Pro 14" (M3 Pro)',
    tagline: 'Mind-blowing. Head-turning.',
    category: 'mac',
    price: 1899,
    originalPrice: 1999,
    monthlyPrice: 158.25,
    rating: 4.9,
    reviewCount: 6150,
    badge: 'SAVE ₦150K',
    stockUrgency: 'In stock for pickup today in Ikeja',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Space Black', hex: '#1F2022' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    storageOptions: [
      { capacity: '512GB SSD / 18GB RAM', priceDelta: 0 },
      { capacity: '1TB SSD / 36GB RAM', priceDelta: 400 },
      { capacity: '2TB SSD / 48GB RAM', priceDelta: 1000 }
    ],
    specs: {
      'Processor': 'M3 Pro (12-core CPU, 18-core GPU)',
      'Display': '14.2" Liquid Retina XDR with 1600 nits peak HDR',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC slot, MagSafe 3',
      'Battery': 'Up to 22 hours video playback'
    },
    description: 'Built for demanding workflows like 8K video timeline scrub, 3D render loops, and large LLM compilation. Featuring hardware-accelerated ray tracing and Space Black anodized aluminum finish.',
    reviews: [
      {
        id: 'r5',
        author: 'Alex Rivera',
        rating: 5,
        date: '1 week ago',
        title: 'Space Black finish is incredible',
        comment: 'Runs Xcode and Final Cut Pro simultaneously without the fans even kicking on. Display quality is unmatched.',
        verified: true,
        helpfulCount: 114
      }
    ]
  },
  {
    id: 'ipad-pro-m4',
    name: 'iPad Pro 13" (M4)',
    tagline: 'Thinpossible. Ultra Retina XDR OLED display.',
    category: 'ipad',
    price: 1299,
    originalPrice: 1399,
    monthlyPrice: 108.25,
    rating: 4.8,
    reviewCount: 4320,
    badge: 'NEW',
    stockUrgency: 'Ships Free in 2 Days',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Space Black', hex: '#212224' },
      { name: 'Silver', hex: '#E2E3E5' }
    ],
    storageOptions: [
      { capacity: '256GB / Tandem OLED', priceDelta: 0 },
      { capacity: '512GB / Tandem OLED', priceDelta: 200 },
      { capacity: '1TB / Nano-texture glass', priceDelta: 600 }
    ],
    specs: {
      'Thickness': '5.1mm — Thinnest Apple product ever',
      'Display': 'Ultra Retina XDR Tandem OLED (2000 nits peak)',
      'Chip': 'M4 chip with 38 TOPS Neural Engine',
      'Accessories': 'Supports Apple Pencil Pro and Magic Keyboard'
    },
    description: 'The world’s most advanced display in an impossibly thin and light design. M4 chip delivers groundbreaking AI performance for creative artists, video editors, and digital painters.',
    reviews: [
      {
        id: 'r6',
        author: 'Chloe Bennett',
        rating: 5,
        date: '4 days ago',
        title: 'Tandem OLED panel is jaw-dropping',
        comment: 'Deep blacks, vibrant colors, and pencil responsiveness for illustration is second to none.',
        verified: true,
        helpfulCount: 93
      }
    ]
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    tagline: 'Next-level adventure. Black Titanium edition.',
    category: 'watch',
    price: 799,
    monthlyPrice: 66.58,
    rating: 4.9,
    reviewCount: 5120,
    badge: 'POPULAR',
    stockUrgency: 'Order in next 2 hours for Same-Day Store Pickup',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Satin Black Titanium', hex: '#1C1D1F' },
      { name: 'Natural Titanium', hex: '#A8A9AB' }
    ],
    specs: {
      'Case': '49mm aerospace Grade 5 Titanium case with sapphire front crystal',
      'Display': '3000 nits Always-On Retina display',
      'GPS': 'Precision dual-frequency GPS (L1 and L5)',
      'Water Resistance': '100m water resistance, EN13319 scuba dive rated',
      'Battery': 'Up to 36 hours normal use (72 hours Low Power Mode)'
    },
    description: 'The ultimate sports and adventure watch. Packed with customizable Action button, dual-frequency GPS, siren, depth gauge, and S9 SiP with Double Tap gesture.',
    reviews: [
      {
        id: 'r7',
        author: 'Tyler Olsen',
        rating: 5,
        date: '2 weeks ago',
        title: 'Built like a tank for trail running',
        comment: 'Satin Black looks tough and elegant. Battery easily lasts 3 full days with GPS workout logging every morning.',
        verified: true,
        helpfulCount: 168
      }
    ]
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2 (USB-C)',
    tagline: 'Active Noise Cancellation. Hearing Health clinical features.',
    category: 'airpods',
    price: 199,
    originalPrice: 249,
    monthlyPrice: 16.58,
    rating: 4.9,
    reviewCount: 22100,
    badge: 'BEST SELLER',
    stockUrgency: 'Save $50 Instant Discount — Free Engraving Available',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'White', hex: '#FFFFFF' }
    ],
    specs: {
      'Audio': 'H2 chip, Personalized Spatial Audio with dynamic head tracking',
      'Cancellation': '2x more Active Noise Cancellation than predecessor',
      'Features': 'Adaptive Audio, Conversation Awareness, FDA-cleared Hearing Aid capabilities',
      'Charging Case': 'MagSafe Case (USB-C) with Precision Finding speaker and lanyard loop'
    },
    description: 'AirPods Pro 2 deliver 2x more Active Noise Cancellation, Transparency mode, Adaptive Audio, plus revolutionary software features including a scientifically validated Hearing Test and clinical-grade Hearing Aid feature.',
    reviews: [
      {
        id: 'r8',
        author: 'Dr. Samual Thorne',
        rating: 5,
        date: 'Yesterday',
        title: 'Noise cancellation is frighteningly good',
        comment: 'Silences plane engines completely. USB-C case charging and precision speaker make finding lost keys easy.',
        verified: true,
        helpfulCount: 310
      }
    ]
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max (USB-C)',
    tagline: 'High-fidelity audio. Five fresh colors.',
    category: 'airpods',
    price: 549,
    monthlyPrice: 45.75,
    rating: 4.7,
    reviewCount: 3890,
    badge: 'NEW',
    stockUrgency: 'In Stock in Midnight and Starlight',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Midnight', hex: '#212B35' },
      { name: 'Starlight', hex: '#E4DDD2' },
      { name: 'Blue', hex: '#4B6B82' },
      { name: 'Purple', hex: '#776E8A' },
      { name: 'Orange', hex: '#CC5E3B' }
    ],
    specs: {
      'Audio': 'Apple-designed dynamic driver, computational audio with H1 chip',
      'Design': 'Anodized aluminum earcups, breathable knit mesh canopy',
      'Connector': 'USB-C for lossless listening and fast charging'
    },
    description: 'Over-ear headphones reinvented. Apple-designed dynamic driver provides immersive high-fidelity audio. Every detail, from canopy to cushions, designed for exceptional fit.',
    reviews: []
  },
  {
    id: 'airtag-4pack',
    name: 'AirTag (4-Pack)',
    tagline: 'Keep track of your keys, wallet, luggage, and bike.',
    category: 'accessories',
    price: 99,
    originalPrice: 119,
    monthlyPrice: 8.25,
    rating: 4.9,
    reviewCount: 18900,
    badge: 'SAVE ₦150K',
    stockUrgency: 'Top Seller — Over 5,000 bought this week',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Silver / White', hex: '#EDEDED' }
    ],
    specs: {
      'Tracking': 'Ultra Wideband Precision Finding technology',
      'Battery': 'User-replaceable CR2032 battery (lasts over 1 year)',
      'Water Rating': 'IP67 dust and water resistant'
    },
    description: 'AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another in your backpack. And just like that, they’re on your radar in the Find My app.',
    reviews: []
  },
  {
    id: 'magsafe-charger-2m',
    name: '25W MagSafe Charger (2m)',
    tagline: 'Up to 25W fast wireless charging for iPhone 16.',
    category: 'accessories',
    price: 49,
    monthlyPrice: 4.08,
    rating: 4.8,
    reviewCount: 4120,
    badge: 'POPULAR',
    stockUrgency: 'Frequently Bought with iPhone 16 Pro',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Woven Braided White', hex: '#F0ECE8' }
    ],
    specs: {
      'Speed': 'Up to 25W fast charging when paired with 30W adapter',
      'Cable': '2-meter durable braided cable',
      'Compatibility': 'MagSafe iPhones, AirPods with wireless case, Qi2 devices'
    },
    description: 'The MagSafe Charger makes wireless charging a snap. The perfectly aligned magnets attach to your iPhone 16 or iPhone 15 for faster wireless charging up to 25W.',
    reviews: []
  },
  {
    id: 'magsafe-silicone-case-16pro',
    name: 'iPhone 16 Pro Silicone Case',
    tagline: 'Designed by Apple with Camera Control sapphire cap.',
    category: 'accessories',
    price: 49,
    monthlyPrice: 4.08,
    rating: 4.6,
    reviewCount: 2840,
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Star Fruit', hex: '#E9E47A' },
      { name: 'Ultramarine', hex: '#3C4983' },
      { name: 'Plum', hex: '#583647' },
      { name: 'Stone Gray', hex: '#A3A29E' },
      { name: 'Black', hex: '#1C1D1F' }
    ],
    specs: {
      'Material': 'Soft-touch silicone exterior with microfiber lining',
      'Feature': 'Conductive sapphire crystal cap for Camera Control button',
      'Charging': 'Built-in MagSafe alignment magnets'
    },
    description: 'Designed by Apple to complement iPhone 16 Pro, the Silicone Case with MagSafe is a delightful way to protect your iPhone while maintaining seamless access to Camera Control.',
    reviews: []
  },
  {
    id: 'apple-watch-series-10',
    name: 'Apple Watch Series 10',
    tagline: 'Thinnest watch ever. Biggest display screen.',
    category: 'watch',
    price: 399,
    originalPrice: 429,
    monthlyPrice: 33.25,
    rating: 4.8,
    reviewCount: 6810,
    badge: 'BEST SELLER',
    stockUrgency: 'Save $30 Instant Savings Today',
    inStock: true,
    pickupAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Jet Black', hex: '#0D0E10' },
      { name: 'Rose Gold', hex: '#E0B5A6' },
      { name: 'Silver Aluminum', hex: '#E3E4E5' },
      { name: 'Polished Titanium Slate', hex: '#3A3B3E' }
    ],
    specs: {
      'Display': 'Wide-angle OLED display, 40% brighter off-angle',
      'Thickness': '9.7mm thin — 10% thinner than Series 9',
      'Sensors': 'Sleep Apnea notifications, ECG, Depth gauge, Water temp sensor',
      'Fast Charge': '80% battery charge in just 30 minutes'
    },
    description: 'Series 10 is a landmark milestone for Apple Watch. Featuring our largest and most advanced display yet in our thinnest design ever, plus fast charging and sleep apnea notifications.',
    reviews: []
  }
];

export const PRODUCTS: Product[] = [
  ...IPHONE_VARIANTS,
  ...CURATED_NEW.map((product) => ({ ...product, condition: 'new' as const })),
  ...EXPANDED_CATALOG,
  ...PRE_OWNED_STOCK
];

/** Look a product up by id — positional indexes into PRODUCTS shift every
 *  time the catalogue grows, which is how the bundles below drifted onto the
 *  wrong products. */
const productById = (id: string): Product => {
  const product = PRODUCTS.find((candidate) => candidate.id === id);
  if (!product) throw new Error(`Unknown product id in bundle: ${id}`);
  return product;
};

export const FEATURED_BUNDLES: ProductBundle[] = [
  {
    id: 'bundle-iphone-creator',
    title: 'iPhone 16 Pro Pro-Creator Studio Bundle',
    tagline: 'Complete 4K Dolby Vision content setup in one click',
    mainProduct: productById('iphone-16-pro'),
    accessories: [
      productById('magsafe-charger-2m'),
      productById('magsafe-silicone-case-16pro')
    ],
    regularTotal: 1097,
    bundlePrice: 1049,
    savings: 48
  },
  {
    id: 'bundle-mac-powerhouse',
    title: 'MacBook Air M3 Student & Nomad Bundle',
    tagline: 'Everything you need for campus or remote work productivity',
    mainProduct: productById('macbook-air-m3'),
    accessories: [
      productById('airpods-pro-2'),
      productById('airtag-4pack')
    ],
    regularTotal: 1297,
    bundlePrice: 1199,
    savings: 98
  },
  {
    id: 'bundle-ps5-starter',
    title: 'PlayStation 5 Day-One Bundle',
    tagline: 'Console, a second pad, and a headset for party chat',
    mainProduct: productById('ps5-slim-disc'),
    accessories: [
      productById('dualsense-controller'),
      productById('gaming-headset-pro')
    ],
    regularTotal: 725,
    bundlePrice: 679,
    savings: 46
  }
];

export const TRADE_IN_DEVICES = [
  { device: 'iPhone 15 Pro Max', maxValue: 650 },
  { device: 'iPhone 15 Pro', maxValue: 550 },
  { device: 'iPhone 15', maxValue: 420 },
  { device: 'iPhone 14 Pro Max', maxValue: 480 },
  { device: 'iPhone 14 Pro', maxValue: 400 },
  { device: 'iPhone 14', maxValue: 330 },
  { device: 'iPhone 13 Pro Max', maxValue: 380 },
  { device: 'iPhone 13 Pro', maxValue: 320 },
  { device: 'iPhone 13', maxValue: 260 },
  { device: 'iPhone 12 Pro', maxValue: 230 },
  { device: 'iPhone 12 / 11', maxValue: 180 }
];
