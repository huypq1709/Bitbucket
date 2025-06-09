export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('vi-VN').format(date);
};
export const formatPercent = (num: number): string => {
  return `${(num * 100).toFixed(2)}%`;
};
export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(num);
};