export function formatNumber(number) {
  const abbreviations = {
    K: 1000,
    M: 1000000,
    B: 1000000000,
    T: 1000000000000,
  }

  Object.keys(abbreviations).forEach((key) => {
    if (Math.abs(number) >= abbreviations[key]) {
      return (number / abbreviations[key]).toFixed(1) + key
    }
    return abbreviations[key]
  })

  return number.toString()
}
