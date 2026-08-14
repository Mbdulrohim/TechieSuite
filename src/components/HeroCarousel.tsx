import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Product } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const DYNAMIC_ACTIONS = [
  {
    text: 'Buy',
    gradient: 'from-pink-500 via-rose-500 to-purple-600',
    glowColor: 'rgba(236,72,153,0.5)',
  },
  {
    text: 'Swap',
    gradient: 'from-purple-500 via-indigo-500 to-cyan-400',
    glowColor: 'rgba(168,85,247,0.5)',
  },
  {
    text: 'Trade in',
    gradient: 'from-emerald-400 via-teal-500 to-lime-400',
    glowColor: 'rgba(34,197,94,0.5)',
  },
  {
    text: 'Supply',
    gradient: 'from-amber-400 via-yellow-400 to-orange-500',
    glowColor: 'rgba(234,179,8,0.5)',
  },
  {
    text: 'Buy installmentally',
    gradient: 'from-pink-500 via-purple-500 to-amber-400',
    glowColor: 'rgba(244,114,182,0.5)',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [actionIndex, setActionIndex] = useState(0);

  const wordRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  const slides = [
    {
      id: 'iphone-16-pro',
      headline: 'Hello, Apple Intelligence.',
      productId: 'iphone-16-pro',
    },
    {
      id: 'macbook-air-m3',
      headline: 'Lean. Mean. M3 machine.',
      productId: 'macbook-air-m3',
    },
  ];

  // GSAP Blur & Cycle Effect for the 5 dynamic actions
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimatingRef.current || !wordRef.current) return;
      isAnimatingRef.current = true;

      // Blur out animation
      gsap.to(wordRef.current, {
        opacity: 0,
        filter: 'blur(16px)',
        y: -14,
        scale: 0.92,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setActionIndex((prev) => (prev + 1) % DYNAMIC_ACTIONS.length);

          // Blur in animation
          if (wordRef.current) {
            gsap.fromTo(
              wordRef.current,
              {
                opacity: 0,
                filter: 'blur(16px)',
                y: 14,
                scale: 1.08,
              },
              {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0,
                scale: 1,
                duration: 0.45,
                ease: 'power2.out',
                onComplete: () => {
                  isAnimatingRef.current = false;
                },
              }
            );
          } else {
            isAnimatingRef.current = false;
          }
        },
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Slide carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 9000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const targetProduct = products.find((product) => product.id === slide.productId) || products[0];
  const currentAction = DYNAMIC_ACTIONS[actionIndex];

  return (
    <section className="relative bg-surface-raised text-ink overflow-hidden pt-12">
      <div
        className={`min-h-[500px] md:min-h-[640px] flex flex-col items-center justify-between transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
      >
        {/* Top — Text */}
        <div className="text-center space-y-3 px-6 z-10 pt-4">
          <h1 className="text-headline md:text-display font-semibold text-ink flex flex-wrap items-center justify-center gap-x-3">
            <span>You can</span>
            <span
              ref={wordRef}
              className={`bg-gradient-to-r ${currentAction.gradient} bg-clip-text text-transparent font-semibold inline-block transition-all duration-300`}
              style={{
                filter: 'drop-shadow(0 0 18px ' + currentAction.glowColor + ')',
              }}
            >
              {currentAction.text}
            </span>
          </h1>

          <p className="text-lead md:text-title font-normal mt-1 text-ink-secondary">
            {slide.headline}
          </p>

          <div className="flex items-center justify-center gap-6 pt-4 text-body">
            <button
              onClick={() => onSelectProduct(targetProduct)}
              className="bg-accent hover:bg-accent-hover active:scale-[0.98] text-white px-6 h-11 min-h-[44px] rounded-full transition-all flex items-center justify-center font-medium"
            >
              Learn more
            </button>
            <button
              onClick={() => onAddToCart(targetProduct)}
              className="text-link hover:underline h-11 flex items-center justify-center active:opacity-80"
            >
              Buy &gt;
            </button>
          </div>
        </div>

        {/* Bottom — Image */}
        <div className="relative mt-10 flex h-full w-full flex-1 items-end justify-center px-6 pb-6 md:mt-16 md:px-10 md:pb-10">
          <img
            src={targetProduct.imageUrl}
            alt={targetProduct?.name || 'Apple Product'}
            className="relative z-10 h-auto max-h-[260px] w-auto max-w-[82vw] cursor-pointer object-contain transition-transform duration-700 hover:scale-[1.02] md:max-h-[380px] md:max-w-[760px]"
            onClick={() => onSelectProduct(targetProduct)}
          />
        </div>
      </div>
    </section>
  );
};
