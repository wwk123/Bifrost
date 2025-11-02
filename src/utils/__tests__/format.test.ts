import { formatCurrency, formatPercent, formatCompactNumber } from '@/utils/format';

describe('format helpers', () => {
  it('正确格式化美元金额', () => {
    expect(formatCurrency(15234)).toMatch(/(US\$|\$)15,234/);
    expect(formatCurrency(12.5)).toMatch(/(US\$|\$)12\.50/);
  });

  it('正确格式化百分比', () => {
    expect(formatPercent(25)).toBe('25%');
    expect(formatPercent(6.5)).toBe('6.5%');
  });

  it('正确压缩数字展示', () => {
    const result = formatCompactNumber(12500);
    expect(result).toMatch(/[0-9.]+(K|千|万)/i);
  });
});
