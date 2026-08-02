import React, { useState, useMemo } from 'react';
import { PRODUCTS, FEATURED_BUNDLES, STORE_LOCATIONS } from './data/products';
import { Product, CartItem, TradeInQuote, FilterState, ProductColor, StorageOption, StoreLocation, ProductBundle } from './types';

// Components
import { TopUtilityBar } from './components/Header/TopUtilityBar';
import { Navbar } from './components/Header/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryPills } from './components/CategoryPills';
import { ProductRow } from './components/ProductRow';
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
import { Heart, X, ShoppingBag } from 'lucide-react';

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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F5F5F7] text-[#1D1D1F] antialiased flex flex-col justify-between">
      
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-50 w-full">
        {/* 1. Utility Top Bar */}
        <TopUtilityBar />

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
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 3. Hero Carousel */}
        <HeroCarousel
          products={PRODUCTS}
          onSelectProduct={(p) => setQuickViewProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onOpenCompare={() => setIsCompareOpen(true)}
        />

        {/* 4. Category Quick-Pills */}
        <CategoryPills
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Section: 6-Row Layout */}
        <div className="space-y-4 pb-20">
          
          {/* Row 1: Phones */}
          <ProductRow
            title="iPhone"
            products={PRODUCTS.filter(p => p.category === 'iphone')}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* Row 2: Macs */}
          <ProductRow
            title="Mac"
            products={PRODUCTS.filter(p => p.category === 'mac')}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* Banner 1: Trade-In */}
          <TradeInBanner
            onApplyTradeIn={(quote) => setTradeInQuote(quote)}
            appliedTradeIn={tradeInQuote}
          />

          {/* Row 3: iPads */}
          <ProductRow
            title="iPad"
            products={PRODUCTS.filter(p => p.category === 'ipad')}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* Row 4: Watches */}
          <ProductRow
            title="Apple Watch"
            products={PRODUCTS.filter(p => p.category === 'watch')}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* Banner 2: Accessory Bundles */}
          <BundleSection
            bundle={FEATURED_BUNDLES[0]}
            onAddBundleToCart={handleAddBundleToCart}
          />

          {/* Row 5: AirPods */}
          <ProductRow
            title="AirPods"
            products={PRODUCTS.filter(p => p.category === 'airpods')}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

          {/* Row 6: Accessories */}
          <ProductRow
            title="Accessories"
            products={PRODUCTS.filter(p => p.category === 'accessories')}
            onAddToCart={(p) => handleAddToCart(p)}
            onQuickView={(p) => setQuickViewProduct(p)}
          />

        </div>

      </main>

      {/* Cart Drawer */}
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

      {/* Filter Drawer */}
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

      {/* Quick View Modal */}
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
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-[#E5E5E7] animate-scale-in">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-5">
              <div className="flex items-center gap-2.5 font-bold text-[17px] text-[#1D1D1F]">
                <Heart className="w-5 h-5 text-[#D70015] fill-current" />
                <span>Saved Items ({wishlistedProducts.length})</span>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-[15px]">
                No items saved to your wishlist yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wishlistedProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-[#F5F5F7] rounded-2xl">
                    <div className="flex items-center gap-4">
                      <img src={p.imageUrl} alt={p.name} className="w-14 h-14 object-contain rounded-lg" />
                      <div>
                        <div className="font-semibold text-[15px] text-[#1D1D1F]">{p.name}</div>
                        <div className="text-[14px] text-[#0066CC] font-bold">${p.price}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(p);
                        setIsWishlistOpen(false);
                      }}
                      className="bg-[#0066CC] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#0055B3] transition-colors"
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
