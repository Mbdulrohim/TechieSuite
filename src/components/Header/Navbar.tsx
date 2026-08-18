import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, X } from 'lucide-react';
import { Condition, Product } from '../../types';
import { formatNaira } from '../../utils';

interface NavbarProps {
  products: Product[];
  activeCategory: string;
  activeCondition: Condition;
  onSelectCategory: (category: string) => void;
  onSelectCondition: (condition: Condition, category?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenJournal: () => void;
  isJournalActive: boolean;
}

/** Top-level entries. Everything else stays reachable from the Store panel and
 *  the category pills — 16 flat items overflowed below a 1440px viewport. */
const PRIMARY_NAV: Array<[string, string]> = [
  ['all', 'Store'],
  ['iphone', 'iPhone'],
  ['mac', 'Mac'],
  ['ipad', 'iPad'],
  ['samsung', 'Samsung'],
  ['gaming', 'Gaming'],
  ['laptops', 'Laptops'],
  ['audio', 'Audio'],
  ['accessories', 'Accessories'],
];

/** Every category, shown as columns inside the Store panel. */
const STORE_PANEL: Array<{ heading: string; items: Array<[string, string]> }> = [
  {
    heading: 'Apple',
    items: [
      ['iphone', 'iPhone'],
      ['mac', 'Mac'],
      ['ipad', 'iPad'],
      ['watch', 'Apple Watch'],
      ['airpods', 'AirPods'],
    ],
  },
  {
    heading: 'More brands',
    items: [
      ['samsung', 'Samsung'],
      ['gaming', 'Gaming'],
      ['laptops', 'Laptops'],
      ['gear', 'Creator Gear'],
    ],
  },
  {
    heading: 'Everything else',
    items: [
      ['audio', 'Audio'],
      ['power', 'Power'],
      ['anker', 'Anker Store'],
      ['accessories', 'Accessories'],
      ['deals', 'Deals'],
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  products,
  activeCategory,
  activeCondition,
  onSelectCategory,
  onSelectCondition,
  cartCount,
  onOpenCart,
  onSelectProduct,
  onOpenJournal,
  isJournalActive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    };
  }, []);

  const cancelMenuClose = () => {
    if (!closeMenuTimer.current) return;
    clearTimeout(closeMenuTimer.current);
    closeMenuTimer.current = null;
  };

  const openNavMenu = (menu: string) => {
    cancelMenuClose();
    setOpenMenu(menu);
  };

  const scheduleMenuClose = () => {
    cancelMenuClose();
    closeMenuTimer.current = setTimeout(() => {
      setOpenMenu(null);
      closeMenuTimer.current = null;
    }, 140);
  };

  /** Products shown inside a category panel, in the condition you are browsing. */
  const panelProducts = (category: string) =>
    products
      .filter((p) => p.category === category && p.condition === activeCondition)
      .slice(0, 8);

  const goToCategory = (category: string) => {
    cancelMenuClose();
    setOpenMenu(null);
    onSelectCategory(category);
  };

  const goToProduct = (product: Product) => {
    cancelMenuClose();
    setOpenMenu(null);
    onSelectProduct(product);
  };

  return (
    <header className="sticky top-0 z-50 bg-[rgba(0,0,0,0.8)] backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-12 flex items-center justify-between text-white/80 text-caption">
        {/* Techiebase Logo */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 247 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M170.06 0.543366C211.433 -3.50614 236.19 15.0004 225.777 58.7006C219.822 83.6759 197.521 97.0917 177.019 109.248C202.895 128.074 240.615 133.768 245.737 174.945C253.304 228.401 158.951 268.373 130.476 220.383C109.715 185.398 107.262 130.7 104.03 90.9305C110.203 87.7638 117.471 84.5483 123.813 81.5593C132.049 77.8651 137.511 75.9054 146.175 73.3062C146.449 79.2815 146.175 83.1095 145.731 89.116C163.371 73.5985 182.968 56.9004 200.005 40.9441C191.923 40.0734 182.612 38.3982 174.453 37.2143L123.188 29.5633C129.077 35.8709 132.236 39.4949 136.853 46.7363C133.256 48.009 129.198 49.3672 125.524 50.3789C81.6609 62.4589 43.0633 89.6682 1.77713 107.681C0.905266 97.5528 -0.234185 82.0687 0.0421786 72.0297C4.47551 66.5018 15.1687 58.6589 20.9833 54.4602C61.8768 24.9276 119.449 3.86687 170.06 0.543366Z" fill="url(#nav_logo_gradient)" />
            <path d="M69.3843 104.332C70.2243 104.237 69.8076 104.242 70.7452 104.75C72.3815 109.08 72.4012 117.39 72.8251 122.091C77.3736 172.495 84.2936 229.866 123.539 266.163C127.668 269.987 135.597 273.825 140.598 277.026C124.493 283.182 101.35 277.767 85.9162 271.323C79.9453 268.545 74.2502 265.211 68.9061 261.362C38.4491 239.421 20.2864 200.135 11.2739 164.666C8.90839 155.356 7.37249 145.404 5.82617 135.893C18.9249 126.569 53.7972 110.883 69.3843 104.332Z" fill="#38BDF8" />
            <defs>
              <linearGradient id="nav_logo_gradient" x1="184" y1="36.5" x2="18" y2="180.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F47B09" />
                <stop offset="1" stopColor="#FBAC09" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-quicksand text-lead text-white">
            Techie<span className="text-brand">Base</span>
          </span>
        </button>

        {/* Global links, hidden on mobile. Hovering a category drops a panel
            listing the products under it. */}
        <nav
          ref={menuRef}
          onMouseEnter={cancelMenuClose}
          onMouseLeave={scheduleMenuClose}
          className="hidden md:flex items-center gap-5 lg:gap-6 font-medium mx-4 min-w-0"
        >
          {PRIMARY_NAV.map(([id, label]) => (
            <div key={id} onMouseEnter={() => openNavMenu(id)}>
              <button
                onClick={() => goToCategory(id)}
                onFocus={() => openNavMenu(id)}
                aria-current={activeCategory === id ? 'page' : undefined}
                aria-expanded={openMenu === id}
                aria-haspopup="true"
                className={`shrink-0 transition-colors hover:text-white ${activeCategory === id ? 'text-white' : ''}`}
              >
                {label}
              </button>
            </div>
          ))}

          <button
            type="button"
            onMouseEnter={() => setOpenMenu(null)}
            onClick={() => onSelectCondition('pre-owned', 'all')}
            aria-current={activeCondition === 'pre-owned' ? 'page' : undefined}
            className={`shrink-0 transition-colors hover:text-white ${activeCondition === 'pre-owned' ? 'text-white' : 'text-brand-amber'}`}
          >
            Pre-owned
          </button>

          <button
            type="button"
            onMouseEnter={() => setOpenMenu(null)}
            onClick={() => goToCategory('deals')}
            aria-current={activeCategory === 'deals' ? 'page' : undefined}
            className={`shrink-0 transition-colors hover:text-white ${activeCategory === 'deals' ? 'text-white' : 'text-success-bright'}`}
          >
            Deals
          </button>

          <button
            type="button"
            onMouseEnter={() => setOpenMenu(null)}
            onClick={onOpenJournal}
            aria-current={isJournalActive ? 'page' : undefined}
            className={`shrink-0 transition-colors hover:text-white ${isJournalActive ? 'text-white' : ''}`}
          >
            Journal
          </button>

          {/* Dropdown panel — full-bleed under the bar, Apple-style */}
          {openMenu && (
            <div
              onMouseEnter={cancelMenuClose}
              onMouseLeave={scheduleMenuClose}
              className="absolute inset-x-0 top-full z-50 bg-white text-ink shadow-panel animate-fade-in"
            >
              <div className="mx-auto max-w-[1400px] px-8 py-10">
                {openMenu === 'all' ? (
                  <div className="grid grid-cols-3 gap-10">
                    {STORE_PANEL.map((column) => (
                      <div key={column.heading}>
                        <p className="eyebrow text-ink-tertiary">{column.heading}</p>
                        <ul className="mt-4 space-y-2.5">
                          {column.items.map(([id, label]) => (
                            <li key={id}>
                              <button
                                type="button"
                                onClick={() => goToCategory(id)}
                                className="text-lead font-semibold text-ink transition-colors hover:text-link"
                              >
                                {label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <p className="eyebrow text-ink-tertiary">
                      {activeCondition === 'pre-owned' ? 'Pre-owned' : 'Brand new'}
                    </p>
                    <div className="mt-4 grid grid-cols-4 gap-x-8 gap-y-3">
                      {panelProducts(openMenu).map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => goToProduct(product)}
                          className="group flex items-center gap-3 rounded-control p-2 text-left transition-colors hover:bg-canvas"
                        >
                          <img
                            src={product.imageUrl}
                            alt=""
                            className="h-11 w-11 shrink-0 rounded-control bg-canvas object-cover"
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-footnote font-semibold text-ink">
                              {product.name}
                            </span>
                            <span className="block text-caption text-ink-secondary">
                              {formatNaira(product.price)}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => goToCategory(openMenu)}
                      className="mt-7 inline-flex items-center gap-1 text-footnote font-semibold text-link hover:underline"
                    >
                      Shop all {PRIMARY_NAV.find(([id]) => id === openMenu)?.[1]} &rsaquo;
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search products"
              className="hover:text-white transition-colors h-11 min-w-[44px] flex items-center justify-center active:opacity-80"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Apple-style global search dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-2 w-[calc(100vw-2rem)] max-w-xl bg-white rounded-b-card shadow-xl text-black -translate-x-1/2 left-1/2 p-4 md:p-6 animate-fade-in-up z-50">
                <div className="relative flex items-center">
                  <Search className="w-5 h-5 absolute left-0 text-ink-tertiary" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search Techiebase"
                    value={searchQuery}
                    className="w-full text-body md:text-title-sm bg-transparent border-none pl-8 pr-8 focus:outline-none placeholder-ink-tertiary h-11"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setIsSearchOpen(false)} aria-label="Close search" className="absolute right-0 text-ink-tertiary hover:text-black h-11 min-w-[44px] flex items-center justify-center active:opacity-80">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {searchQuery.trim() && (
                  <div className="mt-6 pt-6 border-t border-hairline-soft">
                    <p className="text-caption text-ink-secondary font-semibold mb-3">Quick Links</p>
                    <div className="space-y-4">
                      {filteredProducts.map(p => (
                        <div
                          key={p.id}
                          className="flex items-center gap-4 cursor-pointer hover:bg-canvas p-2 rounded-control transition-colors"
                          onClick={() => {
                            onSelectProduct(p);
                            setIsSearchOpen(false);
                          }}
                        >
                          <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-contain" />
                          <div className="text-footnote font-semibold">{p.name}</div>
                        </div>
                      ))}
                      {filteredProducts.length === 0 && (
                        <div className="text-footnote text-ink-secondary">No results found.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/2348143270982?text=Hello%20TechieBase!%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-whatsapp transition-colors h-11 min-w-[44px] flex items-center justify-center active:scale-[0.95]"
            title="Chat with TechieBase on WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          {/* Bag Icon */}
          <button onClick={onOpenCart} aria-label={`Open bag with ${cartCount} items`} className="hover:text-white transition-colors relative h-11 min-w-[44px] flex items-center justify-center active:opacity-80">
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-micro font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
