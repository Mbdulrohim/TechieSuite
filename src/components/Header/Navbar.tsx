import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Scale,
  User,
  X,
  ChevronRight,
  SlidersHorizontal,
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
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#E5E5E7]/80">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Apple Logo & Brand */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2.5 text-[#1D1D1F] hover:opacity-70 transition-opacity shrink-0"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.18-2.62-7.05-7.23-11.62-13.84-6.3-9.15-11.23-19.16-14.79-30.05-3.56-10.89-5.34-21.36-5.34-31.42 0-14.02 3.52-25.59 10.56-34.7 7.05-9.12 15.86-13.79 26.43-14.02 4.93 0 10.31 1.25 16.14 3.75 5.83 2.5 9.74 3.75 11.73 3.75 1.7 0 5.72-1.25 12.07-3.75 6.35-2.5 11.45-3.64 15.3-3.42 9.79.54 17.84 4.13 24.16 10.77 6.32 6.64 10.23 14.88 11.73 24.72-10.77 6.47-16.1 15.22-15.99 26.25.12 8.7 3.37 16.03 9.76 21.99 6.39 5.96 14.02 9.24 22.89 9.84-2.18 6.53-4.99 13.26-8.43 20.19zM119.22 31.02c0-6.85 2.45-13.56 7.35-20.13 4.9-6.57 11.13-10.59 18.69-12.06.33 1.3.49 2.5.49 3.59 0 6.96-2.56 13.79-7.68 20.49-5.12 6.7-11.3 10.81-18.54 12.33-.05-.82-.31-2.22-.31-4.22z" />
          </svg>
          <span className="font-semibold text-[15px] tracking-tight hidden sm:inline">
            Store
          </span>
        </button>

        {/* Center: Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search for iPhone, Mac, AirPods..."
              className="w-full bg-[#F5F5F7] text-[15px] text-[#1D1D1F] placeholder-gray-400 pl-11 pr-10 py-2.5 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 focus:border-[#0066CC]/40 focus:bg-white transition-all"
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

          {/* Search Dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#E5E5E7] p-4 z-50 animate-scale-in">
              <div className="flex items-center justify-between px-1 pb-3 mb-3 border-b border-gray-100 text-[13px] text-gray-500 font-medium">
                <span>Products</span>
                <span>{filteredProducts.length} results</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-[14px] text-gray-400">
                  No products found for "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-3 hover:bg-[#F5F5F7] rounded-xl transition-colors cursor-pointer"
                      onClick={() => {
                        onSelectProduct(product);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1"
                        />
                        <div>
                          <div className="font-semibold text-[14px] text-[#1D1D1F] group-hover:text-[#0066CC]">
                            {product.name}
                          </div>
                          <div className="text-[13px] text-gray-500 line-clamp-1">
                            {product.tagline}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-[14px] font-bold text-[#1D1D1F]">
                            ${product.price}
                          </div>
                          <div className="text-[12px] text-emerald-600 font-medium">
                            ${product.monthlyPrice}/mo
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                          }}
                          className="bg-[#0066CC] hover:bg-[#0055B3] text-white text-[13px] px-4 py-2 rounded-full font-medium transition-colors"
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

        {/* Right: Action Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleFilterDrawer}
            className="p-2.5 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
            title="Filters"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCompare}
            className="relative p-2.5 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
            title="Compare"
          >
            <Scale className="w-5 h-5" />
            {compareCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#0066CC] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                {compareCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D70015] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Account */}
          <div className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="p-2.5 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-full transition-colors"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#E5E5E7] p-5 z-50 animate-scale-in">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#0055B3] flex items-center justify-center text-white font-bold text-sm">
                    AJ
                  </div>
                  <div>
                    <div className="font-semibold text-[15px] text-[#1D1D1F]">
                      Signed in as Customer
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Apple Card 3% Active
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  {['Order History & Tracking', 'Trade-In Credit Balance', 'Saved Payment Methods'].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-3 py-2.5 hover:bg-[#F5F5F7] rounded-xl text-[14px] text-gray-700 flex justify-between items-center transition-colors"
                    >
                      <span>{item}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#1D1D1F] hover:bg-black text-white px-4 py-2.5 rounded-full font-medium text-[14px] ml-1 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-[#0066CC] text-white text-[12px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
