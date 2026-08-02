export const formatNaira = (priceInUSD: number): string => {
  // Multiply by 1500 for realistic Naira value
  const nairaValue = priceInUSD * 1500;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(nairaValue);
};
