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
          className="flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 247 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M170.06 0.543366C211.433 -3.50614 236.19 15.0004 225.777 58.7006C219.822 83.6759 197.521 97.0917 177.019 109.248C202.895 128.074 240.615 133.768 245.737 174.945C253.304 228.401 158.951 268.373 130.476 220.383C109.715 185.398 107.262 130.7 104.03 90.9305C110.203 87.7638 117.471 84.5483 123.813 81.5593C132.049 77.8651 137.511 75.9054 146.175 73.3062C146.449 79.2815 146.175 83.1095 145.731 89.116C163.371 73.5985 182.968 56.9004 200.005 40.9441C191.923 40.0734 182.612 38.3982 174.453 37.2143L123.188 29.5633C129.077 35.8709 132.236 39.4949 136.853 46.7363C133.256 48.009 129.198 49.3672 125.524 50.3789C81.6609 62.4589 43.0633 89.6682 1.77713 107.681C0.905266 97.5528 -0.234185 82.0687 0.0421786 72.0297C4.47551 66.5018 15.1687 58.6589 20.9833 54.4602C61.8768 24.9276 119.449 3.86687 170.06 0.543366Z" fill="url(#nav_logo_gradient)"/>
            <path d="M69.3843 104.332C70.2243 104.237 69.8076 104.242 70.7452 104.75C72.3815 109.08 72.4012 117.39 72.8251 122.091C77.3736 172.495 84.2936 229.866 123.539 266.163C127.668 269.987 135.597 273.825 140.598 277.026C124.493 283.182 101.35 277.767 85.9162 271.323C79.9453 268.545 74.2502 265.211 68.9061 261.362C38.4491 239.421 20.2864 200.135 11.2739 164.666C8.90839 155.356 7.37249 145.404 5.82617 135.893C18.9249 126.569 53.7972 110.883 69.3843 104.332Z" fill="#38BDF8"/>
            <defs>
              <linearGradient id="nav_logo_gradient" x1="184" y1="36.5" x2="18" y2="180.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F47B09"/>
                <stop offset="1" stop-color="#FBAC09"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="font-quicksand text-xl text-white tracking-[-2px]">
            TechieBase
          </span>
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
