import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Clock } from 'lucide-react';
import { Product } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCompare: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenCompare,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      id: 'iphone-16-pro',
      title: 'iPhone 16 Pro',
      headline: 'Save $200 with instant carrier activation.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      tag: 'Limited Time Offer',
      ctaPrimary: 'Shop iPhone 16 Pro',
      ctaSecondary: 'Compare Models',
      badges: ['In Stock', '6 Mos. Apple Music Free', 'Free Express Shipping'],
      productIndex: 0,
    },
    {
      id: 'macbook-air-m3',
      title: 'MacBook Air M3',
      headline: 'Free $150 Apple Gift Card with purchase.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      tag: 'Back to School',
      ctaPrimary: 'Claim Gift Card & Shop',
      ctaSecondary: 'Learn About M3',
      badges: ['0% APR for 12 Months', 'Free Engraving', 'Same-Day Pickup'],
      productIndex: 2,
    },
    {
      id: 'apple-watch-ultra-2',
      title: 'Apple Watch Ultra 2',
      headline: 'Satin Black Titanium. Built for adventure.',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80',
      tag: 'Top Rated',
      ctaPrimary: 'Buy Now — $799',
      ctaSecondary: 'View Specs',
      badges: ['Free Trail Loop Band', 'EN13319 Dive Rated', 'AppleCare+ Available'],
      productIndex: 5,
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

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(idx);
      setIsTransitioning(false);
    }, 300);
  };

  const slide = slides[currentSlide];
  const targetProduct = products[slide.productIndex] || products[0];

  return (
    <section className="relative bg-[#1D1D1F] text-white overflow-hidden">
      <div
        className={`min-h-[520px] md:min-h-[600px] flex items-center transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-2 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5" />
                <span>{slide.tag}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08]">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-md">
                {slide.headline}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {slide.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs bg-white/8 backdrop-blur-sm px-3 py-1.5 rounded-full text-gray-300 border border-white/8"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#0066CC]" />
                    {b}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => targetProduct && onAddToCart(targetProduct)}
                  className="bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
                >
                  {slide.ctaPrimary}
                </button>

                <button
                  onClick={() => {
                    if (slide.ctaSecondary.includes('Compare')) {
                      onOpenCompare();
                    } else if (targetProduct) {
                      onSelectProduct(targetProduct);
                    }
                  }}
                  className="text-white/80 hover:text-white font-medium text-sm px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
                >
                  {slide.ctaSecondary}
                </button>
              </div>
            </div>

            {/* Right — Product Image */}
            <div className="relative flex justify-center items-center">
              <div className="absolute w-80 h-80 md:w-[440px] md:h-[440px] bg-[#0066CC]/15 rounded-full blur-[100px] pointer-events-none" />
              <img
                src={slide.image}
                alt={slide.title}
                className="relative z-10 max-h-[380px] md:max-h-[460px] w-auto object-contain rounded-2xl transition-transform duration-700 hover:scale-[1.03] cursor-pointer"
                onClick={() => targetProduct && onSelectProduct(targetProduct)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={() =>
            goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
          }
          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
