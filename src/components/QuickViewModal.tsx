import React, { useState } from 'react';
import { X, Star, ShieldCheck, MapPin, Truck, Check, Heart, Scale, ShoppingBag, ThumbsUp, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#E5E5E7] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative h-72 md:h-80 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-gray-100">
              {product.badge && (
                <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase bg-[#1D1D1F] text-white px-2.5 py-1 rounded-md">
                  {product.badge}
                </span>
              )}
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[product.imageUrl, ...product.additionalImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl border p-1 bg-gray-50 flex items-center justify-center transition-all ${
                      activeImage === img ? 'ring-2 ring-[#0066CC] border-[#0066CC]' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 text-xs font-semibold gap-4 pt-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'overview' ? 'border-[#0066CC] text-[#0066CC]' : 'border-transparent text-gray-500'
                }`}
              >
                Overview & Customization
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'specs' ? 'border-[#0066CC] text-[#0066CC]' : 'border-transparent text-gray-500'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'reviews' ? 'border-[#0066CC] text-[#0066CC]' : 'border-transparent text-gray-500'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
          </div>

          {/* Right Column: Configuration & Buy Controls */}
          <div className="md:col-span-6 space-y-4">
            
            {activeTab === 'overview' && (
              <>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#1D1D1F]">
                    {product.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">{product.tagline}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#1D1D1F]">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount.toLocaleString()} verified reviews)</span>
                </div>

                {/* Price Display */}
                <div className="bg-[#F5F5F7] p-3 rounded-2xl">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-black text-[#1D1D1F]">
                        ${totalPrice}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${product.originalPrice + (selectedStorage?.priceDelta || 0)}
                        </span>
                      )}
                    </div>

                    <span className="text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                      Or ${(totalPrice / 24).toFixed(2)}/mo for 24 mos.
                    </span>
                  </div>
                </div>

                {/* Color Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#1D1D1F] mb-1.5 uppercase tracking-wider">
                    Finish: <span className="text-[#0066CC] font-bold">{selectedColor.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(c);
                          if (c.image) setActiveImage(c.image);
                        }}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs transition-all ${
                          selectedColor.name === c.name
                            ? 'border-[#0066CC] bg-blue-50/50 font-bold'
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

                {/* Storage Capacity Selector */}
                {product.storageOptions && (
                  <div>
                    <label className="block text-xs font-bold text-[#1D1D1F] mb-1.5 uppercase tracking-wider">
                      Storage Tier:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.storageOptions.map((st) => (
                        <button
                          key={st.capacity}
                          onClick={() => setSelectedStorage(st)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                            selectedStorage?.capacity === st.capacity
                              ? 'border-[#0066CC] bg-blue-50/50 text-[#0066CC] font-bold'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <span>{st.capacity}</span>
                          <span className="text-[11px] text-gray-500">
                            {st.priceDelta === 0 ? 'Included' : `+$${st.priceDelta}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* AppleCare+ Plan Checkbox */}
                <div className="bg-[#F5F5F7] p-3 rounded-2xl space-y-1">
                  <label className="flex items-center justify-between cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={appleCare}
                        onChange={(e) => setAppleCare(e.target.checked)}
                        className="w-4 h-4 text-[#0066CC] rounded focus:ring-[#0066CC]"
                      />
                      <span className="font-bold text-[#1D1D1F] flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
                        Add AppleCare+ Unlimited Protection
                      </span>
                    </div>
                    <span className="font-extrabold text-[#0066CC]">+$199</span>
                  </label>
                  <p className="text-[11px] text-gray-500 pl-6">
                    Includes unlimited accidental damage repair, 24/7 priority tech support, and express replacement service.
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(product, selectedColor, selectedStorage, appleCare);
                      onClose();
                    }}
                    className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold text-xs py-3 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Configured Item to Bag — ${totalPrice}</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="flex-1 py-2 border border-gray-300 rounded-full text-xs font-semibold hover:bg-gray-50 flex items-center justify-center gap-1.5"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#D70015] text-[#D70015]' : ''}`} />
                      <span>{isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
                    </button>

                    <button
                      onClick={() => onToggleCompare(product)}
                      className="flex-1 py-2 border border-gray-300 rounded-full text-xs font-semibold hover:bg-gray-50 flex items-center justify-center gap-1.5"
                    >
                      <Scale className="w-3.5 h-3.5 text-[#0066CC]" />
                      <span>{isCompared ? 'Compared' : 'Compare Model'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-3 text-xs">
                <h3 className="font-bold text-[#1D1D1F] uppercase tracking-wider text-xs border-b border-gray-200 pb-2">
                  Full Hardware Specifications
                </h3>
                <div className="divide-y divide-gray-100">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="py-2 flex justify-between">
                      <span className="font-semibold text-gray-500">{key}:</span>
                      <span className="font-bold text-[#1D1D1F] text-right max-w-[220px]">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3">
                  <h4 className="font-bold text-[#1D1D1F] mb-1">Product Description</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3 text-xs max-h-[360px] overflow-y-auto">
                <h3 className="font-bold text-[#1D1D1F] uppercase tracking-wider text-xs border-b border-gray-200 pb-2">
                  Verified Buyer Reviews
                </h3>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((r) => (
                    <div key={r.id} className="bg-[#F5F5F7] p-3 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#1D1D1F]">{r.author}</span>
                        <span className="text-[10px] text-gray-400">{r.date}</span>
                      </div>
                      <div className="flex text-[#FFB800]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <div className="font-bold text-[#1D1D1F]">{r.title}</div>
                      <p className="text-gray-600">{r.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 py-4 text-center">
                    No individual review comments logged yet. Overall rating: {product.rating} / 5.
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
