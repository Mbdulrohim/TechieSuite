/**
 * The next launch worth teasing on the storefront.
 *
 * One release at a time, on purpose — the teaser is a mention, not a section,
 * and two competing "coming soon" tiles would flatten both. Flip `active` to
 * false to pull it off the home page without touching any JSX, and edit the
 * copy here when the next model is announced.
 *
 * Keep the tagline to one short line. The tile carries the weight in type and
 * whitespace; a paragraph of marketing copy is what makes it stop reading as
 * a product announcement.
 */
export const UPCOMING_RELEASE = {
  active: true,

  eyebrow: 'Coming soon',
  name: 'iPhone 18',
  tagline: 'Be first in line when it lands at TechieBase.',
  /** Deliberately vague — Apple has not dated it, so neither do we. */
  window: 'Expected late 2026',

  /** Remembers a signup across visits so returning shoppers see the confirmed state. */
  storageKey: 'techiebase:waitlist:iphone-18',

  /** Same line the navbar dials — signups reach a real inbox until the API exists. */
  whatsappNumber: '2348143270982',
} as const;
