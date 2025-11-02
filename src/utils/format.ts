export function formatCurrency(value: number) {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
    minimumFractionDigits: value >= 1000 ? 0 : 2
  });
  return formatter.format(value);
}

export function formatCompactNumber(value: number) {
  const formatter = new Intl.NumberFormat('zh-CN', {
    notation: 'compact',
    maximumFractionDigits: 1
  });
  return formatter.format(value);
}

export function formatPercent(value: number) {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 0
  });
  return formatter.format(value / 100);
}
