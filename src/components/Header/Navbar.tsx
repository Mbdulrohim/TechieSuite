import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, X } from 'lucide-react';
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
  onSelectCategory,
  cartCount,
  onOpenCart,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProducts = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

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
    <header className="sticky top-0 z-50 bg-[rgba(0,0,0,0.8)] backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between text-white/80 text-[12px]">
        {/* Techiebase Logo */}
        <button
          onClick={() => onSelectCategory('all')}
          className="hover:text-white transition-colors font-inter text-xl font-bold tracking-wider"
        >
          Techiebase
        </button>

        {/* Global Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <button onClick={() => onSelectCategory('all')} className="hover:text-white transition-colors">Store</button>
          <button onClick={() => onSelectCategory('mac')} className="hover:text-white transition-colors">Mac</button>
          <button onClick={() => onSelectCategory('ipad')} className="hover:text-white transition-colors">iPad</button>
          <button onClick={() => onSelectCategory('iphone')} className="hover:text-white transition-colors">iPhone</button>
          <button onClick={() => onSelectCategory('watch')} className="hover:text-white transition-colors">Watch</button>
          <button onClick={() => onSelectCategory('airpods')} className="hover:text-white transition-colors">AirPods</button>
          <button onClick={() => onSelectCategory('accessories')} className="hover:text-white transition-colors">Accessories</button>
          <button onClick={() => onSelectCategory('deals')} className="hover:text-white transition-colors text-emerald-400">Deals</button>
          <a href="#" className="hover:text-white transition-colors">Trade-In</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </nav>

        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-white transition-colors h-11 min-w-[44px] flex items-center justify-center active:opacity-80"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Apple-style global search dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] max-w-xl bg-white rounded-b-2xl shadow-xl text-black -translate-x-1/2 left-1/2 p-4 md:p-6 animate-fade-in-up z-50">
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 absolute left-0 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search Techiebase"
                    value={searchQuery}
                    className="w-full text-base md:text-2xl font-inter bg-transparent border-none pl-8 pr-8 focus:outline-none placeholder-gray-300 h-11"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="absolute right-0 text-gray-400 hover:text-black h-11 min-w-[44px] flex items-center justify-center active:opacity-80">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {searchQuery.trim() && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-[12px] text-gray-500 font-semibold mb-3">Quick Links</p>
                    <div className="space-y-4">
                      {filteredProducts.map(p => (
                        <div
                          key={p.id}
                          className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
                          onClick={() => {
                            onSelectProduct(p);
                            setIsSearchOpen(false);
                          }}
                        >
                          <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-contain" />
                          <div className="text-[14px] font-semibold">{p.name}</div>
                        </div>
                      ))}
                      {filteredProducts.length === 0 && (
                        <div className="text-[14px] text-gray-500">No results found.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bag Icon */}
          <button onClick={onOpenCart} className="hover:text-white transition-colors relative h-11 min-w-[44px] flex items-center justify-center active:opacity-80">
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
