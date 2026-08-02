import React, { useState } from 'react';
import { Star, Heart, Eye, Scale, ShoppingBag, MapPin } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, color: ProductColor) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0] || { name: 'Default', hex: '#1D1D1F' }
  );

  return (
    <div className="group relative bg-white border border-[#E5E5E7] rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-gray-300">
      <div>
        {/* Top Row: Badge + Actions */}
        <div className="flex items-center justify-between mb-3">
          {product.badge ? (
            <span className="text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-[#1D1D1F] text-white">
              {product.badge}
            </span>
          ) : (
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Pickup Available
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleCompare(product)}
              className={`p-1.5 rounded-full transition-colors ${
                isCompared
                  ? 'bg-[#0066CC] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
              }`}
              title={isCompared ? 'In Compare List' : 'Compare'}
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`p-1.5 rounded-full transition-colors ${
                isWishlisted
                  ? 'bg-[#D70015] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
              }`}
              title={isWishlisted ? 'Saved' : 'Save'}
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Product Image — Large & Prominent */}
        <div
          onClick={() => onQuickView(product)}
          className="relative h-56 w-full flex items-center justify-center overflow-hidden cursor-pointer rounded-xl bg-gradient-to-b from-gray-50/80 to-white mb-4"
        >
          <img
            src={selectedColor.image || product.imageUrl}
            alt={product.name}
            className="max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur text-[#1D1D1F] text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#0066CC]" /> Quick View
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-[17px] font-bold text-[#1D1D1F] group-hover:text-[#0066CC] transition-colors cursor-pointer leading-snug"
        >
          {product.name}
        </h3>
        <p className="text-[13px] text-gray-500 mt-1 line-clamp-1">
          {product.tagline}
        </p>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-[#FFB800] text-[#FFB800]'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[13px] font-semibold text-[#1D1D1F]">
            {product.rating}
          </span>
          <span className="text-[13px] text-gray-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-[#0066CC] ring-offset-2 scale-110 border-transparent'
                    : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <span className="text-[12px] text-gray-500 font-medium ml-auto truncate">
            {selectedColor.name}
          </span>
        </div>

        {/* Price Block */}
        <div className="mt-4 bg-[#F5F5F7] p-4 rounded-xl">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] font-bold text-[#1D1D1F]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[14px] text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <span className="text-[12px] font-bold text-[#D70015] bg-[#D70015]/8 px-2 py-1 rounded-md">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          <div className="text-[13px] text-gray-500 mt-1">
            or ${product.monthlyPrice}/mo. for 24 mo.{' '}
            <span className="text-gray-400">· 0% APR</span>
          </div>
        </div>

        {/* Stock Urgency */}
        {product.stockUrgency && (
          <p className="mt-3 text-[12px] text-[#D70015] font-medium line-clamp-1">
            {product.stockUrgency}
          </p>
        )}
      </div>

      {/* CTAs */}
      <div className="mt-5 space-y-2.5">
        <button
          onClick={() => onAddToCart(product, selectedColor)}
          className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-[14px] py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Bag
        </button>

        <button
          onClick={() => onQuickView(product)}
          className="w-full text-[#0066CC] hover:text-[#0055B3] font-medium text-[13px] py-2 transition-colors"
        >
          Configure & View Specs →
        </button>
      </div>
    </div>
  );
};
