import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Scale, 
  User, 
  X, 
  ChevronRight, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { Product } from '../../types';

interface NavbarProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenWishlist: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFilterDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  compareCount,
  onOpenCart,
  onOpenCompare,
  onOpenWishlist,
  onSelectProduct,
  onAddToCart,
  onToggleFilterDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter products for search autocomplete
  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'iphone', label: 'iPhones' },
    { id: 'mac', label: 'Macs' },
    { id: 'ipad', label: 'iPads' },
    { id: 'watch', label: 'Wearables' },
    { id: 'airpods', label: 'AirPods' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'deals', label: 'Deals & Savings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E5E7] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Apple Logo & Main Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2 group text-[#1D1D1F] hover:opacity-80 transition-opacity"
            title="Apple Store Direct Response Flagship"
          >
            <svg className="w-6 h-6 fill-current text-[#1D1D1F]" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.18-2.62-7.05-7.23-11.62-13.84-6.3-9.15-11.23-19.16-14.79-30.05-3.56-10.89-5.34-21.36-5.34-31.42 0-14.02 3.52-25.59 10.56-34.7 7.05-9.12 15.86-13.79 26.43-14.02 4.93 0 10.31 1.25 16.14 3.75 5.83 2.5 9.74 3.75 11.73 3.75 1.7 0 5.72-1.25 12.07-3.75 6.35-2.5 11.45-3.64 15.3-3.42 9.79.54 17.84 4.13 24.16 10.77 6.32 6.64 10.23 14.88 11.73 24.72-10.77 6.47-16.1 15.22-15.99 26.25.12 8.7 3.37 16.03 9.76 21.99 6.39 5.96 14.02 9.24 22.89 9.84-2.18 6.53-4.99 13.26-8.43 20.19zM119.22 31.02c0-6.85 2.45-13.56 7.35-20.13 4.9-6.57 11.13-10.59 18.69-12.06.33 1.3.49 2.5.49 3.59 0 6.96-2.56 13.79-7.68 20.49-5.12 6.7-11.3 10.81-18.54 12.33-.05-.82-.31-2.22-.31-4.22z"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-[#1D1D1F] leading-tight">
                Apple Store
              </span>
              <span className="text-[10px] text-[#0066CC] font-medium tracking-wide">
                Direct Express
              </span>
            </div>
          </button>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[#1D1D1F]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    isActive
                      ? 'bg-[#1D1D1F] text-white font-semibold'
                      : 'hover:bg-[#F5F5F7] text-[#1D1D1F]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Search Bar with Live Thumbnail Dropdown */}
        <div className="relative flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search iPhone 16 Pro, M3 MacBook, AirPods..."
              className="w-full bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder-gray-500 pl-10 pr-9 py-2 rounded-full border border-[#E5E5E7] focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Instant Auto-Complete Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#E5E5E7] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-gray-100 text-xs text-gray-500 font-medium">
                <span>Matching Apple Products</span>
                <span>{filteredProducts.length} results</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-6 text-center text-xs text-gray-500">
                  No matching Apple products found for "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-1.5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-2 hover:bg-[#F5F5F7] rounded-xl transition-colors cursor-pointer"
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 object-contain rounded-lg bg-gray-50 p-1"
                        />
                        <div>
                          <div className="font-semibold text-xs text-[#1D1D1F] group-hover:text-[#0066CC]">
                            {product.name}
                          </div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">
                            {product.tagline}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-bold text-[#1D1D1F]">
                            ${product.price}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-medium">
                            Or ${product.monthlyPrice}/mo
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="bg-[#0066CC] hover:bg-[#0055B3] text-white text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                        >
                          + Bag
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons: Filter, Wishlist, Compare, Account, Shopping Bag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Faceted Filter Toggle button */}
          <button
            onClick={onToggleFilterDrawer}
            className="p-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors relative"
            title="Filter and Sort Products"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="relative p-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
            title="Compare Models"
          >
            <Scale className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0066CC] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Heart */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
            title="Saved Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D70015] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account Popover */}
          <div className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="p-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
              title="Apple ID & Orders"
            >
              <User className="w-5 h-5" />
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#E5E5E7] p-4 z-50 text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#1D1D1F]">
                    AP
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1D1D1F]">Signed in as Customer</div>
                    <div className="text-gray-500 text-[11px]">Apple Card 3% Active</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-gray-700 flex justify-between items-center">
                    <span>Order History & Tracking</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <button className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-gray-700 flex justify-between items-center">
                    <span>Trade-In Credit Balance</span>
                    <span className="font-bold text-emerald-600">$0.00</span>
                  </button>
                  <button className="w-full text-left px-2 py-1.5 hover:bg-gray-50 rounded-lg text-gray-700 flex justify-between items-center">
                    <span>Saved Payment Methods</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* High Density Active Shopping Bag CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#1D1D1F] hover:bg-black text-white px-3.5 py-2 rounded-full font-medium text-xs shadow-sm transition-all transform hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#0066CC]" />
            <span>Bag</span>
            <span className="bg-[#0066CC] text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
