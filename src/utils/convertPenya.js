export function formatNumber(number) {
  const abbreviations = [
    { symbol: 'T', value: 1e12 },
    { symbol: 'B', value: 1e9 },
    { symbol: 'M', value: 1e6 },
    { symbol: 'K', value: 1e3 },
  ]

  const abbreviation = abbreviations.find(
    (abbr) => Math.abs(number) >= abbr.value,
  )

  if (abbreviation) {
    return (number / abbreviation.value).toFixed(1) + abbreviation.symbol
  }

  return number.toString()
}
