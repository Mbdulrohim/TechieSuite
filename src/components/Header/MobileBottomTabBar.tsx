import React from 'react';
import { Home, Search, Smartphone, Sparkles, ShoppingBag } from 'lucide-react';

interface MobileBottomTabBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  onOpenSearch?: () => void;
}

export const MobileBottomTabBar: React.FC<MobileBottomTabBarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  onOpenSearch,
}) => {
  const scrollToTradeIn = () => {
    const tradeInEl = document.getElementById('trade-in-section');
    if (tradeInEl) {
      tradeInEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 800, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    onSelectCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-gray-200/80 px-4 py-2 flex items-center justify-around text-gray-500 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}
    >
      {/* Home / Store */}
      <button 
        onClick={scrollToTop}
        className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium text-gray-700 active:scale-95 transition-transform"
      >
        <Home className="w-5 h-5" />
        <span>Store</span>
      </button>

      {/* Search */}
      <button 
        onClick={onOpenSearch || scrollToTop}
        className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium active:scale-95 transition-transform"
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>

      {/* Trade-In */}
      <button 
        onClick={scrollToTradeIn}
        className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium active:scale-95 transition-transform"
      >
        <Smartphone className="w-5 h-5" />
        <span>Trade-In</span>
      </button>

      {/* Deals */}
      <button 
        onClick={() => onSelectCategory('deals')}
        className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium text-emerald-600 active:scale-95 transition-transform"
      >
        <Sparkles className="w-5 h-5" />
        <span>Deals</span>
      </button>

      {/* Bag / Cart */}
      <button 
        onClick={onOpenCart}
        className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-medium active:scale-95 transition-transform relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-gray-900" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#0071e3] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-gray-900 font-semibold">Bag</span>
      </button>
    </nav>
  );
};
