import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Scale, ShoppingBag, Star, X } from 'lucide-react';
import { Product } from '../types';
import { formatNaira } from '../utils';
import { monthlyInstalment } from '../data/financing';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  /** Optional: clears the tray in one action. */
  onClearCompare?: () => void;
}

/** `Flight_time` -> `Flight time`. Spec keys are authored per product and a few
 *  carry underscores; nobody should see one on a comparison table. */
const humanise = (key: string) => key.replace(/_/g, ' ');

/** One line of the table: a label and the value each product gives for it. */
interface CompareRow {
  /** Unique and stable — used as the React key and to spot the rating row.
   *  Cannot be derived from `label`, because spec keys collide with the fixed
   *  labels: `Storage`, `Rating` and `Condition` are all authored as product
   *  specs somewhere in the catalogue. */
  id: string;
  label: string;
  values: string[];
  /** True when every product answers this row identically. */
  identical: boolean;
}

/** Exported so the row logic can be exercised directly — it is the part of
 *  this component that can silently produce an empty table. */
export const buildRows = (products: Product[]): CompareRow[] => {
  if (products.length === 0) return [];

  /* Spec keys are a union across the compared products, not a fixed list.
     This table used to hardcode six keys — Display, Chip, Processor, Camera,
     Battery, Weight — against a catalogue carrying 125 distinct ones, so
     comparing two PlayStations produced six rows of dashes and nothing else.
     Order follows the first product, then appends whatever the others add, so
     the primary device reads top to bottom the way its own page does. */
  const specKeys: string[] = [];
  for (const product of products) {
    for (const key of Object.keys(product.specs)) {
      if (!specKeys.includes(key)) specKeys.push(key);
    }
  }

  const fixed: Array<{ label: string; read: (product: Product) => string }> = [
    {
      label: 'Price',
      read: (product) =>
        `${product.optionGroups?.length || product.storageOptions?.length ? 'From ' : ''}${formatNaira(product.price)}`,
    },
    {
      label: 'Monthly',
      read: (product) => `${formatNaira(monthlyInstalment(product.price, 24))}/mo for 24 mo.`,
    },
    {
      label: 'Customer rating',
      read: (product) => `${product.rating} (${product.reviewCount.toLocaleString()} reviews)`,
    },
    {
      label: 'Sold as',
      read: (product) =>
        product.condition === 'pre-owned'
          ? `Pre-owned${product.preOwned ? ` · ${product.preOwned.grade}` : ''}`
          : 'Brand new',
    },
    // Only meaningful since size and chip became configurable rather than
    // separate products — otherwise two Macs look identical here.
    {
      label: 'Configurable',
      read: (product) =>
        product.optionGroups?.length
          ? product.optionGroups
              .map((group) => group.choices.map((choice) => choice.label).join(' / '))
              .join(' · ')
          : '—',
    },
    {
      label: 'Storage options',
      read: (product) =>
        product.storageOptions?.length
          ? product.storageOptions.map((option) => option.capacity).join(' / ')
          : '—',
    },
    {
      label: 'Finishes',
      read: (product) => product.colors.map((colour) => colour.name).join(', '),
    },
    {
      label: 'Availability',
      read: (product) =>
        product.inStock
          ? product.pickupAvailable
            ? 'In stock · pickup available'
            : 'In stock'
          : 'Out of stock',
    },
  ];

  const rows: CompareRow[] = fixed.map(({ label, read }) => {
    const values = products.map(read);
    return { id: `fixed:${label}`, label, values, identical: new Set(values).size === 1 };
  });

  for (const key of specKeys) {
    const values = products.map((product) => product.specs[key] ?? '—');
    rows.push({
      id: `spec:${key}`,
      label: humanise(key),
      values,
      identical: new Set(values).size === 1,
    });
  }

  return rows;
};

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveFromCompare,
  onAddToCart,
  onClearCompare,
}) => {
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const rows = useMemo(() => buildRows(comparedProducts), [comparedProducts]);

  // Filtering to differences is meaningless with a single column, and would
  // blank the table entirely — every row is trivially "identical".
  const canFilter = comparedProducts.length > 1;
  const visibleRows = canFilter && differencesOnly ? rows.filter((row) => !row.identical) : rows;
  const sameCount = rows.filter((row) => row.identical).length;

  /* Matches QuickViewModal: escape closes, focus moves in and is handed back,
     and the page behind stops scrolling. This dialog previously had none of
     it — no role, no keyboard exit, and the body scrolled underneath. */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const columnWidth = 'min-w-[200px] sm:min-w-[240px]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-xl md:items-center md:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-dialog-title"
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-panel bg-surface md:rounded-panel"
      >
        {/* Header */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-hairline-soft px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <Scale aria-hidden="true" className="h-5 w-5 text-ink-tertiary" />
            <h2 id="compare-dialog-title" className="text-title-sm font-semibold text-ink">
              Compare
            </h2>
            {comparedProducts.length > 0 && (
              <span className="text-caption text-ink-tertiary">
                {comparedProducts.length} of 3
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {canFilter && (
              <label className="mr-2 flex min-h-11 cursor-pointer items-center gap-2 text-footnote text-ink-secondary">
                <input
                  type="checkbox"
                  checked={differencesOnly}
                  onChange={(event) => setDifferencesOnly(event.target.checked)}
                  className="h-4 w-4 rounded border-hairline accent-accent"
                />
                Differences only
                {sameCount > 0 && (
                  <span className="text-ink-tertiary">({sameCount} match)</span>
                )}
              </label>
            )}

            {comparedProducts.length > 0 && onClearCompare && (
              <button
                type="button"
                onClick={onClearCompare}
                className="min-h-11 rounded-full px-3 text-footnote text-ink-secondary hover:text-ink hover:underline"
              >
                Clear all
              </button>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close comparison"
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink-tertiary transition-colors hover:bg-canvas hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="space-y-4 px-6 py-20 text-center">
            <Scale aria-hidden="true" className="mx-auto h-12 w-12 text-hairline" />
            <p className="text-lead font-semibold text-ink">Nothing to compare yet</p>
            <p className="mx-auto max-w-sm text-body text-ink-secondary">
              Tap the compare icon on any product and it appears here. You can line up three at a
              time.
            </p>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  {/* Sticky in both directions: the label column stays put when
                      the table scrolls sideways on a phone, and the product
                      header stays put when it scrolls down. */}
                  <th
                    scope="col"
                    className="sticky left-0 top-0 z-30 w-32 bg-surface px-4 py-4 sm:w-40"
                  >
                    <span className="sr-only">Specification</span>
                  </th>
                  {comparedProducts.map((product) => (
                    <th
                      key={product.id}
                      scope="col"
                      className={`sticky top-0 z-20 border-l border-hairline-soft bg-surface p-4 align-top ${columnWidth}`}
                    >
                      <div className="relative flex flex-col items-center gap-3 text-center">
                        <button
                          type="button"
                          onClick={() => onRemoveFromCompare(product.id)}
                          aria-label={`Remove ${product.name} from comparison`}
                          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-ink-tertiary transition-colors hover:bg-canvas hover:text-ink"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-24 w-24 object-contain"
                        />
                        <span className="text-footnote font-semibold text-ink">{product.name}</span>

                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-4 text-footnote font-semibold text-white transition-colors hover:bg-accent-hover"
                        >
                          <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                          Add to Bag
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.id} className="border-t border-hairline-soft">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-surface px-4 py-3 align-top text-caption font-medium text-ink-secondary"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={comparedProducts[index]?.id ?? index}
                        /* Rows every product answers the same way are muted
                           rather than removed: they are still the answer to
                           "are these the same?", which is half of why anyone
                           opens a comparison. */
                        className={`border-l border-hairline-soft px-4 py-3 align-top text-footnote ${
                          row.identical && canFilter ? 'text-ink-tertiary' : 'text-ink'
                        }`}
                      >
                        {row.id === 'fixed:Customer rating' ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Star aria-hidden="true" className="h-3.5 w-3.5 fill-star text-star" />
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {visibleRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={comparedProducts.length + 1}
                      className="px-4 py-16 text-center text-body text-ink-secondary"
                    >
                      These are identical on every line we hold.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
