import { Product } from '../types';

/**
 * Device protection, underwritten by Gamp.
 *
 * Two rules live here so they cannot drift apart across the cart, the product
 * modal and checkout:
 *   - eligibility: brand-new devices only (requirement 6)
 *   - price: a quote derived from the device price
 *
 * PLACEHOLDER PRICING. The rate below is a stand-in until Gamp's actual rate
 * card is available — it is deliberately a single function so swapping in real
 * bands is a one-line change.
 */
export const PROTECTION = {
  provider: 'Gamp',
  name: 'Gamp Device Protection',
  blurb: 'Covers accidental damage, screen breakage and theft for 12 months.',

  /** Brand-new only — pre-owned devices carry the TechieBase warranty instead. */
  isEligible: (product: Product) => product.condition === 'new',

  /** Annual premium in catalogue currency (USD), converted for display. */
  quote: (product: Product) => Math.max(25, Math.round(product.price * 0.12)),

  termMonths: 12,
} as const;

/** What a line item adds for protection, or 0 when it is not covered. */
export const protectionPrice = (product: Product, enabled: boolean) =>
  enabled && PROTECTION.isEligible(product) ? PROTECTION.quote(product) : 0;
