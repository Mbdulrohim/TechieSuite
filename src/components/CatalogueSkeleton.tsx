import React from 'react';

/**
 * What the storefront shows while the catalogue is still being fetched.
 *
 * This exists because the page had no loading state at all: `liveProducts`
 * starts empty, so during the request the storefront rendered its *empty*
 * state — telling a shopper the shop had nothing, a moment before the products
 * arrived. A shop that flashes "we have nothing" on every cold load is worse
 * than one that takes a beat to draw.
 *
 * The shape deliberately mirrors ProductRow rather than being a spinner: the
 * placeholder occupies the space the real cards are about to take, so nothing
 * jumps when they land.
 */

const SkeletonCard: React.FC = () => (
  <div className="flex shrink-0 flex-col items-center px-3" style={{ width: 'var(--skeleton-card-w, 260px)' }}>
    <div className="skeleton mb-4 h-32 w-full rounded-card md:mb-8 md:h-72" />
    <div className="skeleton h-4 w-3/5 rounded-full" />
    <div className="skeleton mt-2.5 h-3 w-2/5 rounded-full" />
  </div>
);

const SkeletonRow: React.FC<{ cards: number }> = ({ cards }) => (
  <section className="mx-auto max-w-[1400px] px-6 py-10">
    <div className="skeleton h-6 w-40 rounded-full" />
    <div className="mt-8 flex overflow-hidden">
      {Array.from({ length: cards }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  </section>
);

export const CatalogueSkeleton: React.FC = () => (
  /* aria-busy plus a polite live label: a screen reader is told the region is
     loading once, instead of reading a wall of empty placeholder boxes. */
  <div aria-busy="true" aria-live="polite" aria-label="Loading products">
    {/* Hero placeholder — the tallest thing on the page, so leaving it out
        would make the whole layout shift when the real hero mounts. */}
    <section className="mx-auto max-w-[1400px] px-6 pt-8">
      <div className="skeleton h-[320px] w-full rounded-panel md:h-[440px]" />
    </section>

    <SkeletonRow cards={4} />
    <SkeletonRow cards={4} />
  </div>
);
