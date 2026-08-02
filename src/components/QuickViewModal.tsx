import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, Heart, Scale, ShoppingBag, ThumbsUp } from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E5E5E7] overflow-hidden animate-scale-in my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 md:p-10">
          
          {/* Left: Image Gallery */}
          <div className="md:col-span-6 space-y-5">
            <div className="relative h-80 md:h-96 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-gray-100">
              {product.badge && (
                <span className="absolute top-4 left-4 text-[11px] font-bold uppercase bg-[#1D1D1F] text-white px-3 py-1 rounded-full">
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
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[product.imageUrl, ...product.additionalImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-18 h-18 rounded-xl border-2 p-1.5 bg-gray-50 flex items-center justify-center transition-all ${
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
            <div className="flex border-b border-gray-200 text-[14px] font-semibold gap-6 pt-3">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 border-b-2 transition-colors ${
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
          <div className="md:col-span-6 space-y-5">
            
            {activeTab === 'overview' && (
              <>
                <div>
                  <h2 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-[15px] text-gray-500 mt-2">{product.tagline}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[14px] font-semibold text-[#1D1D1F]">{product.rating}</span>
                  <span className="text-[14px] text-gray-400">
                    ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="bg-[#F5F5F7] p-5 rounded-2xl">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#1D1D1F]">
                        ${totalPrice}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[15px] text-gray-400 line-through">
                          ${product.originalPrice + (selectedStorage?.priceDelta || 0)}
                        </span>
                      )}
                    </div>

                    <span className="text-[13px] text-emerald-700 font-semibold bg-emerald-100 px-3 py-1 rounded-lg">
                      ${(totalPrice / 24).toFixed(2)}/mo
                    </span>
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3">
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
                        className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-[13px] transition-all ${
                          selectedColor.name === c.name
                            ? 'border-[#0066CC] bg-blue-50/50 font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300"
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
                    <label className="block text-[14px] font-semibold text-[#1D1D1F] mb-3">
                      Storage
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.storageOptions.map((st) => (
                        <button
                          key={st.capacity}
                          onClick={() => setSelectedStorage(st)}
                          className={`p-3 rounded-xl border text-[14px] font-medium flex items-center justify-between transition-all ${
                            selectedStorage?.capacity === st.capacity
                              ? 'border-[#0066CC] bg-blue-50/50 text-[#0066CC] font-semibold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <span>{st.capacity}</span>
                          <span className="text-[13px] text-gray-400">
                            {st.priceDelta === 0 ? 'Included' : `+$${st.priceDelta}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* AppleCare+ */}
                <div className="bg-[#F5F5F7] p-4 rounded-2xl">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={appleCare}
                        onChange={(e) => setAppleCare(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="font-semibold text-[14px] text-[#1D1D1F] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                        AppleCare+ Protection
                      </span>
                    </div>
                    <span className="font-bold text-[14px] text-[#0066CC]">+$199</span>
                  </label>
                  <p className="text-[12px] text-gray-500 mt-2 pl-8">
                    Unlimited accidental damage repair, 24/7 support, and express replacement.
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, selectedColor, selectedStorage, appleCare);
                      onClose();
                    }}
                    className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-[15px] py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — ${totalPrice}</span>
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="flex-1 py-3 border border-gray-200 rounded-full text-[14px] font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D70015] text-[#D70015]' : ''}`} />
                      {isWishlisted ? 'Saved' : 'Save'}
                    </button>

                    <button
                      onClick={() => onToggleCompare(product)}
                      className="flex-1 py-3 border border-gray-200 rounded-full text-[14px] font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Scale className="w-4 h-4 text-[#0066CC]" />
                      {isCompared ? 'Compared' : 'Compare'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="font-bold text-[17px] text-[#1D1D1F] border-b border-gray-200 pb-3">
                  Technical Specifications
                </h3>
                <div className="divide-y divide-gray-100">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-3 flex justify-between text-[14px]">
                      <span className="font-medium text-gray-500">{key}</span>
                      <span className="font-semibold text-[#1D1D1F] text-right max-w-[250px]">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <h4 className="font-bold text-[15px] text-[#1D1D1F] mb-2">About</h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <h3 className="font-bold text-[17px] text-[#1D1D1F] border-b border-gray-200 pb-3">
                  Customer Reviews
                </h3>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((r) => (
                    <div key={r.id} className="bg-[#F5F5F7] p-5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[14px] text-[#1D1D1F]">{r.author}</span>
                        <span className="text-[13px] text-gray-400">{r.date}</span>
                      </div>
                      <div className="flex text-[#FFB800]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <div className="font-bold text-[14px] text-[#1D1D1F]">{r.title}</div>
                      <p className="text-[14px] text-gray-600 leading-relaxed">{r.comment}</p>
                      {r.helpfulCount > 0 && (
                        <div className="flex items-center gap-1.5 text-[12px] text-gray-400 pt-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {r.helpfulCount} found helpful
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 py-8 text-center text-[15px]">
                    No reviews yet. Rating: {product.rating} / 5
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
