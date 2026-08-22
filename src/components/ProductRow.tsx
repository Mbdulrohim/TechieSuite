import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductRowProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onViewAll?: () => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  title,
  products,
  onAddToCart,
  onQuickView,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  if (products.length === 0) return null;

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
        <div className="mb-4 flex items-end justify-between gap-4 px-2 md:mb-8">
          <h2 className="text-title md:text-headline font-semibold text-ink">{title}</h2>
          {onViewAll && (
            <button type="button" onClick={onViewAll} className="min-h-11 shrink-0 text-footnote font-medium text-link hover:underline">
              Shop {title} &gt;
            </button>
          )}
        </div>

        {/* Scroll Container Wrapper with Right Edge Blur */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 pb-4"
          >
            {products.map((product) => (
              <div key={product.id} className="snap-start flex items-stretch">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
          </div>

          {/* Right Edge Blur Gradient */}
          <div className="absolute top-0 bottom-4 right-0 w-24 md:w-40 bg-gradient-to-l from-canvas to-transparent pointer-events-none z-10" />
        </div>

        {/* Scroll Controls */}
        <div className="flex justify-end gap-3 mt-4 px-2">
          <button
            onClick={scrollLeft}
            aria-label={`Scroll ${title} products left`}
            className="w-12 h-12 rounded-full bg-canvas hover:bg-hairline-soft flex items-center justify-center text-ink-secondary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            aria-label={`Scroll ${title} products right`}
            className="w-12 h-12 rounded-full bg-canvas hover:bg-hairline-soft flex items-center justify-center text-ink-secondary transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
