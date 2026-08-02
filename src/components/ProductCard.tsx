import React, { useState } from 'react';
import { Star, Heart, Zap, Eye, Scale, Check, ShoppingBag, MapPin } from 'lucide-react';
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
    <div className="group relative bg-white border border-[#E5E5E7] rounded-[16px] p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300">
      <div>
        {/* Header Row: Badge & Wishlist & Compare */}
        <div className="flex items-center justify-between mb-2">
          {product.badge ? (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#1D1D1F] text-white">
              {product.badge}
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Pickup Available
            </span>
          )}

          <div className="flex items-center gap-1.5">
            {/* Compare Toggle */}
            <button
              onClick={() => onToggleCompare(product)}
              className={`p-1.5 rounded-full text-xs transition-colors ${
                isCompared
                  ? 'bg-[#0066CC] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              title={isCompared ? 'In Compare List' : 'Add to Compare'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>

            {/* Wishlist Heart */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-colors ${
                isWishlisted
                  ? 'bg-[#D70015] text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Product Image Showcase */}
        <div 
          onClick={() => onQuickView(product)}
          className="relative h-48 w-full my-2 flex items-center justify-center overflow-hidden cursor-pointer rounded-xl bg-gradient-to-b from-gray-50/50 to-white"
        >
          <img
            src={selectedColor.image || product.imageUrl}
            alt={product.name}
            className="max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          {/* Quick View Floating Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur-md text-[#1D1D1F] text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#0066CC]" /> Quick View
            </span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <div className="mt-2">
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-[#1D1D1F] group-hover:text-[#0066CC] transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Star Rating & Reviews */}
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <div className="flex items-center text-[#FFB800]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'fill-current text-[#FFB800]' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="font-bold text-[#1D1D1F]">{product.rating}</span>
          <span className="text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Color Swatch Picker */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium">Color:</span>
          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-[#0066CC] ring-offset-1 scale-110'
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-600 font-medium ml-auto truncate max-w-[80px]">
            {selectedColor.name}
          </span>
        </div>

        {/* Price & Monthly Financing */}
        <div className="mt-3 bg-[#F5F5F7] p-2.5 rounded-xl">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-extrabold text-[#1D1D1F]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-2">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <span className="text-[10px] font-extrabold text-[#D70015] bg-[#D70015]/10 px-1.5 py-0.5 rounded">
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center justify-between">
            <span>Or ${product.monthlyPrice}/mo. for 24 mo.</span>
            <span className="text-[10px] text-gray-500">0% APR</span>
          </div>
        </div>

        {/* Stock Urgency Micro-copy */}
        {product.stockUrgency && (
          <div className="mt-2 text-[10px] text-[#D70015] font-semibold flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current text-[#D70015] shrink-0" />
            <span className="truncate">{product.stockUrgency}</span>
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => onAddToCart(product, selectedColor)}
          className="w-full bg-[#0066CC] hover:bg-[#0055B3] text-white font-bold text-xs py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>

        <button
          onClick={() => onQuickView(product)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-[#1D1D1F] font-semibold text-xs py-2 px-3 rounded-full transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Configure & Specs</span>
        </button>
      </div>
    </div>
  );
};
