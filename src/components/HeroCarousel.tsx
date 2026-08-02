import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Gift, Clock } from 'lucide-react';
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

  const slides = [
    {
      id: 'iphone-16-pro',
      title: 'Limited Time: Save $200 on iPhone 16 Pro',
      subtitle: 'Instant carrier activation discount + Trade-in up to $650 credit.',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80',
      tag: '🔥 FLASH SALE • ENDS IN 08h 24m',
      ctaPrimary: 'Shop iPhone 16 Pro',
      ctaSecondary: 'Compare Models',
      badges: ['In Stock at Local Apple Store', '6 Mos. Apple Music Included FREE', 'Free 2-Day Express Shipping'],
      productIndex: 0
    },
    {
      id: 'macbook-air-m3',
      title: 'Back to School: Get a Free $150 Apple Gift Card',
      subtitle: 'With any purchase of MacBook Air M3 or MacBook Pro. Save up to $200 with Education Pricing.',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      tag: '🎓 EDUCATION EXCLUSIVE',
      ctaPrimary: 'Claim Gift Card & Shop Mac',
      ctaSecondary: 'Learn About M3 Chip',
      badges: ['0% APR for 12 Months', 'Free Custom Engraving', 'In Stock for Same-Day Pickup'],
      productIndex: 2
    },
    {
      id: 'apple-watch-ultra-2',
      title: 'Apple Watch Ultra 2 – Satin Black Titanium Edition',
      subtitle: 'The ultimate sports & adventure watch. Breakthrough 3,000-nit display with dual-frequency GPS.',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80',
      tag: '⭐ TOP RATED OUTDOOR GEAR',
      ctaPrimary: 'Buy Now – $799 or $66.58/mo',
      ctaSecondary: 'Quick View Specs',
      badges: ['Free Trail Loop Band Included', 'EN13319 Scuba Rated', 'AppleCare+ Available'],
      productIndex: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const targetProduct = products[slide.productIndex] || products[0];

  return (
    <section className="relative bg-[#1D1D1F] text-white overflow-hidden my-4 rounded-3xl mx-4 max-w-7xl lg:mx-auto shadow-2xl border border-gray-800">
      <div className="min-h-[420px] md:min-h-[460px] flex items-center p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full relative z-10">
          
          {/* Left Text & Conversion Controls */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D70015]/20 text-[#FF4D4D] border border-[#D70015]/40 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>{slide.tag}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {slide.title}
            </h1>

            <p className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Micro badges */}
            <div className="flex flex-wrap gap-2 py-2">
              {slide.badges.map((b, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-[11px] bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md text-gray-200 border border-white/10"
                >
                  <ShieldCheck className="w-3 h-3 text-[#0066CC]" />
                  {b}
                </span>
              ))}
            </div>

            {/* Direct CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  if (targetProduct) {
                    onAddToCart(targetProduct);
                  }
                }}
                className="bg-[#0066CC] hover:bg-[#0055B3] text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current text-white" />
                <span>{slide.ctaPrimary}</span>
              </button>

              <button
                onClick={() => {
                  if (slide.ctaSecondary.includes('Compare')) {
                    onOpenCompare();
                  } else if (targetProduct) {
                    onSelectProduct(targetProduct);
                  }
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-5 py-3 rounded-full border border-white/20 transition-all backdrop-blur-md"
              >
                {slide.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Right Product Image Showcase */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-[#0066CC]/20 rounded-full blur-3xl pointer-events-none" />
            <img
              src={slide.image}
              alt={slide.title}
              className="relative z-10 max-h-[320px] md:max-h-[380px] w-auto object-contain rounded-2xl shadow-2xl transition-transform duration-500 transform hover:scale-105 cursor-pointer"
              onClick={() => targetProduct && onSelectProduct(targetProduct)}
            />
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows & Indicators */}
      <div className="absolute bottom-4 right-6 flex items-center gap-3 z-20">
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="p-2 bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-6 bg-[#0066CC]' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-2 bg-black/40 hover:bg-black/70 rounded-full text-white backdrop-blur-md transition-colors border border-white/10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
