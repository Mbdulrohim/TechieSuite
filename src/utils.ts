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
