import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Heart,
  PackageCheck,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types';
import { formatNaira } from '../utils';
import { PROTECTION, protectionPrice } from '../data/protection';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedColor: ProductColor,
    selectedStorage?: StorageOption,
    protection?: boolean
  ) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

type QuickViewContentProps = Omit<QuickViewModalProps, 'product'> & { product: Product; };

const QuickViewContent: React.FC<QuickViewContentProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#1D1D1F' }
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | undefined>(
    product.storageOptions?.[0]
  );
  const [protection, setProtection] = useState(false);
  const [activeImage, setActiveImage] = useState(selectedColor.image || product.imageUrl);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const galleryImages = useMemo(
    () => Array.from(new Set([product.imageUrl, ...(product.additionalImages || [])])),
    [product]
  );

  const storageDelta = selectedStorage?.priceDelta || 0;
  const basePrice = product.price + storageDelta;
  const totalPrice = basePrice + protectionPrice(product, protection);
  const originalPrice = product.originalPrice
    ? product.originalPrice + storageDelta
    : undefined;
  const savings = originalPrice ? originalPrice - basePrice : 0;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  const handleAddToBag = () => {
    onAddToCart(product, selectedColor, selectedStorage, protection);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 backdrop-blur-xl md:items-center md:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-dialog-title"
        className="animate-scale-in relative flex h-[96dvh] w-full max-w-[1180px] flex-col overflow-hidden rounded-t-panel bg-white shadow-panel md:h-[90vh] md:rounded-panel"
      >
        <header className="relative z-40 flex min-h-16 shrink-0 items-center justify-between border-b border-black/[0.08] bg-white/90 px-5 backdrop-blur-2xl md:min-h-[72px] md:px-8">
          <div className="min-w-0">
            <p className="truncate text-footnote font-semibold text-ink md:text-body">
              {product.name}
            </p>
            <p className="mt-0.5 text-micro text-ink-secondary md:text-caption">
              {formatNaira(totalPrice)} or {formatNaira(totalPrice / 24)}/mo.
            </p>
          </div>

          <button
            type="button"
            ref={closeButtonRef}
            onClick={onClose}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hairline-soft text-ink-secondary transition-colors hover:bg-hairline hover:text-ink"
            aria-label="Close product configuration"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="grid min-h-full grid-cols-1 items-start lg:grid-cols-[minmax(0,1.08fr)_minmax(400px,0.92fr)]">
            <div className="bg-canvas lg:sticky lg:top-0 lg:h-[calc(90vh-72px)]">
              <div className="flex min-h-[340px] flex-col px-5 pb-7 pt-6 sm:min-h-[480px] md:px-10 md:pb-10 md:pt-8 lg:h-full lg:min-h-[660px] lg:px-12">
                <div className="mb-5 flex items-center justify-between lg:mb-8">
                  <span className="text-caption font-semibold text-sale">
                    {product.badge === 'NEW' ? 'New' : product.inStock ? 'Available now' : 'Currently unavailable'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={isWishlisted ? 'Remove from saved items' : 'Save product'}
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-hairline-soft ${isWishlisted ? 'text-critical' : 'text-ink-secondary'
                        }`}
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleCompare(product)}
                      aria-label={isCompared ? 'Remove from comparison' : 'Compare product'}
                      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-hairline-soft ${isCompared ? 'text-accent' : 'text-ink-secondary'
                        }`}
                    >
                      <Scale className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-card">
                  <img
                    src={activeImage}
                    alt={`${product.name} in ${selectedColor.name}`}
                    className="max-h-[290px] w-full max-w-[580px] rounded-card object-cover shadow-panel transition-all duration-500 sm:max-h-[410px] lg:max-h-[520px]"
                  />
                </div>

                {galleryImages.length > 1 && (
                  <div className="mt-6 flex justify-center gap-2" aria-label="Product images">
                    {galleryImages.map((image, index) => {
                      const isActive = activeImage === image;
                      return (
                        <button
                          type="button"
                          key={image}
                          onClick={() => setActiveImage(image)}
                          aria-label={`View product image ${index + 1}`}
                          aria-pressed={isActive}
                          className={`h-2 w-2 rounded-full transition-all ${isActive ? 'w-5 bg-ink' : 'bg-ink-tertiary hover:bg-ink-secondary'
                            }`}
                        />
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 hidden grid-cols-3 gap-3 border-t border-black/[0.08] pt-6 md:grid">
                  {Object.entries(product.specs).slice(0, 3).map(([label, value]) => (
                    <div key={label}>
                      <p className="text-micro font-semibold text-ink-secondary">{label}</p>
                      <p className="mt-1 line-clamp-2 text-caption font-medium text-ink">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white px-5 py-9 sm:px-8 md:px-10 md:py-12 lg:px-12 lg:py-14">
              <div className="mx-auto max-w-[460px]">
                <p className="text-footnote font-semibold text-sale">
                  {product.badge === 'NEW' ? 'New' : 'Configure yours'}
                </p>
                <h1
                  id="purchase-dialog-title"
                  className="mt-1 text-title-lg font-semibold text-ink md:text-display-sm"
                >
                  Buy {product.name}
                </h1>
                <p className="mt-3 text-body text-ink-secondary">{product.tagline}</p>

                <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-body font-semibold text-ink">
                    From {formatNaira(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-footnote text-ink-secondary line-through">
                      {formatNaira(product.originalPrice)}
                    </span>
                  )}
                  {savings > 0 && (
                    <span className="w-full text-footnote font-medium text-success">
                      Save {formatNaira(savings)}
                    </span>
                  )}
                </div>

                <div className="mt-12">
                  <h2 className="text-title-sm font-semibold text-ink">
                    Choose your finish.
                  </h2>
                  <p className="mt-1 text-footnote text-ink-secondary">{selectedColor.name}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor.name === color.name;
                      return (
                        <button
                          type="button"
                          key={color.name}
                          onClick={() => {
                            setSelectedColor(color);
                            setActiveImage(color.image || product.imageUrl);
                          }}
                          aria-label={color.name}
                          aria-pressed={isSelected}
                          className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white transition-shadow ${isSelected
                              ? 'ring-2 ring-accent ring-offset-2 ring-offset-white'
                              : 'ring-1 ring-black/10 hover:ring-black/30'
                            }`}
                        >
                          <span
                            className="h-8 w-8 rounded-full border border-black/10 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                          />
                          {isSelected && (
                            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white ring-2 ring-white">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {product.storageOptions && product.storageOptions.length > 0 && (
                  <div className="mt-14">
                    <h2 className="text-title-sm font-semibold text-ink">
                      How much storage do you need?
                    </h2>
                    <div className="mt-5 space-y-3">
                      {product.storageOptions.map((storage) => {
                        const isSelected = selectedStorage?.capacity === storage.capacity;
                        return (
                          <button
                            type="button"
                            key={storage.capacity}
                            onClick={() => setSelectedStorage(storage)}
                            aria-pressed={isSelected}
                            className={`flex min-h-[82px] w-full items-center justify-between rounded-control border px-5 text-left transition-colors ${isSelected
                                ? 'border-2 border-accent bg-white px-[19px]'
                                : 'border-hairline hover:border-ink-tertiary'
                              }`}
                          >
                            <span className="pr-4 text-body font-semibold text-ink">
                              {storage.capacity}
                            </span>
                            <span className="shrink-0 text-right text-footnote text-ink-secondary">
                              {storage.priceDelta === 0 ? (
                                <>Included</>
                              ) : (
                                <>
                                  +{formatNaira(storage.priceDelta)}
                                  <br />
                                  +{formatNaira(storage.priceDelta / 24)}/mo.
                                </>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Insurance is brand-new only; pre-owned carries the
                    TechieBase warranty instead. */}
                <div className="mt-14">
                  <h2 className="text-title-sm font-semibold text-ink">
                    Add coverage?
                  </h2>
                  {PROTECTION.isEligible(product) ? (
                    <button
                      type="button"
                      onClick={() => setProtection((current) => !current)}
                      aria-pressed={protection}
                      className={`mt-5 w-full rounded-control border p-5 text-left transition-colors ${protection
                        ? 'border-2 border-accent px-[19px] py-[19px]'
                        : 'border-hairline hover:border-ink-tertiary'
                        }`}
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span>
                          <span className="flex items-center gap-2 text-body font-semibold text-ink">
                            <ShieldCheck className="h-5 w-5 text-accent" />
                            {PROTECTION.name}
                          </span>
                          <span className="mt-2 block text-footnote text-ink-secondary">
                            {PROTECTION.blurb}
                          </span>
                        </span>
                        <span className="shrink-0 text-right text-footnote text-ink-secondary">
                          +{formatNaira(PROTECTION.quote(product))}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <div className="mt-5 rounded-control border border-hairline p-5">
                      <p className="flex items-center gap-2 text-body font-semibold text-ink">
                        <ShieldCheck className="h-5 w-5 text-success" />
                        {product.preOwned?.warrantyMonths ?? 6}-month TechieBase warranty
                      </p>
                      <p className="mt-2 text-footnote text-ink-secondary">
                        Included at no cost. {PROTECTION.provider} insurance is available on
                        brand-new devices only.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-10 divide-y divide-hairline border-y border-hairline">
                  <div className="flex gap-3 py-4">
                    <Truck className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <p className="text-footnote font-semibold text-ink">Free nationwide delivery</p>
                      <p className="mt-0.5 text-footnote text-ink-secondary">Delivery timing shown at checkout.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 py-4">
                    <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                    <div>
                      <p className="text-footnote font-semibold text-ink">Pickup in Ikeja</p>
                      <p className="mt-0.5 text-footnote text-success">Available for pickup today.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 rounded-card bg-canvas p-5 md:p-6">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-footnote text-ink-secondary">Your configured {product.name}</p>
                      <p className="mt-1 text-lead font-semibold text-ink">
                        {formatNaira(totalPrice)}
                      </p>
                      <p className="mt-1 text-caption text-ink-secondary">
                        {formatNaira(totalPrice / 24)}/mo. for 24 months
                      </p>
                    </div>
                    <ShoppingBag className="h-6 w-6 shrink-0 text-ink" />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToBag}
                    className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-body font-semibold text-white transition-colors hover:bg-accent-hover active:bg-accent-pressed"
                  >
                    Add to Bag
                  </button>
                  <p className="mt-3 text-center text-caption text-ink-secondary">
                    Flexible payment options are available at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const QuickViewModal: React.FC<QuickViewModalProps> = (props) => {
  if (!props.product) return null;

  return <QuickViewContent {...props} product={props.product} key={props.product.id} />;
};
