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
    <div className="bg-white rounded-card p-4 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-card-hover shadow-card border border-transparent min-w-[160px] max-w-[160px] md:min-w-[360px] md:max-w-[360px] flex-shrink-0 h-full">

      {/* Product Image */}
      <div
        onClick={() => onQuickView(product)}
        className="mb-4 flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden md:mb-8 md:h-72"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain p-2 transition-transform duration-500 hover:scale-[1.03] md:p-4"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center space-y-1 w-full flex-1">

        {/* Name - Inter Font */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-body md:text-lead font-semibold text-ink cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-footnote md:text-body font-medium text-ink pt-1">
          From {formatNaira(product.price)}
        </div>

        {/* Savings */}
        {product.originalPrice && (
          <div className="text-caption md:text-footnote text-ink-secondary mt-1">
            Save {formatNaira(product.originalPrice - product.price)}
          </div>
        )}
      </div>

      {/* Minimal Action */}
      <div className="mt-4 md:mt-8 w-full flex justify-center pb-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-accent hover:bg-accent-hover active:scale-[0.98] active:opacity-80 text-white font-medium text-footnote md:text-body px-5 md:px-6 h-11 min-h-[44px] rounded-full transition-all flex items-center justify-center w-full md:w-auto"
        >
          Buy
        </button>
      </div>
    </div>
  );
};
