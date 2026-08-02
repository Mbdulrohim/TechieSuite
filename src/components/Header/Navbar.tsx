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
        {/* Apple Logo */}
        <button
          onClick={() => onSelectCategory('all')}
          className="hover:text-white transition-colors"
        >
          <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.18-2.62-7.05-7.23-11.62-13.84-6.3-9.15-11.23-19.16-14.79-30.05-3.56-10.89-5.34-21.36-5.34-31.42 0-14.02 3.52-25.59 10.56-34.7 7.05-9.12 15.86-13.79 26.43-14.02 4.93 0 10.31 1.25 16.14 3.75 5.83 2.5 9.74 3.75 11.73 3.75 1.7 0 5.72-1.25 12.07-3.75 6.35-2.5 11.45-3.64 15.3-3.42 9.79.54 17.84 4.13 24.16 10.77 6.32 6.64 10.23 14.88 11.73 24.72-10.77 6.47-16.1 15.22-15.99 26.25.12 8.7 3.37 16.03 9.76 21.99 6.39 5.96 14.02 9.24 22.89 9.84-2.18 6.53-4.99 13.26-8.43 20.19zM119.22 31.02c0-6.85 2.45-13.56 7.35-20.13 4.9-6.57 11.13-10.59 18.69-12.06.33 1.3.49 2.5.49 3.59 0 6.96-2.56 13.79-7.68 20.49-5.12 6.7-11.3 10.81-18.54 12.33-.05-.82-.31-2.22-.31-4.22z" />
          </svg>
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
        </nav>

        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hover:text-white transition-colors"
            >
              <Search className="w-[15px] h-[15px]" />
            </button>

            {/* Apple-style global search dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-4 w-screen max-w-[600px] bg-white rounded-b-2xl shadow-xl text-black -translate-x-1/2 left-1/2 p-6 animate-fade-in-up">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search apple.com"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-2xl font-semibold bg-transparent border-none pl-8 focus:outline-none placeholder-gray-300"
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
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
          <button onClick={onOpenCart} className="hover:text-white transition-colors relative">
            <ShoppingBag className="w-[15px] h-[15px]" />
            {cartCount > 0 && (
              <span className="absolute -bottom-1 -right-1 bg-white text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
