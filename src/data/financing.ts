import { Product } from '../types';

/**
 * Instalment financing, provided by AltBank.
 *
 * Sibling of `protection.ts`: the rules that would otherwise drift apart across
 * the product card, the quick-view modal, the cart and checkout live here once.
 *   - eligibility: a price floor, not a condition rule (see `isEligible`)
 *   - term: how long a given device may be spread over
 *   - instalment: the monthly figure every surface quotes
 *
 * WHAT IS REAL AND WHAT IS NOT
 * The shape of the offer is real: AltBank, monthly instalments, terms we choose
 * to display. The numbers and the hand-off are not — we have no rate card, no
 * eligibility rules and no redirect contract from AltBank yet. Both unknowns are
 * isolated below (`PLACEHOLDER_ANNUAL_RATE`, `handoffUrl`) so adopting the real
 * contract is an edit here and nowhere else.
 */

/**
 * PLACEHOLDER RATE. AltBank has not published a rate card, so this is a flat
 * annual markup on the financed amount — deliberately one constant behind one
 * function, so swapping in real per-term bands is a small, local change.
 * Anything quoted from it is indicative; see `FINANCING.disclaimer`, which the
 * UI is expected to show alongside the figure.
 *
 * Held at 0 on purpose. A non-zero guess would put an invented interest rate in
 * front of shoppers with a named bank attached to it, which is a pricing claim
 * we are not in a position to make. Zero keeps the quoted figure honest — the
 * amount simply spread across the term — and matches what the storefront
 * already shows. Set the real rate the day AltBank supplies one.
 */
const PLACEHOLDER_ANNUAL_RATE = 0;

/**
 * Floor for financing, in catalogue currency (USD, ~₦225,000).
 * Below this an instalment plan is friction rather than a service — nobody
 * wants a credit check to buy a cable.
 */
const MIN_FINANCED_AMOUNT = 150;

/** Terms we offer, ascending. The longest a device qualifies for sets the "from" price. */
const TERM_MONTHS = [6, 12, 24] as const;

/**
 * Pre-owned tops out here. A 24-month plan on a handset carrying a 3–12 month
 * warranty would outlive the cover by a year, and that is the complaint, not
 * the sale.
 */
const PRE_OWNED_MAX_TERM_MONTHS = 12;

export const FINANCING = {
  provider: 'AltBank',
  name: 'AltBank instalments',
  blurb: 'Spread the cost over monthly instalments, approved by AltBank.',

  /** Shown wherever a figure is quoted — we are displaying an estimate, not an offer. */
  disclaimer: 'Indicative. AltBank confirms your rate and term when you apply.',

  termMonths: TERM_MONTHS,

  /**
   * Amount-based, not condition-based — and that is the deliberate difference
   * from protection, which is new-only.
   *
   * Protection prices device risk, so a refurbished handset genuinely changes
   * the quote. Financing prices customer credit risk; the condition of the box
   * is beside the point, and pre-owned buyers are precisely the shoppers
   * instalments exist for. Pre-owned is therefore eligible, but capped by
   * `termsFor` below rather than excluded here.
   */
  isEligible: (product: Product) => product.price >= MIN_FINANCED_AMOUNT,

  /** Terms available for a device, ascending. Empty when it does not qualify. */
  termsFor: (product: Product): number[] => {
    if (product.price < MIN_FINANCED_AMOUNT) return [];
    const cap = product.condition === 'pre-owned' ? PRE_OWNED_MAX_TERM_MONTHS : Infinity;
    return TERM_MONTHS.filter((term) => term <= cap);
  },

  /**
   * THE UNKNOWN. AltBank has given us no redirect target and no parameter
   * contract, so there is nothing honest to put here — null on purpose. A
   * plausible-looking URL would ship as a dead link that nobody notices until a
   * customer hits it.
   *
   * When the contract arrives: set this string, and if AltBank wants the basket
   * on the query string, build it in `financingHandoff` below. Callers already
   * handle null by explaining the plan in-page instead of linking out, so
   * nothing else in the app needs to change.
   */
  handoffUrl: null as string | null,
} as const;

/** A quote for one amount over one term. Money is in catalogue currency (USD). */
export interface FinancingPlan {
  provider: string;
  /** What is being financed, in catalogue currency (USD). */
  amount: number;
  termMonths: number;
  /** Per-month figure — pass straight to `formatNaira`, never pre-converted. */
  monthly: number;
}

/**
 * The single source of truth for the "/mo" maths.
 *
 * `amount` is a catalogue (USD) figure: a product price, a configured price
 * including storage, or a basket total. Never a naira figure — `formatNaira`
 * does the conversion at the point of display.
 */
export const monthlyInstalment = (amount: number, termMonths: number): number => {
  if (termMonths <= 0) return 0;
  const total = amount * (1 + PLACEHOLDER_ANNUAL_RATE * (termMonths / 12));
  return Number((total / termMonths).toFixed(2));
};

/**
 * The cheapest instalment we can advertise for an amount — i.e. the longest
 * term it qualifies for, which is what "from ₦X/mo" means.
 *
 * Pass `product` wherever one device is in view, so its condition can cap the
 * term. Omit it at checkout, where a basket rather than a handset is being
 * financed. Returns null when nothing can be quoted, which is the caller's cue
 * to render nothing at all.
 */
export const financingPlan = (amount: number, product?: Product): FinancingPlan | null => {
  if (!Number.isFinite(amount) || amount < MIN_FINANCED_AMOUNT) return null;

  const terms = product ? FINANCING.termsFor(product) : [...TERM_MONTHS];
  const termMonths = terms[terms.length - 1];
  if (!termMonths) return null;

  return {
    provider: FINANCING.provider,
    amount,
    termMonths,
    monthly: monthlyInstalment(amount, termMonths),
  };
};

/**
 * Where "Learn more" points, or null while the contract is unknown.
 *
 * Kept as a function even though it currently returns a constant: the moment
 * AltBank specifies parameters (basket id, amount, term, merchant code) they
 * get appended here, and every call site is already asking the right question.
 */
export const financingHandoff = (_plan?: FinancingPlan | null): string | null =>
  FINANCING.handoffUrl;
