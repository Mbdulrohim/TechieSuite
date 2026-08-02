import React, { useState, useMemo } from 'react';
import { PRODUCTS, FEATURED_BUNDLES, STORE_LOCATIONS } from './data/products';
import { Product, CartItem, TradeInQuote, FilterState, ProductColor, StorageOption, StoreLocation, ProductBundle } from './types';

// Components
import { TopUtilityBar } from './components/Header/TopUtilityBar';
import { Navbar } from './components/Header/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryPills } from './components/CategoryPills';
import { ProductCard } from './components/ProductCard';
import { FacetedFilterSidebar } from './components/FacetedFilterSidebar';
import { TradeInBanner } from './components/TradeInBanner';
import { BundleSection } from './components/BundleSection';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CompareModal } from './components/CompareModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreSelectorModal } from './components/StoreSelectorModal';
import { Footer } from './components/Footer';
import { Heart, Scale, X, ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // Primary State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentStore, setCurrentStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);
  
  // E-Commerce Cart & Persistence State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['iphone-16-pro']);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [tradeInQuote, setTradeInQuote] = useState<TradeInQuote | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
    priceRange: [0, 2500],
    minRating: 0,
    selectedStorage: [],
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: 'featured',
  });

  // Modal Visibility Controls
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Category counts for pills
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length, deals: 0 };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      if (p.originalPrice || p.badge === 'SAVE $100' || p.badge === 'HOT DEAL') {
        counts.deals += 1;
      }
    });
    return counts;
  }, []);

  // Filtered & Sorted Product Catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && activeCategory !== 'deals') {
        if (product.category !== activeCategory) return false;
      } else if (activeCategory === 'deals') {
        if (!product.originalPrice && product.badge !== 'SAVE $100' && product.badge !== 'HOT DEAL') {
          return false;
        }
      }

      // Max price
      if (product.price > filters.priceRange[1]) return false;

      // Rating
      if (product.rating < filters.minRating) return false;

      // Storage filter
      if (filters.selectedStorage.length > 0 && product.storageOptions) {
        const hasStorage = product.storageOptions.some((s) =>
          filters.selectedStorage.includes(s.capacity)
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
      return 0; // featured default
    });
  }, [activeCategory, filters]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    selectedColor?: ProductColor,
    selectedStorage?: StorageOption,
    appleCare: boolean = false
  ) => {
    const colorToUse = selectedColor || product.colors[0];
    const storageToUse = selectedStorage || (product.storageOptions ? product.storageOptions[0] : undefined);
    
    const cartItemId = `${product.id}-${colorToUse.name}-${storageToUse?.capacity || 'std'}-${appleCare ? 'care' : 'nocare'}`;

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
          appleCare,
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

  const handleToggleAppleCare = (cartItemId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, appleCare: !item.appleCare } : item
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
        alert('You can compare up to 3 models at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-[#0066CC] selection:text-white flex flex-col justify-between">
      
      {/* 1. Utility Top Bar */}
      <TopUtilityBar
        currentStore={currentStore}
        onOpenStoreModal={() => setIsStoreModalOpen(true)}
      />

      {/* 2. Primary Navigation */}
      <Navbar
        products={PRODUCTS}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
        onToggleFilterDrawer={() => setIsFilterDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 3. Hero Carousel Promotional Banner */}
        <HeroCarousel
          products={PRODUCTS}
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onOpenCompare={() => setIsCompareOpen(true)}
        />

        {/* 4. Category Quick-Pills Filter */}
        <CategoryPills
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          productCounts={productCounts}
        />

        {/* Section 1: Product Grid - Best Sellers & Trending */}
        <section className="max-w-7xl mx-auto px-4 my-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
            <div>
              <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider">
                {activeCategory === 'all' ? 'Featured Lineup' : `${activeCategory.toUpperCase()} Lineup`}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                {activeCategory === 'all'
                  ? 'Best Sellers in iPhone, Mac & Wearables'
                  : `Top Rated ${activeCategory.toUpperCase()} Models`}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span>Showing {filteredProducts.length} models</span>
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="bg-white border border-[#E5E5E7] hover:bg-gray-50 text-[#1D1D1F] px-3 py-1.5 rounded-full font-bold transition-colors"
              >
                Filters & Sort ⚙
              </button>
            </div>
          </div>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(p, color) => handleAddToCart(p, color)}
                onQuickView={(p) => setQuickViewProduct(p)}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
                onToggleCompare={handleToggleCompare}
                isCompared={compareList.some((p) => p.id === product.id)}
              />
            ))}
          </div>
        </section>

        {/* 5. Mid-Page Interactive Trade-In Calculator Banner */}
        <TradeInBanner
          onApplyTradeIn={(quote) => setTradeInQuote(quote)}
          appliedTradeIn={tradeInQuote}
        />

        {/* 6. Accessory Bundles Section ("Frequently Bought Together") */}
        <BundleSection
          bundle={FEATURED_BUNDLES[0]}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* 7. Secondary Product Grid: Mac Workstations & Audio Accessories */}
        {activeCategory === 'all' && (
          <section className="max-w-7xl mx-auto px-4 my-12">
            <div className="mb-6">
              <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider">
                Pro Workstations & Immersive Audio
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">
                Mac Studio, iPad Pro & AirPods Family
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.slice(2, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p, color) => handleAddToCart(p, color)}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleCompare={handleToggleCompare}
                  isCompared={compareList.some((p) => p.id === product.id)}
                />
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onToggleAppleCare={handleToggleAppleCare}
        tradeInQuote={tradeInQuote}
        onRemoveTradeIn={() => setTradeInQuote(null)}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Faceted Filter Drawer */}
      <FacetedFilterSidebar
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChangeFilter={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
        onResetFilters={() =>
          setFilters({
            category: 'all',
            searchQuery: '',
            priceRange: [0, 2500],
            minRating: 0,
            selectedStorage: [],
            inStockOnly: false,
            onSaleOnly: false,
            sortBy: 'featured',
          })
        }
        totalResults={filteredProducts.length}
      />

      {/* Quick View Product Configuration Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, color, storage, appleCare) =>
          handleAddToCart(p, color, storage, appleCare)
        }
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleCompare={handleToggleCompare}
        isCompared={quickViewProduct ? compareList.some((p) => p.id === quickViewProduct.id) : false}
      />

      {/* Compare Models Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={compareList}
        onRemoveFromCompare={(id) => setCompareList((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Wishlist Drawer / Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#E5E5E7]">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2 font-bold text-base text-[#1D1D1F]">
                <Heart className="w-5 h-5 text-[#D70015] fill-current" />
                <span>Saved Wishlist ({wishlistedProducts.length})</span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">
                No items saved to your wishlist yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-2xl">
                    <div className="flex items-center gap-3">
                      <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-contain rounded-lg" />
                      <div>
                        <div className="font-bold text-xs text-[#1D1D1F]">{p.name}</div>
                        <div className="text-xs text-[#0066CC] font-bold">${p.price}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(p);
                        setIsWishlistOpen(false);
                      }}
                      className="bg-[#0066CC] text-white text-xs font-bold px-4 py-2 rounded-full"
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

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        tradeInQuote={tradeInQuote}
        currentStore={currentStore}
        onClearCart={() => setCart([])}
      />

      {/* Store Location Selector Modal */}
      <StoreSelectorModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        currentStore={currentStore}
        onSelectStore={setCurrentStore}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
