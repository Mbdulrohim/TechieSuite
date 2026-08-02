import React, { useState } from 'react';
import { X, Star, ShieldCheck, Heart, Scale, ShoppingBag, ThumbsUp } from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types';
import { formatNaira } from '../utils';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedColor: ProductColor,
    selectedStorage?: StorageOption,
    appleCare?: boolean
  ) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#1D1D1F' }
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | undefined>(
    product.storageOptions ? product.storageOptions[0] : undefined
  );
  const [appleCare, setAppleCare] = useState(false);
  const [activeImage, setActiveImage] = useState(
    selectedColor.image || product.imageUrl
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  const basePrice = product.price + (selectedStorage?.priceDelta || 0);
  const totalPrice = basePrice + (appleCare ? 199 : 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="relative bg-white rounded-t-3xl md:rounded-3xl max-w-4xl w-full max-h-[92vh] md:max-h-[88vh] overflow-y-auto shadow-2xl border border-[#E5E5E7] animate-scale-in my-0 md:my-auto flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto mr-4 z-40 p-2.5 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-600 transition-all active:scale-95 shadow-sm shrink-0"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-4 md:p-10 -mt-10">
          
          {/* Left: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative h-48 sm:h-64 md:h-96 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-4 md:p-6 flex items-center justify-center overflow-hidden border border-gray-100">
              {product.badge && (
                <span className="absolute top-3 left-3 text-[10px] md:text-[11px] font-bold uppercase bg-[#1D1D1F] text-white px-2.5 py-0.5 md:px-3 md:py-1 rounded-full z-10">
                  {product.badge}
                </span>
              )}
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[product.imageUrl, ...product.additionalImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 md:w-18 md:h-18 rounded-xl border-2 p-1 bg-gray-50 flex items-center justify-center shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-[#0066CC]'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-gray-200 text-[13px] md:text-[14px] font-semibold gap-4 md:gap-6 pt-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-2.5 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#0066CC] text-[#0066CC]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Configuration */}
          <div className="md:col-span-6 space-y-4 md:space-y-5">
            
            {activeTab === 'overview' && (
              <>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-[14px] md:text-[15px] text-gray-500 mt-1">{product.tagline}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] font-semibold text-[#1D1D1F]">{product.rating}</span>
                  <span className="text-[13px] text-gray-400">
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="bg-[#F5F5F7] p-4 rounded-2xl">
                  <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">
                        {formatNaira(totalPrice)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[14px] text-gray-400 line-through">
                          {formatNaira(product.originalPrice + (selectedStorage?.priceDelta || 0))}
                        </span>
                      )}
                    </div>

                    <span className="text-[12px] md:text-[13px] text-emerald-700 font-semibold bg-emerald-100 px-2.5 py-1 rounded-lg">
                      {formatNaira(totalPrice / 24)}/mo
                    </span>
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-2">
                    Finish — <span className="text-[#0066CC]">{selectedColor.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(c);
                          if (c.image) setActiveImage(c.image);
                        }}
                        className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-[12px] md:text-[13px] transition-all ${
                          selectedColor.name === c.name
                            ? 'border-[#0066CC] bg-blue-50/50 font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage */}
                {product.storageOptions && (
                  <div>
                    <label className="block text-[13px] font-semibold text-[#1D1D1F] mb-2">
                      Storage
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.storageOptions.map((st) => (
                        <button
                          key={st.capacity}
                          onClick={() => setSelectedStorage(st)}
                          className={`p-2.5 rounded-xl border text-[13px] font-medium flex items-center justify-between transition-all ${
                            selectedStorage?.capacity === st.capacity
                              ? 'border-[#0066CC] bg-blue-50/50 text-[#0066CC] font-semibold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <span>{st.capacity}</span>
                          <span className="text-[11px] text-gray-400">
                            {st.priceDelta === 0 ? 'Included' : `+${formatNaira(st.priceDelta)}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* AppleCare+ */}
                <div className="bg-[#F5F5F7] p-3.5 rounded-2xl">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={appleCare}
                        onChange={(e) => setAppleCare(e.target.checked)}
                        className="w-4.5 h-4.5"
                      />
                      <span className="font-semibold text-[13px] text-[#1D1D1F] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                        AppleCare+ Protection
                      </span>
                    </div>
                    <span className="font-bold text-[13px] text-[#0066CC]">+{formatNaira(199)}</span>
                  </label>
                  <p className="text-[11px] text-gray-500 mt-1 pl-7">
                    Unlimited accidental damage repair, 24/7 support, and express replacement.
                  </p>
                </div>
              </>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3">
                <h3 className="font-bold text-[15px] text-[#1D1D1F] border-b border-gray-200 pb-2">
                  Technical Specifications
                </h3>
                <div className="divide-y divide-gray-100 text-[13px]">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex justify-between gap-4">
                      <span className="font-medium text-gray-500">{key}</span>
                      <span className="font-semibold text-[#1D1D1F] text-right">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3">
                  <h4 className="font-bold text-[14px] text-[#1D1D1F] mb-1">About</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3 max-h-[320px] overflow-y-auto">
                <h3 className="font-bold text-[15px] text-[#1D1D1F] border-b border-gray-200 pb-2">
                  Customer Reviews
                </h3>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((r) => (
                    <div key={r.id} className="bg-[#F5F5F7] p-4 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="font-semibold text-[#1D1D1F]">{r.author}</span>
                        <span className="text-gray-400">{r.date}</span>
                      </div>
                      <div className="flex text-[#FFB800]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <div className="font-bold text-[13px] text-[#1D1D1F]">{r.title}</div>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{r.comment}</p>
                      {r.helpfulCount > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-0.5">
                          <ThumbsUp className="w-3 h-3" />
                          {r.helpfulCount} found helpful
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 py-6 text-center text-[14px]">
                    No reviews yet. Rating: {product.rating} / 5
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Sticky Mobile & Desktop Action Bar */}
        <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-2">
          <button
            onClick={() => {
              onAddToCart(product, selectedColor, selectedStorage, appleCare);
              onClose();
            }}
            className="w-full bg-[#0066CC] hover:bg-[#0055B3] active:scale-[0.98] text-white font-semibold text-[15px] h-12 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag — {formatNaira(totalPrice)}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="flex-1 h-10 border border-gray-200 rounded-full text-[13px] font-medium hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-1.5 transition-all"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#D70015] text-[#D70015]' : ''}`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </button>

            <button
              onClick={() => onToggleCompare(product)}
              className="flex-1 h-10 border border-gray-200 rounded-full text-[13px] font-medium hover:bg-gray-50 active:scale-[0.98] flex items-center justify-center gap-1.5 transition-all"
            >
              <Scale className="w-3.5 h-3.5 text-[#0066CC]" />
              {isCompared ? 'Compared' : 'Compare'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
