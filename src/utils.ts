const USD_TO_NGN_RATE = 1_500;

export const formatNaira = (cataloguePrice: number): string => {
  const nairaValue = cataloguePrice * USD_TO_NGN_RATE;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nairaValue);
};

/**
 * Sum of the price deltas for a configuration.
 *
 * Lives here rather than in each component because the cart drawer, the
 * checkout total and the product page each computed their own version of this
 * sum before, and a fourth surface would have invented a fifth.
 */
export const optionsDelta = (
  selectedOptions?: Record<string, { priceDelta: number }>
): number =>
  selectedOptions
    ? Object.values(selectedOptions).reduce((sum, choice) => sum + choice.priceDelta, 0)
    : 0;

/** What one unit of a configured line actually costs, before protection. */
export const configuredUnitPrice = (item: {
  product: { price: number };
  selectedStorage?: { priceDelta: number };
  selectedOptions?: Record<string, { priceDelta: number }>;
}): number =>
  item.product.price + (item.selectedStorage?.priceDelta ?? 0) + optionsDelta(item.selectedOptions);

/**
 * The photo a variant selection should show, or undefined if the driving
 * axis has none set for the current pick — callers fall back to
 * `product.imageUrl`, same as `ProductColor.image` always has.
 *
 * One shared function so "which axis drives the photo" is answered
 * identically everywhere a product renders — the quick-view modal, a cart
 * line, a bundle's main-product picker. Before this, each of those read
 * `selectedColor.image` directly, which was correct only because colour was
 * the only axis that could ever carry a photo; now that any option-group
 * choice can too, the branch belongs in one place, not three.
 */
export const variantImage = (
  product: { colors: { name: string; image?: string }[]; imageDrivenBy?: string },
  selection: {
    selectedColor?: { image?: string };
    selectedOptions?: Record<string, { image?: string }>;
  }
): string | undefined => {
  const drivenBy = product.imageDrivenBy ?? 'color';
  if (drivenBy === 'color') return selection.selectedColor?.image;
  return selection.selectedOptions?.[drivenBy]?.image;
};
