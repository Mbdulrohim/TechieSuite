import type { PreOwnedDetail } from '../types';

/**
 * Outright cash purchase — TechieBase buys the device and pays for it.
 *
 * This is NOT the trade-in programme (see `TRADE_IN_DEVICES` in ./products and
 * `TradeInBanner`). Trade-in is credit against a new purchase, so it can afford
 * to be generous; a cash sale ties up the shop's money in stock it still has to
 * refurbish and resell, so every payout here sits deliberately below the
 * trade-in credit for the same handset. Keep it that way when you edit.
 *
 * PRICES ARE USD-SCALE CATALOGUE NUMBERS, like every other price in this repo.
 * Pass them through `formatNaira` (which multiplies by 1500) before display —
 * never write a naira figure into this file.
 */

/** Grades are borrowed wholesale from the pre-owned listing vocabulary, so a
 *  device bought here can be re-listed under the same grade without a mapping
 *  step. Changing `PreOwnedDetail['grade']` changes this on purpose. */
export type SellGrade = PreOwnedDetail['grade'];

export interface SellConditionGrade {
  grade: SellGrade;
  /** One line a customer can honestly self-assess against — no jargon. */
  summary: string;
  /** Share of the model's top payout this grade earns. Excellent is the 1.0. */
  payoutFactor: number;
}

/** Ordered best-first, which is also the order they render in. */
export const SELL_CONDITION_GRADES: readonly SellConditionGrade[] = [
  {
    grade: 'Excellent',
    summary: 'Like new. No scratches, screen unmarked, battery still strong.',
    payoutFactor: 1,
  },
  {
    grade: 'Very good',
    summary: 'Light wear on the frame, screen clean, everything works.',
    payoutFactor: 0.86,
  },
  {
    grade: 'Good',
    summary: 'Visible scratches or dents, screen intact, fully functional.',
    payoutFactor: 0.68,
  },
] as const;

export const DEFAULT_SELL_GRADE: SellGrade = 'Very good';

export interface SellDeviceModel {
  id: string;
  name: string;
  /** Top-of-band cash payout for an Excellent unit, USD-scale. */
  topPayout: number;
}

export interface SellDeviceFamily {
  id: string;
  /** Groups the models in the picker — shown as an <optgroup> label. */
  label: string;
  models: readonly SellDeviceModel[];
}

/**
 * What the shop actually buys. Phones and laptops only — we do not buy watches,
 * earbuds or tablets outright, because they are slow to resell.
 *
 * Anything not listed still has a home: the "something else" line in the UI
 * sends the customer to WhatsApp without a quote.
 */
export const SELL_DEVICE_FAMILIES: readonly SellDeviceFamily[] = [
  {
    id: 'iphone',
    label: 'iPhone',
    models: [
      { id: 'sell-iphone-17-pro-max', name: 'iPhone 17 Pro Max', topPayout: 780 },
      { id: 'sell-iphone-17-pro', name: 'iPhone 17 Pro', topPayout: 700 },
      { id: 'sell-iphone-17', name: 'iPhone 17', topPayout: 500 },
      { id: 'sell-iphone-16-pro-max', name: 'iPhone 16 Pro Max', topPayout: 620 },
      { id: 'sell-iphone-16-pro', name: 'iPhone 16 Pro', topPayout: 540 },
      { id: 'sell-iphone-16', name: 'iPhone 16', topPayout: 420 },
      { id: 'sell-iphone-15-pro-max', name: 'iPhone 15 Pro Max', topPayout: 500 },
      { id: 'sell-iphone-15-pro', name: 'iPhone 15 Pro', topPayout: 430 },
      { id: 'sell-iphone-15', name: 'iPhone 15', topPayout: 330 },
      { id: 'sell-iphone-14-pro-max', name: 'iPhone 14 Pro Max', topPayout: 370 },
      { id: 'sell-iphone-14-pro', name: 'iPhone 14 Pro', topPayout: 310 },
      { id: 'sell-iphone-14', name: 'iPhone 14', topPayout: 250 },
      { id: 'sell-iphone-13-pro-max', name: 'iPhone 13 Pro Max', topPayout: 290 },
      { id: 'sell-iphone-13-pro', name: 'iPhone 13 Pro', topPayout: 240 },
      { id: 'sell-iphone-13', name: 'iPhone 13', topPayout: 200 },
      { id: 'sell-iphone-12', name: 'iPhone 12 / 12 Pro', topPayout: 150 },
      { id: 'sell-iphone-11', name: 'iPhone 11 / 11 Pro', topPayout: 105 },
    ],
  },
  {
    id: 'samsung',
    label: 'Samsung Galaxy',
    models: [
      { id: 'sell-galaxy-s25-ultra', name: 'Galaxy S25 Ultra', topPayout: 560 },
      { id: 'sell-galaxy-s25-plus', name: 'Galaxy S25+', topPayout: 420 },
      { id: 'sell-galaxy-s25', name: 'Galaxy S25', topPayout: 350 },
      { id: 'sell-galaxy-z-fold-6', name: 'Galaxy Z Fold6', topPayout: 620 },
      { id: 'sell-galaxy-z-flip-6', name: 'Galaxy Z Flip6', topPayout: 380 },
      { id: 'sell-galaxy-s24-ultra', name: 'Galaxy S24 Ultra', topPayout: 400 },
      { id: 'sell-galaxy-s24', name: 'Galaxy S24', topPayout: 260 },
      { id: 'sell-galaxy-s23-ultra', name: 'Galaxy S23 Ultra', topPayout: 290 },
      { id: 'sell-galaxy-s23', name: 'Galaxy S23', topPayout: 190 },
      { id: 'sell-galaxy-a-series', name: 'Galaxy A55 / A54', topPayout: 95 },
    ],
  },
  {
    id: 'mac',
    label: 'MacBook',
    models: [
      { id: 'sell-macbook-pro-16-m3', name: 'MacBook Pro 16" (M3 Pro / Max)', topPayout: 1150 },
      { id: 'sell-macbook-pro-14-m3', name: 'MacBook Pro 14" (M3 Pro)', topPayout: 900 },
      { id: 'sell-macbook-air-15-m3', name: 'MacBook Air 15" (M3)', topPayout: 700 },
      { id: 'sell-macbook-air-13-m3', name: 'MacBook Air 13" (M3)', topPayout: 620 },
      { id: 'sell-macbook-pro-14-m1', name: 'MacBook Pro 14" (M1 Pro)', topPayout: 620 },
      { id: 'sell-macbook-air-13-m2', name: 'MacBook Air 13" (M2)', topPayout: 500 },
      { id: 'sell-macbook-air-13-m1', name: 'MacBook Air 13" (M1)', topPayout: 340 },
      { id: 'sell-macbook-pro-intel', name: 'MacBook Pro (Intel, 2019–2020)', topPayout: 200 },
    ],
  },
  {
    id: 'laptops',
    label: 'Windows laptop',
    models: [
      { id: 'sell-dell-xps-15', name: 'Dell XPS 15', topPayout: 480 },
      { id: 'sell-thinkpad-x1', name: 'Lenovo ThinkPad X1 Carbon', topPayout: 420 },
      { id: 'sell-asus-rog', name: 'ASUS ROG gaming laptop', topPayout: 460 },
      { id: 'sell-hp-spectre', name: 'HP Spectre x360', topPayout: 340 },
      { id: 'sell-everyday-windows', name: 'Everyday laptop (Core i5, 8GB)', topPayout: 120 },
    ],
  },
] as const;

/** Flat lookup list — the picker groups, the quote logic does not. */
export const SELL_DEVICE_MODELS: readonly SellDeviceModel[] = SELL_DEVICE_FAMILIES.flatMap(
  (family) => family.models
);

export const findSellModel = (id: string): SellDeviceModel | undefined =>
  SELL_DEVICE_MODELS.find((model) => model.id === id);

export const findSellGrade = (grade: SellGrade): SellConditionGrade =>
  SELL_CONDITION_GRADES.find((entry) => entry.grade === grade) ?? SELL_CONDITION_GRADES[0];

/** An indicative band, not a price. Both figures are USD-scale. */
export interface SellCashQuote {
  low: number;
  high: number;
}

/**
 * Why a band and not a number: storage size, battery health and whether the box
 * and charger are present all move the real offer, and none of those are asked
 * for here. A single figure would read as a promise.
 */
const BAND_WIDTH = 0.88;

/** Payouts are quoted in round money — ₦7,500 steps at the current rate. */
const roundToStep = (value: number) => Math.round(value / 5) * 5;

export const quoteFor = (model: SellDeviceModel, grade: SellGrade): SellCashQuote => {
  const high = roundToStep(model.topPayout * findSellGrade(grade).payoutFactor);
  return { low: roundToStep(high * BAND_WIDTH), high };
};

/** Drives the "up to" line in the section header, so copy and data cannot drift. */
export const SELL_PAYOUT_CEILING = SELL_DEVICE_MODELS.reduce(
  (max, model) => Math.max(max, model.topPayout),
  0
);

/** Same line the navbar dials — leads reach a human until there is an API. */
export const SELL_WHATSAPP_NUMBER = '2348143270982';

/**
 * The whole hand-off. There is no backend, so the WhatsApp deeplink IS the
 * submission: it has to carry enough detail that the shop can reply with a firm
 * offer without a second round trip.
 *
 * `quoteText` is passed in already formatted (via `formatNaira`) so this module
 * stays free of presentation concerns. Omit the grade and quote for the
 * "device not on the list" case, which asks rather than quotes.
 */
export const buildSellEnquiryHref = (
  deviceName: string,
  grade?: SellGrade,
  quoteText?: string
): string => {
  const message = grade && quoteText
    ? `Hello TechieBase! I would like to sell my ${deviceName} for cash. Condition: ${grade}. The site quoted ${quoteText}. When can I bring it in for inspection?`
    : `Hello TechieBase! I would like to sell a device for cash: ${deviceName}. It is not on the quote list — what can you offer for it?`;

  return `https://wa.me/${SELL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
