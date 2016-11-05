import accounting from 'accounting';

export function formatNumber(number, currency, precision = 2) {
  return accounting.formatMoney(number, {symbol: currency, format: '%s %v', precision});
}

