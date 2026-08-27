export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface StorageOption {
  capacity: string;
  priceDelta: number;
}

/**
 * One choice on a configurable axis — a screen size, a chip tier, a finish.
 *
 * Deliberately generic rather than a `sizeOptions` / `chipOptions` pair: the
 * Mac lineup alone needs two axes today and Apple adds more most years, and a
 * named field per axis means touching the cart, checkout and reconciliation
 * every time one appears.
 */
export interface ProductOptionChoice {
  /** Shown on the control and in the cart line, e.g. '13-inch' or 'M5 Pro'. */
  label: string;
  /** Added to the product's base price. The first choice is normally 0. */
  priceDelta: number;
  /** Supporting line under the label, e.g. '10-core GPU, 16-core Neural Engine'. */
  note?: string;
  /**
   * Photo to show when this choice is picked, if `Product.imageDrivenBy`
   * names this choice's group. Mirrors `ProductColor.image` — the same
   * "picking a value can swap the photo" behaviour, just not limited to
   * colour. Optional per choice: a content editor can photograph three of
   * five finishes and leave the rest to fall back to the base image.
   */
  image?: string;
  /**
   * Choices in other groups this one cannot be sold with, keyed by group id —
   * e.g. the base M5 is not offered in the 16-inch body. Without this the
   * storefront will happily take an order for a machine Apple does not build.
   */
  incompatibleWith?: Record<string, string[]>;
}

/** A configurable axis, rendered above colour in array order. */
export interface ProductOptionGroup {
  /** Stable key. It goes into the cart line id, so never change it in place. */
  id: string;
  /** Question shown above the control, e.g. 'Which size?'. */
  label: string;
  choices: ProductOptionChoice[];
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
    | 'anker'
    | 'accessories'
    /** DJI and creator kit — drones, gimbals, action cameras, wireless mics. */
    | 'gear'
    | 'deals';
  price: number;
  originalPrice?: number;
  monthlyPrice: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  storageOptions?: StorageOption[];
  /** Size, chip and similar axes. Chosen before colour and storage. */
  optionGroups?: ProductOptionGroup[];
  /**
   * Which variant axis swaps the product photo when picked: `'color'` (the
   * default, applied when this is absent — every product authored before
   * this field existed keeps working unchanged), or the `id` of an entry in
   * `optionGroups` — e.g. `'size'` if a MacBook's two sizes were ever
   * photographed separately.
   *
   * One axis, not several at once: a photo keyed by colour AND size
   * combined would need a slot filled for every combination, and for
   * physical retail almost nothing is shot that way — colour alone is what
   * changes photography in practice, on this storefront and on Apple's own.
   * A content editor sets this per product in Suite; it is not fixed by
   * category, so nothing about supporting one product with a size-driven
   * photo forecloses another with a colour-driven one.
   */
  imageDrivenBy?: string;
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
  /** Chosen option per group, keyed by `ProductOptionGroup.id`. */
  selectedOptions?: Record<string, ProductOptionChoice>;
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
