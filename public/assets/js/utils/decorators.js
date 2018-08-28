/**
 * Format big number for prettier print
 * @param {number} value
 * @param {number} decimal
 * @return {string}
 */
function number(value, decimal) {
  const str = value.toString()
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  if (decimal && str.includes(',')) {
    const currentDecimal = str.split(',')[1].length;
    return str.padEnd(str.length + decimal - currentDecimal, '0');
  }

  return str;
}

export {
  number,
};
