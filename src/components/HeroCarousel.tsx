import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 'iphone-16-pro',
      title: 'iPhone 16 Pro',
      headline: 'Hello, Apple Intelligence.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      productIndex: 0,
    },
    {
      id: 'macbook-air-m3',
      title: 'MacBook Air',
      headline: 'Lean. Mean. M3 machine.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      productIndex: 2,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const targetProduct = products[slide.productIndex] || products[0];

  return (
    <section className="relative bg-[#fbfbfd] text-[#1d1d1f] overflow-hidden pt-12">
      <div
        className={`min-h-[500px] md:min-h-[640px] flex flex-col items-center justify-between transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Top — Text */}
        <div className="text-center space-y-2 px-6 z-10 pt-4">
          <h1 className="text-4xl md:text-[56px] font-inter font-medium tracking-tight leading-tight text-[#333333]">
            {slide.title}
          </h1>
          <p className="text-[22px] md:text-[28px] font-inter font-normal tracking-tight mt-1">
            {slide.headline}
          </p>
          <div className="flex items-center justify-center gap-6 pt-4 text-[17px]">
            <button
              onClick={() => onSelectProduct(targetProduct)}
              className="bg-[#0071e3] hover:bg-[#0077ED] text-white px-5 py-2 rounded-full transition-colors"
            >
              Learn more
            </button>
            <button
              onClick={() => onAddToCart(targetProduct)}
              className="text-[#0066cc] hover:underline"
            >
              Buy &gt;
            </button>
          </div>
        </div>

        {/* Bottom — Image */}
        <div className="relative flex justify-center items-end mt-10 md:mt-16 w-full h-full flex-1 px-4">
          <img
            src={slide.image}
            alt={slide.title}
            className="relative z-10 max-h-[300px] md:max-h-[420px] w-auto object-contain transition-transform duration-700 hover:scale-[1.02] cursor-pointer"
            onClick={() => onSelectProduct(targetProduct)}
          />
        </div>
      </div>
    </section>
  );
};
