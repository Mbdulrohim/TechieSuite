import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductRowProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  title,
  products,
  onAddToCart,
  onQuickView,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicating products to ensure we have at least 12 for the demo if there aren't enough
  const displayProducts = [...products];
  while (displayProducts.length > 0 && displayProducts.length < 12) {
    displayProducts.push(...products);
  }
  const finalProducts = displayProducts.slice(0, 12); // Exactly 12 items

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -384, behavior: 'smooth' }); // Scroll one card width + gap
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 384, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-inter font-medium text-[#333333] mb-4 md:mb-8 px-2">
          {title}
        </h2>
        
        {/* Scroll Container Wrapper with Right Edge Blur */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 pb-4"
          >
            {finalProducts.map((product, idx) => (
              <div key={`${product.id}-${idx}`} className="snap-start flex items-stretch">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
          </div>

          {/* Right Edge Blur Gradient */}
          <div className="absolute top-0 bottom-4 right-0 w-24 md:w-40 bg-gradient-to-l from-[#F5F5F7] to-transparent pointer-events-none z-10" />
        </div>

        {/* Scroll Controls */}
        <div className="flex justify-end gap-3 mt-4 px-2">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
