import accounting from 'accounting';

export function formatNumber(number, currency) {
  return accounting.formatMoney(number, {symbol: currency, format: '%s %v'});
}

