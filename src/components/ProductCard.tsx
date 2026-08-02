import React from 'react';
import { Product } from '../types';
import { formatNaira } from '../utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="bg-white rounded-[18px] p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-transparent min-w-[360px] max-w-[360px] flex-shrink-0 h-full">
      
      {/* Product Image */}
      <div
        onClick={() => onQuickView(product)}
        className="w-full h-72 flex items-center justify-center cursor-pointer mb-8"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-64 w-auto object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center space-y-1 w-full flex-1">
        
        {/* Name - National Park Font */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-[22px] font-national-park font-medium text-[#333333] cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-[15px] font-medium text-[#1d1d1f] pt-1 font-inter">
          From {formatNaira(product.price)}
        </div>

        {/* Savings */}
        {product.originalPrice && (
          <div className="text-[14px] text-gray-500 mt-1 font-inter">
            Save {formatNaira(product.originalPrice - product.price)}
          </div>
        )}
      </div>

      {/* Minimal Action */}
      <div className="mt-8 w-full flex justify-center pb-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium text-[15px] px-6 py-2 rounded-full transition-colors font-inter"
        >
          Buy
        </button>
      </div>
    </div>
  );
};
