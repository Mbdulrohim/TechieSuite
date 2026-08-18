/**
 * Display name per category id.
 *
 * Pulled out of CategoryPills so the prerender step's page titles can use the
 * exact same label a shopper sees on the pill — otherwise a title tag reading
 * "Creator Gear" while the pill says something else is the kind of drift that
 * only shows up when someone compares a search result to the page it opens.
 */
export const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  iphone: 'iPhone',
  mac: 'Mac',
  ipad: 'iPad',
  watch: 'Watch',
  airpods: 'AirPods',
  samsung: 'Samsung',
  gaming: 'Gaming',
  laptops: 'Laptops',
  audio: 'Audio',
  power: 'Power',
  accessories: 'Accessories',
  gear: 'Creator Gear',
  'pre-owned': 'Pre-Owned',
  anker: 'Anker',
  deals: 'Deals',
};
