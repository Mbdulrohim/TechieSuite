export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface StorageOption {
  capacity: string;
  priceDelta: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

/** Condition is a separate axis from category: any category can hold both.
 *  The storefront defaults to 'new' and only shows pre-owned when asked. */
export type Condition = 'new' | 'pre-owned';

/** Extra detail a pre-owned listing needs and a new one does not. */
export interface PreOwnedDetail {
  grade: 'Excellent' | 'Very good' | 'Good';
  /** Maximum battery capacity, where the device reports one. */
  batteryHealth?: number;
  warrantyMonths: number;
  /** Pre-owned listings are individual handsets, so stock is usually low. */
  unitsAvailable: number;
  /** Shown verbatim on the listing — be specific about wear. */
  note: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  condition: Condition;
  preOwned?: PreOwnedDetail;
  category:
    | 'iphone'
    | 'mac'
    | 'ipad'
    | 'watch'
    | 'airpods'
    | 'samsung'
    | 'gaming'
    | 'laptops'
    | 'audio'
    | 'power'
    | 'accessories'
    | 'deals';
  price: number;
  originalPrice?: number;
  monthlyPrice: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  storageOptions?: StorageOption[];
  imageUrl: string;
  additionalImages?: string[];
  badge?: 'BEST SELLER' | 'NEW' | 'SAVE ₦150K' | 'HOT DEAL' | 'POPULAR';
  stockUrgency?: string;
  inStock: boolean;
  pickupAvailable: boolean;
  specs: Record<string, string>;
  description: string;
  reviews: Review[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedStorage?: StorageOption;
  protection: boolean;
  quantity: number;
}

export interface TradeInQuote {
  device: string;
  storage: string;
  condition: 'excellent' | 'good' | 'fair';
  value: number;
}

export interface ProductBundle {
  id: string;
  title: string;
  tagline: string;
  mainProduct: Product;
  accessories: Product[];
  regularTotal: number;
  bundlePrice: number;
  savings: number;
}

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  selectedStorage: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'reviews';
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string };

export interface Article {
  slug: string;
  title: string;
  /** Standfirst shown under the headline. */
  dek: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  featured?: boolean;
  body: ArticleBlock[];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  status: 'In Stock for Today\'s Pickup' | 'Order now for Pickup Tomorrow' | 'Out of Stock';
  distance: string;
}
