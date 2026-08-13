import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRODUCTS, FEATURED_BUNDLES, STORE_LOCATIONS } from './data/products';
import { Product, CartItem, TradeInQuote, FilterState, ProductColor, StorageOption, StoreLocation, ProductBundle, Condition } from './types';
import { formatNaira } from './utils';

// Components
import { TopUtilityBar } from './components/Header/TopUtilityBar';
import { Navbar } from './components/Header/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryPills } from './components/CategoryPills';
import { ProductRow } from './components/ProductRow';
import { CatalogView } from './components/CatalogView';
import { FacetedFilterSidebar } from './components/FacetedFilterSidebar';
import { TradeInBanner } from './components/TradeInBanner';
import { WaitlistTeaser } from './components/WaitlistTeaser';
import { SellDeviceSection } from './components/SellDeviceSection';
import { BundleSection } from './components/BundleSection';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareModal } from './components/CompareModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreSelectorModal } from './components/StoreSelectorModal';
import { JournalIndex, ArticleView } from './components/JournalView';
import { LegalIndex, LegalDocumentView } from './components/LegalView';
import { Footer } from './components/Footer';
import { CookieModal } from './components/CookieModal';
import { BlogPage } from './components/BlogPage';
import { WaitlistModal } from './components/WaitlistModal';
import { ARTICLES, FEATURED_ARTICLE, articleBySlug } from './data/articles';
import { LEGAL_DOCUMENTS, legalBySlug } from './data/legal';
import { usePersistentState } from './hooks/usePersistentState';
import { ArrowRight, Filter, Heart, MapPin, Scale, X } from 'lucide-react';

const CATEGORY_IDS = [
  'all',
  'iphone',
  'mac',
  'ipad',
  'watch',
  'airpods',
  'samsung',
  'gaming',
  'laptops',
  'audio',
  'power',
  'accessories',
  'pre-owned',
  'anker',
  'deals',
];

const readCategoryFromUrl = () => {
  if (typeof window === 'undefined') return 'all';
  const category = new URLSearchParams(window.location.search).get('category');
  return category && CATEGORY_IDS.includes(category) ? category : 'all';
};

/** Condition is a sticky mode rather than a category: the storefront opens on
 *  brand new, and stays in whichever world you picked as you browse. */
const readConditionFromUrl = (): Condition => {
  if (typeof window === 'undefined') return 'new';
  return new URLSearchParams(window.location.search).get('condition') === 'pre-owned'
    ? 'pre-owned'
    : 'new';
};

/** Journal routing rides on one param:
 *  no `journal` param -> storefront, `?journal` -> index, `?journal=slug` -> article.
 *  Returns null for the storefront, '' for the index, or a valid slug. */
const readJournalFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  if (!params.has('journal')) return null;
  const slug = params.get('journal') ?? '';
  return slug && articleBySlug(slug) ? slug : '';
};

/** Same one-param scheme as the journal: no `legal` param -> storefront,
 *  `?legal` -> index, `?legal=slug` -> a single policy. An unknown slug falls
 *  back to the index rather than 404ing, since a stale link to a renamed policy
 *  should still land somewhere useful. */
const readLegalFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  if (!params.has('legal')) return null;
  const slug = params.get('legal') ?? '';
  return slug && legalBySlug(slug) ? slug : '';
};

/** Blog page routing: `?blog` -> show blog page. */
const readBlogFromUrl = (): boolean => {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('blog');
};

const INITIAL_FILTERS: FilterState = {
  priceRange: [0, 2500],
  minRating: 0,
  selectedStorage: [],
  inStockOnly: false,
  onSaleOnly: false,
  sortBy: 'featured',
};

/** Bundles are looked up by id rather than by position — this list has been
 *  reordered before, and positional indexing silently pointed the home page at
 *  the wrong products last time. */
const bundleById = (id: string) => FEATURED_BUNDLES.find((bundle) => bundle.id === id);

const getIphoneModelRank = (product: Product) => {
  if (product.category !== 'iphone') return 0;

  const generation = product.name === 'iPhone Air'
    ? 17
    : Number(product.name.match(/iPhone (\d+)/)?.[1] || 0);
  const variantRank = product.name.includes('Pro Max')
    ? 50
    : product.name.includes('Pro')
      ? 40
      : product.name === 'iPhone Air'
        ? 30
        : product.name.includes('Plus')
          ? 20
          : /iPhone \d+$/.test(product.name)
            ? 10
            : 5;

  return generation * 100 + variantRank;
};

/** Closes out the brand-new storefront by handing the shopper to pre-owned,
 *  rather than ending the page on nothing. */
const PreOwnedHandoff = ({ onContinue }: { onContinue: () => void }) => (
  <section className="mx-auto max-w-[1400px] px-6 pt-8">
    <div className="rounded-panel bg-gradient-to-br from-[#f0e9df] via-canvas to-[#e6ecec] px-8 py-14 text-center md:px-12 md:py-20">
      <p className="eyebrow text-sale">Also at TechieBase</p>
      <h2 className="mt-3 text-title font-semibold text-ink md:text-headline">
        Looking to spend less?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-body text-ink-secondary">
        Shop certified pre-owned iPhones, Macs, Galaxy phones and consoles — each one inspected,
        battery-tested and covered by a TechieBase warranty.
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-7 text-footnote font-semibold text-white transition-colors hover:bg-black"
      >
        Continue shopping pre-owned <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  </section>
);

export default function App() {
  // Primary State
  const [activeCategory, setActiveCategory] = useState<string>(readCategoryFromUrl);
  const [activeCondition, setActiveCondition] = useState<Condition>(readConditionFromUrl);
  /** null = storefront, '' = journal index, otherwise an article slug. */
  const [journalSlug, setJournalSlug] = useState<string | null>(readJournalFromUrl);
  /** null = storefront, '' = legal index, otherwise a policy slug. */
  const [legalSlug, setLegalSlug] = useState<string | null>(readLegalFromUrl);
  const [isBlogOpen, setIsBlogOpen] = useState(readBlogFromUrl);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);

  // E-Commerce Cart & Persistence State
  // Keys are versioned: if CartItem ever changes shape, bump the suffix and old
  // carts evaporate instead of needing a migration.
  const [cart, setCart] = usePersistentState<CartItem[]>('techiebase.cart.v1', [], Array.isArray);
  const [wishlist, setWishlist] = usePersistentState<string[]>('techiebase.wishlist.v1', [], Array.isArray);
  /** Session-scoped on purpose — a comparison tray is a train of thought, not a
   *  saved list, and persisting it would double the stale-product surface. */
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [tradeInQuote, setTradeInQuote] = useState<TradeInQuote | null>(null);

  /** Transient status line. Keyed by id rather than by text so raising the same
   *  message twice in a row re-triggers the timer instead of looking stuck. */
  const [notice, setNotice] = useState<{ id: number; text: string } | null>(null);
  const showNotice = useCallback((text: string) => {
    setNotice({ id: Date.now(), text });
  }, []);

  // Filters
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Modal Visibility Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cookie consent auto-show
  useEffect(() => {
    try {
      const consent = localStorage.getItem('techiesuite_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setIsCookieModalOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleSelectCategory = useCallback((category: string, addToHistory = true) => {
    const nextCategory = CATEGORY_IDS.includes(category) ? category : 'all';
    const nextCondition = nextCategory === 'pre-owned' ? 'pre-owned' : activeCondition;
    setActiveCategory(nextCategory);
    if (nextCategory === 'pre-owned') setActiveCondition('pre-owned');
    setJournalSlug(null);
    setLegalSlug(null);
    setIsBlogOpen(false);
    setFilters(INITIAL_FILTERS);

    if (addToHistory) {
      const url = new URL(window.location.href);
      url.searchParams.delete('journal');
      url.searchParams.delete('legal');
      url.searchParams.delete('blog');
      if (nextCondition === 'pre-owned') url.searchParams.set('condition', 'pre-owned');
      else url.searchParams.delete('condition');
      if (nextCategory === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', nextCategory);
      window.history.pushState({ category: nextCategory }, '', url);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCondition]);

  /** Switching condition keeps you in the same category, so "pre-owned iPhone"
   *  is one click from "new iPhone". */
  const handleSelectCondition = useCallback((condition: Condition, category?: string) => {
    setActiveCondition(condition);
    setJournalSlug(null);
    setLegalSlug(null);
    setIsBlogOpen(false);
    setFilters(INITIAL_FILTERS);

    const nextCategory = category ?? readCategoryFromUrl();
    if (category !== undefined) setActiveCategory(nextCategory);

    const url = new URL(window.location.href);
    url.searchParams.delete('journal');
    url.searchParams.delete('legal');
    url.searchParams.delete('blog');
    if (condition === 'new') url.searchParams.delete('condition');
    else url.searchParams.set('condition', condition);
    if (nextCategory === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', nextCategory);
    window.history.pushState({ condition, category: nextCategory }, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Pass a slug to open an article, or nothing to open the journal index. */
  const handleOpenJournal = useCallback((slug = '') => {
    setJournalSlug(slug);
    setLegalSlug(null);
    setIsBlogOpen(false);

    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('legal');
    url.searchParams.delete('blog');
    url.searchParams.set('journal', slug);
    window.history.pushState({ journal: slug }, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /** Pass a slug to open one policy, or nothing to open the legal index. */
  const handleOpenLegal = useCallback((slug = '') => {
    setLegalSlug(slug);
    setJournalSlug(null);
    setIsBlogOpen(false);

    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('journal');
    url.searchParams.delete('blog');
    url.searchParams.set('legal', slug);
    window.history.pushState({ legal: slug }, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenBlog = useCallback(() => {
    setIsBlogOpen(true);
    setJournalSlug(null);
    setLegalSlug(null);

    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('journal');
    url.searchParams.delete('legal');
    url.searchParams.set('blog', '');
    window.history.pushState({ blog: true }, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCloseBlog = useCallback(() => {
    setIsBlogOpen(false);

    const url = new URL(window.location.href);
    url.searchParams.delete('blog');
    window.history.pushState({}, '', url);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      // Re-read every route from the URL so Back works across store, condition,
      // journal and legal.
      handleSelectCategory(readCategoryFromUrl(), false);
      setActiveCondition(readConditionFromUrl());
      setJournalSlug(readJournalFromUrl());
      setLegalSlug(readLegalFromUrl());
      setIsBlogOpen(readBlogFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleSelectCategory]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  /**
   * Reconcile a rehydrated cart against the live catalogue, once, on mount.
   *
   * A CartItem embeds a whole Product, so a bag saved last month can come back
   * holding a price that no longer exists. The catalogue is the price of record:
   * the stored product is replaced outright, never merged. Colour and storage
   * are re-resolved by name too, because a discontinued option would otherwise
   * keep applying a priceDelta the catalogue no longer offers.
   *
   * Runs against the mount-time `cart`, not inside the updater, so it stays pure
   * under StrictMode's double invocation.
   */
  useEffect(() => {
    if (cart.length === 0) return;

    let dropped = 0;
    let repriced = 0;

    const reconciled = cart.flatMap((item) => {
      const live = PRODUCTS.find((product) => product.id === item.product.id);
      if (!live) {
        dropped += 1;
        return [];
      }

      const storage = item.selectedStorage
        ? live.storageOptions?.find((option) => option.capacity === item.selectedStorage?.capacity)
        : undefined;

      // The exact configuration is gone — better to drop the line than to
      // silently sell a different one.
      if (item.selectedStorage && !storage) {
        dropped += 1;
        return [];
      }

      if (live.price !== item.product.price) repriced += 1;

      return [{
        ...item,
        product: live,
        selectedColor: live.colors.find((colour) => colour.name === item.selectedColor.name) ?? live.colors[0],
        selectedStorage: storage,
      }];
    });

    if (dropped === 0 && repriced === 0) return;

    setCart(reconciled);
    showNotice(
      dropped > 0
        ? `${dropped} item${dropped > 1 ? 's are' : ' is'} no longer available and left your bag.`
        : 'Prices in your bag have been updated.'
    );
    // Mount only — this reconciles what came out of storage, not later edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered & Sorted Product Catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (activeCategory === 'pre-owned') {
        return product.condition === 'pre-owned';
      }

      // Condition gate — the two worlds never mix in a listing.
      if (product.condition !== activeCondition) return false;

      // Category filter
      if (activeCategory !== 'all' && activeCategory !== 'deals') {
        if (product.category !== activeCategory) return false;
      } else if (activeCategory === 'deals') {
        if (!product.originalPrice) return false;
      }

      // Max price
      if (product.price > filters.priceRange[1]) return false;

      // Rating
      if (product.rating < filters.minRating) return false;

      // Storage filter
      if (filters.selectedStorage.length > 0) {
        const hasStorage = product.storageOptions?.some((option) =>
          filters.selectedStorage.some((storage) => option.capacity.startsWith(storage))
        );
        if (!hasStorage) return false;
      }

      // In stock
      if (filters.inStockOnly && !product.inStock) return false;

      // On sale
      if (filters.onSaleOnly && !product.originalPrice) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (a.category === 'iphone' && b.category === 'iphone') {
        return getIphoneModelRank(b) - getIphoneModelRank(a);
      }
      return 0;
    });
  }, [activeCategory, activeCondition, filters]);

  const productsForSection = (category: Product['category']) =>
    filteredProducts.filter((product) => product.category === category);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    selectedColor?: ProductColor,
    selectedStorage?: StorageOption,
    protection: boolean = false
  ) => {
    const colorToUse = selectedColor || product.colors[0];
    const storageToUse = selectedStorage || (product.storageOptions ? product.storageOptions[0] : undefined);

    const cartItemId = `${product.id}-${colorToUse.name}-${storageToUse?.capacity || 'std'}-${protection ? 'care' : 'nocare'}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          selectedColor: colorToUse,
          selectedStorage: storageToUse,
          protection,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleAddBundleToCart = (
    bundle: ProductBundle,
    selectedAccessoryIds: string[],
    selectedMainColor: ProductColor
  ) => {
    // Add main product
    handleAddToCart(bundle.mainProduct, selectedMainColor);

    // Add selected accessories
    bundle.accessories.forEach((acc) => {
      if (selectedAccessoryIds.includes(acc.id)) {
        handleAddToCart(acc, acc.colors[0]);
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleToggleProtection = (cartItemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, protection: !item.protection } : item
      )
    );
  };

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Compare Handlers
  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showNotice('You can compare up to 3 models at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const iphoneBundle = bundleById('bundle-iphone-creator');
  const gamingBundle = bundleById('bundle-ps5-starter');

  return (
    <div className="min-h-screen w-full max-w-full bg-canvas text-ink antialiased flex flex-col justify-between">

      {/* Sticky Header Section for Mobile & Desktop */}
      <div className="sticky top-0 z-50 w-full">
        {/* 1. Utility Top Bar */}
        <TopUtilityBar onLearnMore={() => handleOpenJournal(FEATURED_ARTICLE.slug)} />

        {/* 2. Primary Navigation */}
        <Navbar
          products={PRODUCTS}
          activeCategory={activeCategory}
          activeCondition={activeCondition}
          onSelectCategory={handleSelectCategory}
          onSelectCondition={handleSelectCondition}
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onOpenJournal={() => handleOpenJournal()}
          isJournalActive={journalSlug !== null}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {isBlogOpen ? (
          <BlogPage onBack={handleCloseBlog} onOpenWaitlist={() => setIsWaitlistOpen(true)} />
        ) : legalSlug !== null ? (
          legalSlug === '' ? (
            <LegalIndex onOpenDocument={handleOpenLegal} />
          ) : (
            <LegalDocumentView
              // readLegalFromUrl only ever yields a slug that resolves, but the
              // state is also set by hand above, so the index is the fallback.
              document={legalBySlug(legalSlug) ?? LEGAL_DOCUMENTS[0]}
              onBack={() => handleOpenLegal()}
            />
          )
        ) : journalSlug !== null ? (
          journalSlug === '' ? (
            <JournalIndex articles={ARTICLES} onOpenArticle={handleOpenJournal} />
          ) : (
            <ArticleView
              article={articleBySlug(journalSlug) ?? FEATURED_ARTICLE}
              related={ARTICLES.filter((a) => a.slug !== journalSlug).slice(0, 3)}
              onBack={() => handleOpenJournal()}
              onOpenArticle={handleOpenJournal}
            />
          )
        ) : activeCategory === 'all' && activeCondition === 'new' ? (
          <>
            <HeroCarousel
              products={PRODUCTS}
              onSelectProduct={setQuickViewProduct}
              onAddToCart={handleAddToCart}
            />

            <CategoryPills activeCategory={activeCategory} onSelectCategory={handleSelectCategory} />

            <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-6 pb-2">
              <button
                type="button"
                onClick={() => setIsStoreModalOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-footnote font-medium text-ink shadow-sm ring-1 ring-black/5 hover:ring-black/15"
              >
                <MapPin className="h-4 w-4 text-accent" />
                Pickup: {currentStore.name.replace('TechieBase ', '')}
              </button>

              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setIsWishlistOpen(true)} aria-label={`Open ${wishlist.length} saved items`} className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:ring-black/15">
                  <Heart className="h-4 w-4" />
                  {wishlist.length > 0 && <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-canvas" />}
                </button>
                <button type="button" onClick={() => setIsCompareOpen(true)} aria-label={`Compare ${compareList.length} products`} className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 hover:ring-black/15">
                  <Scale className="h-4 w-4" />
                  {compareList.length > 0 && <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-canvas" />}
                </button>
                <button type="button" onClick={() => setIsFilterDrawerOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-footnote font-medium text-white hover:bg-black">
                  <Filter className="h-4 w-4" /> Filter
                </button>
              </div>
            </div>

            <div className="space-y-4 pb-20">
              <ProductRow title="iPhone" products={productsForSection('iphone').slice(0, 8)} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('iphone')} />
              {/* Sits under the iPhone row so the next model reads as part of the
                  line-up rather than as an ad interrupting the page. */}
              <WaitlistTeaser />
              <ProductRow title="Mac" products={productsForSection('mac')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('mac')} />
              <TradeInBanner onApplyTradeIn={setTradeInQuote} appliedTradeIn={tradeInQuote} />
              <ProductRow title="iPad" products={productsForSection('ipad')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('ipad')} />
              <ProductRow title="Apple Watch" products={productsForSection('watch')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('watch')} />
              {iphoneBundle && <BundleSection bundle={iphoneBundle} onAddBundleToCart={handleAddBundleToCart} />}
              <ProductRow title="AirPods" products={productsForSection('airpods')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('airpods')} />
              <ProductRow title="Samsung" products={productsForSection('samsung')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('samsung')} />
              <ProductRow title="Gaming" products={productsForSection('gaming')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('gaming')} />
              {gamingBundle && <BundleSection bundle={gamingBundle} onAddBundleToCart={handleAddBundleToCart} />}
              <ProductRow title="Laptops" products={productsForSection('laptops')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('laptops')} />
              <ProductRow title="Audio" products={productsForSection('audio')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('audio')} />
              <ProductRow title="Power" products={productsForSection('power')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('power')} />
              <ProductRow title="Anker Power & Gear" products={productsForSection('anker')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('anker')} />
              <ProductRow title="Accessories" products={productsForSection('accessories')} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('accessories')} />
              <ProductRow title="Pre-Owned Certified" products={PRODUCTS.filter((product) => product.condition === 'pre-owned').slice(0, 8)} onAddToCart={handleAddToCart} onQuickView={setQuickViewProduct} onViewAll={() => handleSelectCategory('pre-owned')} />

              {/* Sits well away from TradeInBanner so the two offers stay
                  distinct — one is cash, the other is credit — and leads
                  straight into the pre-owned handoff, which is the same loop
                  from the other end. */}
              <SellDeviceSection id="sell" />

              <PreOwnedHandoff onContinue={() => handleSelectCondition('pre-owned', 'all')} />
            </div>
          </>
        ) : (
          <CatalogView
            category={activeCategory}
            condition={activeCondition}
            products={filteredProducts}
            storeName={currentStore.name.replace('TechieBase ', '')}
            wishlistCount={wishlist.length}
            compareCount={compareList.length}
            onOpenStore={() => setIsStoreModalOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenCompare={() => setIsCompareOpen(true)}
            onOpenFilters={() => setIsFilterDrawerOpen(true)}
            onOpenProduct={setQuickViewProduct}
            onResetFilters={() => setFilters(INITIAL_FILTERS)}
            onSelectCondition={(condition) => handleSelectCondition(condition)}
          />
        )}

      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onToggleProtection={handleToggleProtection}
        tradeInQuote={tradeInQuote}
        onRemoveTradeIn={() => setTradeInQuote(null)}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Filter Drawer */}
      <FacetedFilterSidebar
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChangeFilter={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
        onResetFilters={() => setFilters(INITIAL_FILTERS)}
        totalResults={filteredProducts.length}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, color, storage, protection) =>
          handleAddToCart(p, color, storage, protection)
        }
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleCompare={handleToggleCompare}
        isCompared={quickViewProduct ? compareList.some((p) => p.id === quickViewProduct.id) : false}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={compareList}
        onRemoveFromCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Wishlist Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-panel max-w-lg w-full p-8 shadow-2xl border border-hairline-soft animate-scale-in">
            <div className="flex justify-between items-center pb-4 border-b border-hairline-soft mb-5">
              <div className="flex items-center gap-2.5 font-semibold text-body text-ink">
                <Heart className="w-5 h-5 text-critical fill-current" />
                <span>Saved Items ({wishlistedProducts.length})</span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close saved items"
                className="p-2 text-ink-tertiary hover:text-ink hover:bg-canvas rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-12 text-ink-tertiary text-body">
                No items saved to your wishlist yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-canvas rounded-card">
                    <div className="flex items-center gap-4">
                      <img src={p.imageUrl} alt={p.name} className="w-14 h-14 object-contain rounded-lg" />
                      <div>
                        <div className="font-semibold text-body text-ink">{p.name}</div>
                        <div className="text-footnote text-link font-semibold">{formatNaira(p.price)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(p);
                        setIsWishlistOpen(false);
                      }}
                      className="bg-accent text-white text-footnote font-semibold px-5 py-2.5 rounded-full hover:bg-accent-hover transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        tradeInQuote={tradeInQuote}
        currentStore={currentStore}
        onClearCart={() => setCart([])}
      />

      {/* Store Selector Modal */}
      <StoreSelectorModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        currentStore={currentStore}
        onSelectStore={setCurrentStore}
      />

      {/* Transient status line — replaces the browser alert() the compare limit
          used to throw, which blocked the page and looked nothing like the site. */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-6"
        >
          <p className="animate-fade-in-up rounded-full bg-ink/95 px-5 py-3 text-footnote font-medium text-white shadow-panel">
            {notice.text}
          </p>
        </div>
      )}

      {/* Cookie Modal */}
      <CookieModal
        isOpen={isCookieModalOpen}
        onClose={() => setIsCookieModalOpen(false)}
      />

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onOpenBlog={handleOpenBlog}
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
        onOpenCookieModal={() => setIsCookieModalOpen(true)}
      />
    </div>
  );
}
