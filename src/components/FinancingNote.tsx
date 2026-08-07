import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { FINANCING, financingHandoff, financingPlan } from '../data/financing';
import { formatNaira } from '../utils';

interface FinancingNoteProps {
  /**
   * The device in view. Drives eligibility and the term cap. Omit at checkout,
   * where a basket rather than one handset is being financed — pass `amount`
   * on its own there.
   */
  product?: Product;
  /**
   * Amount to finance in catalogue currency (USD), overriding `product.price`.
   * Pass the configured price when storage is selected, or the basket total at
   * checkout. Never a naira figure — `formatNaira` converts at display time.
   */
  amount?: number;
  /**
   * `sm` is one tappable line for dense surfaces (product cards, storage rows).
   * `md` adds the provider disclaimer and a separate Learn more control, for
   * the quick-view modal and checkout.
   */
  size?: 'sm' | 'md';
  /**
   * Required on purpose: this note is dropped onto white cards and onto the
   * dark hero tiles, and guessing wrong makes it invisible on one of them.
   */
  tone: 'light' | 'dark';
  /** Opens an in-app explainer. Takes precedence over the provider hand-off. */
  onLearnMore?: () => void;
  className?: string;
}

const TONE = {
  light: {
    text: 'text-ink-secondary',
    amount: 'text-ink',
    muted: 'text-ink-tertiary',
    link: 'text-link',
  },
  dark: {
    text: 'text-ink-tertiary',
    amount: 'text-white',
    muted: 'text-ink-tertiary',
    link: 'text-link-bright',
  },
} as const;

/**
 * The "from ₦X/mo with AltBank" line, in one place.
 *
 * Presentational only: every number and rule comes from `data/financing.ts`, so
 * this renders whatever the provider config says and nothing of its own. When
 * the amount does not qualify, it renders nothing rather than an apology.
 *
 * The Learn more affordance appears only when there is somewhere to go — an
 * `onLearnMore` handler, or a `handoffUrl` once AltBank gives us one. Until
 * then the line is plain text, which is better than a link that goes nowhere.
 */
export const FinancingNote: React.FC<FinancingNoteProps> = ({
  product,
  amount,
  size = 'sm',
  tone,
  onLearnMore,
  className = '',
}) => {
  const financed = amount ?? product?.price;
  if (financed === undefined) return null;

  const plan = financingPlan(financed, product);
  if (!plan) return null;

  const palette = TONE[tone];
  const href = financingHandoff(plan);
  const label = `Learn more about ${plan.provider} instalments`;

  const quote = (
    <>
      From{' '}
      <span className={`font-semibold ${palette.amount}`}>{formatNaira(plan.monthly)}/mo</span> for{' '}
      {plan.termMonths} months with {plan.provider}
    </>
  );

  // Compact: the whole line is the control, so a dense card gains a tap target
  // instead of a second row of chrome.
  if (size === 'sm') {
    const line = `text-caption ${palette.text}`;

    if (onLearnMore) {
      return (
        <button
          type="button"
          onClick={onLearnMore}
          aria-label={label}
          className={`flex min-h-11 items-center gap-0.5 text-left ${line} hover:underline ${className}`}
        >
          {quote}
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        </button>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={`flex min-h-11 items-center gap-0.5 ${line} hover:underline ${className}`}
        >
          {quote}
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        </a>
      );
    }

    return <p className={`${line} ${className}`}>{quote}</p>;
  }

  return (
    <div className={className}>
      <p className={`text-footnote ${palette.text}`}>{quote}</p>
      <p className={`mt-1 text-caption ${palette.muted}`}>{FINANCING.disclaimer}</p>

      {onLearnMore && (
        <button
          type="button"
          onClick={onLearnMore}
          className={`inline-flex min-h-11 items-center text-footnote ${palette.link} hover:underline`}
        >
          Learn more <ChevronRight className="ml-0.5 h-4 w-4" />
        </button>
      )}

      {!onLearnMore && href && (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex min-h-11 items-center text-footnote ${palette.link} hover:underline`}
        >
          Learn more <ChevronRight className="ml-0.5 h-4 w-4" />
        </a>
      )}
    </div>
  );
};
