import accounting from 'accounting';

export function formatNumber(number, currency, precision = 2) {
  return accounting.formatMoney(number, {symbol: currency, format: '%s %v', precision});
}

export function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
