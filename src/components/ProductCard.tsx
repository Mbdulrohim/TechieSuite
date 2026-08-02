import React from 'react';
import { Product } from '../types';

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
    <div className="bg-white rounded-[18px] p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-transparent">
      
      {/* Product Image */}
      <div
        onClick={() => onQuickView(product)}
        className="w-full h-56 flex items-center justify-center cursor-pointer mb-6"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-52 w-auto object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center space-y-1 w-full flex-1">
        
        {/* Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-[17px] font-semibold text-[#1d1d1f] cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-[14px] text-[#1d1d1f] pt-1">
          From ${product.price}
        </div>

        {/* Savings */}
        {product.originalPrice && (
          <div className="text-[12px] text-gray-500 mt-1">
            Save ${product.originalPrice - product.price}
          </div>
        )}
      </div>

      {/* Minimal Action */}
      <div className="mt-6 w-full flex justify-center pb-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-[#0071e3] hover:bg-[#0077ED] text-white font-medium text-[12px] px-4 py-1.5 rounded-full transition-colors"
        >
          Buy
        </button>
      </div>
    </div>
  );
};
