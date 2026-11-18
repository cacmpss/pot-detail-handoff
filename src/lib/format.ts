/** Formats a money value for display. Components receive numbers and format them here. */
export function formatMoney(value: number, { currency = 'EUR', locale = 'en-GB', fractionDigits = 0 } = {}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}
