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

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'iphone' | 'mac' | 'ipad' | 'watch' | 'airpods' | 'accessories' | 'deals';
  price: number;
  originalPrice?: number;
  monthlyPrice: number;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  storageOptions?: StorageOption[];
  imageUrl: string;
  additionalImages?: string[];
  badge?: 'BEST SELLER' | 'NEW' | 'SAVE $100' | 'HOT DEAL' | 'POPULAR';
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
  appleCare: boolean;
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
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  minRating: number;
  selectedStorage: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'reviews';
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  status: 'In Stock for Today\'s Pickup' | 'Order now for Pickup Tomorrow' | 'Out of Stock';
  distance: string;
}
