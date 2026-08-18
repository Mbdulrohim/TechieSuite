import React from 'react';
import { ArrowUpRight, Filter, Heart, MapPin, Scale } from 'lucide-react';
import { Condition, Product } from '../types';
import { formatNaira } from '../utils';
import { monthlyInstalment } from '../data/financing';

type CatalogViewProps = {
  category: string;
  condition: Condition;
  products: Product[];
  storeName: string;
  wishlistCount: number;
  compareCount: number;
  onOpenStore: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenFilters: () => void;
  onOpenProduct: (product: Product) => void;
  onResetFilters: () => void;
  onSelectCondition: (condition: Condition) => void;
};

/** Two-state switch that keeps you in the same category while flipping
 *  between the brand new and pre-owned catalogues. */
const ConditionSwitch: React.FC<{
  condition: Condition;
  onSelect: (condition: Condition) => void;
}> = ({ condition, onSelect }) => (
  <div
    role="group"
    aria-label="Shop brand new or pre-owned"
    className="inline-flex rounded-full bg-canvas p-1 ring-1 ring-black/[0.06]"
  >
    {([
      ['new', 'Brand New'],
      ['pre-owned', 'Pre-owned'],
    ] as const).map(([value, label]) => (
      <button
        key={value}
        type="button"
        onClick={() => onSelect(value)}
        aria-pressed={condition === value}
        className={`min-h-9 rounded-full px-4 text-footnote font-medium transition-colors ${
          condition === value ? 'bg-surface text-ink shadow-card' : 'text-ink-secondary hover:text-ink'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

/** Pre-owned gets its own wash so the two worlds read differently at a glance. */
const PRE_OWNED_ACCENT = 'from-[#f0e9df] via-canvas to-[#e6ecec]';

export const CATEGORY_COPY: Record<string, { eyebrow: string; title: string; description: string; accent: string; }> = {
  iphone: {
    eyebrow: 'Shop iPhone',
    title: 'Designed to be loved.',
    description: 'Find the iPhone that fits your life, from enduring classics to the latest Pro models.',
    accent: 'from-[#f5e6db] via-[#f4f1ee] to-[#e8edf5]',
  },
  mac: {
    eyebrow: 'Shop Mac',
    title: 'If you can dream it, Mac can do it.',
    description: 'Remarkably capable. Incredibly simple. Built to help you work, create, and play.',
    accent: 'from-[#e6edf5] via-canvas to-[#eee8f4]',
  },
  ipad: {
    eyebrow: 'Shop iPad',
    title: 'Touch, draw, and make something wonderful.',
    description: 'A versatile canvas for creativity, work, learning, and everything between.',
    accent: 'from-[#f7e8df] via-canvas to-[#e6eff0]',
  },
  watch: {
    eyebrow: 'Shop Apple Watch',
    title: 'To know you is to move you.',
    description: 'Stay active, healthy, connected, and safe—right from your wrist.',
    accent: 'from-[#e8ece9] via-canvas to-[#eee9e6]',
  },
  airpods: {
    eyebrow: 'Shop AirPods',
    title: 'Iconic. Now supersonic.',
    description: 'Immersive sound, effortless connection, and all-day listening.',
    accent: 'from-[#e7eef4] via-canvas to-[#eeeaf4]',
  },
  accessories: {
    eyebrow: 'Shop Accessories',
    title: 'The finishing touches.',
    description: 'Cases, chargers, trackers, and essentials selected for your Apple devices.',
    accent: 'from-[#eee9e3] via-canvas to-[#e8edf0]',
  },
  samsung: {
    eyebrow: 'Shop Samsung',
    title: 'Open up to a bigger screen.',
    description: 'Galaxy flagships, foldables and tablets — every unit sealed, unlocked, and covered by the TechieBase warranty.',
    accent: 'from-[#e4ecf6] via-canvas to-[#ebe6f3]',
  },
  gaming: {
    eyebrow: 'Shop Gaming',
    title: 'Press start.',
    description: 'PlayStation, Xbox, Nintendo and the pads, headsets and rigs that go with them. Set up in-store before you take it home.',
    accent: 'from-[#e6e3f4] via-canvas to-[#dfeef1]',
  },
  laptops: {
    eyebrow: 'Shop Laptops',
    title: 'Work that travels well.',
    description: 'Windows ultrabooks, creator machines and gaming laptops, from everyday study to full desktop replacement.',
    accent: 'from-[#e9edf1] via-canvas to-[#f0ebe4]',
  },
  audio: {
    eyebrow: 'Shop Audio',
    title: 'Turn the world down.',
    description: 'Noise-cancelling headphones and portable speakers, chosen for battery life and real-world durability.',
    accent: 'from-[#f2e8e4] via-canvas to-[#e4ecef]',
  },
  power: {
    eyebrow: 'Shop Power',
    title: 'Stay on, whatever the grid does.',
    description: 'Power banks, fast chargers, surge protection and portable stations — built for Nigerian mains.',
    accent: 'from-[#f4eddc] via-canvas to-[#e4efe6]',
  },
  anker: {
    eyebrow: 'Anker at TechieBase',
    title: 'Power, without the guesswork.',
    description: 'Fast chargers, serious power banks and everyday audio selected for Nigerian workdays and travel.',
    accent: 'from-[#dfe8f5] via-canvas to-[#e8eef2]',
  },
  gear: {
    eyebrow: 'Creator Gear',
    title: 'Shoot it properly.',
    description: 'DJI drones, gimbals, action cameras and wireless mics — the kit that makes the difference between phone footage and something people watch to the end.',
    accent: 'from-[#e6ecf2] via-canvas to-[#f1ece6]',
  },
  'pre-owned': {
    eyebrow: 'TechieBase Certified',
    title: 'Certified. Tested. Guaranteed.',
    description: 'Every device passes a 30-point inspection, arrives factory reset, and carries a TechieBase warranty.',
    accent: PRE_OWNED_ACCENT,
  },
  deals: {
    eyebrow: 'TechieBase Offers',
    title: 'More ways to save.',
    description: 'Limited offers, trade-in value, and flexible ways to own the technology you love.',
    accent: 'from-[#e1f1e6] via-canvas to-[#f4eadf]',
  },
};

/** Condition tag (requirement 10). Kept separate from `badge`, which carries
 *  marketing labels like NEW meaning "newly released" rather than "unused". */
export const ConditionTag: React.FC<{ condition: Condition }> = ({ condition }) => (
  <span
    className={`rounded-full px-3 py-1 text-micro font-semibold uppercase tracking-wide backdrop-blur-md ${
      condition === 'new' ? 'bg-ink/85 text-white' : 'bg-brand/90 text-white'
    }`}
  >
    {condition === 'new' ? 'Brand New' : 'Pre-owned'}
  </span>
);

const CatalogCard: React.FC<{ product: Product; onOpen: () => void; }> = ({ product, onOpen }) => (
  <article className="group flex min-w-0 flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover">
    <button
      type="button"
      onClick={onOpen}
      className="relative block aspect-[4/3] w-full overflow-hidden bg-canvas text-left"
      aria-label={`Configure ${product.name}`}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.025] ${
          product.imageUrl.startsWith('/images/products/')
            ? 'object-contain p-4 sm:p-6'
            : 'object-cover'
        }`}
      />
      {/* Condition always reads first — it is the thing a shopper most needs
          to know, and it is deliberately distinct from the marketing badge. */}
      <span className="absolute left-4 top-4 flex items-center gap-2">
        <ConditionTag condition={product.condition} />
        {product.badge && (
          <span className="rounded-full bg-white/90 px-3 py-1 text-micro font-semibold uppercase tracking-wide text-ink backdrop-blur-md">
            {product.badge}
          </span>
        )}
      </span>
    </button>

    <div className="flex flex-1 flex-col p-5 md:p-6">
      <div className="mb-4 flex min-h-5 items-center gap-1.5" aria-label={`${product.colors.length} available finishes`}>
        {product.colors.slice(0, 5).map((color) => (
          <span
            key={color.name}
            title={color.name}
            className="h-3 w-3 rounded-full border border-black/10 shadow-sm"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      <h2 className="text-lead font-semibold text-ink">{product.name}</h2>
      <p className="mt-1 line-clamp-2 min-h-10 text-footnote text-ink-secondary">{product.tagline}</p>

      {product.preOwned && (
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ink-secondary">
          <div className="flex gap-1">
            <dt className="sr-only">Grade</dt>
            <dd className="font-medium text-ink">{product.preOwned.grade}</dd>
          </div>
          {product.preOwned.batteryHealth && (
            <div className="flex gap-1">
              <dt>Battery</dt>
              <dd className="font-medium text-ink">{product.preOwned.batteryHealth}%</dd>
            </div>
          )}
          <div className="flex gap-1">
            <dt className="sr-only">Warranty</dt>
            <dd>{product.preOwned.warrantyMonths}-month warranty</dd>
          </div>
        </dl>
      )}

      <div className="mt-5">
        <p className="text-footnote font-semibold text-ink">From {formatNaira(product.price)}</p>
        {product.preOwned ? (
          <p className="mt-0.5 text-caption text-ink-secondary">
            {product.preOwned.unitsAvailable === 1
              ? 'Last one in stock'
              : `${product.preOwned.unitsAvailable} in stock`}
          </p>
        ) : (
          <p className="mt-0.5 text-caption text-ink-secondary">{formatNaira(monthlyInstalment(product.price, 24))}/mo. for 24 months</p>
        )}
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-1 rounded-full bg-accent px-5 text-footnote font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        Choose <ArrowUpRight className="h-3.5 w-3.5" />
      </button>
    </div>
  </article>
);

export const CatalogView: React.FC<CatalogViewProps> = ({
  category,
  condition,
  products,
  storeName,
  wishlistCount,
  compareCount,
  onOpenStore,
  onOpenWishlist,
  onOpenCompare,
  onOpenFilters,
  onOpenProduct,
  onResetFilters,
  onSelectCondition,
}) => {
  const copy = CATEGORY_COPY[category] || CATEGORY_COPY.deals;
  const isPreOwned = condition === 'pre-owned';

  return (
    <div className="pb-24">
      <section className={`bg-gradient-to-br ${isPreOwned ? PRE_OWNED_ACCENT : copy.accent}`}>
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-8 md:py-24">
          <p className="text-footnote font-semibold text-sale">
            {isPreOwned ? `${copy.eyebrow} · Pre-owned` : copy.eyebrow}
          </p>
          <h1 className="mt-2 max-w-4xl text-display-sm font-semibold text-ink sm:text-display md:text-display-lg">
            {isPreOwned ? 'Certified. Tested. Guaranteed.' : copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-body text-ink-secondary md:text-lead">
            {isPreOwned
              ? 'Every pre-owned device passes a 30-point inspection, arrives factory reset, and carries a TechieBase warranty.'
              : copy.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-8 md:px-8 md:pt-10" aria-label="Shopping controls">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-card bg-white p-3 shadow-sm ring-1 ring-black/[0.05]">
          <div className="flex flex-wrap items-center gap-2">
            <ConditionSwitch condition={condition} onSelect={onSelectCondition} />
            <button
              type="button"
              onClick={onOpenStore}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-footnote font-medium text-ink hover:bg-canvas"
            >
              <MapPin className="h-4 w-4 text-accent" /> Pickup: {storeName}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={onOpenWishlist} aria-label={`Open ${wishlistCount} saved items`} className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-canvas">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand" />}
            </button>
            <button type="button" onClick={onOpenCompare} aria-label={`Compare ${compareCount} products`} className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-canvas">
              <Scale className="h-4 w-4" />
              {compareCount > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />}
            </button>
            <button type="button" onClick={onOpenFilters} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-footnote font-semibold text-white hover:bg-black">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 pt-12 md:px-8 md:pt-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-ink-secondary">The collection</p>
            <h2 className="mt-1 text-title font-semibold text-ink md:text-headline">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </h2>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
            {products.map((product) => (
              <CatalogCard key={product.id} product={product} onOpen={() => onOpenProduct(product)} />
            ))}
          </div>
        ) : (
          <div className="rounded-panel bg-white px-6 py-24 text-center ring-1 ring-black/[0.04]">
            <h2 className="text-title-sm font-semibold text-ink">No matching products</h2>
            <p className="mt-2 text-footnote text-ink-secondary">Reset the filters to see the full collection.</p>
            <button type="button" onClick={onResetFilters} className="mt-6 rounded-full bg-accent px-6 py-3 text-footnote font-semibold text-white">
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
