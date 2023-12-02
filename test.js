function narcissistic(value) {
  // Code me to return true or false
  let calculatedValue = 0
  const array = []
  console.log(10 ** value.toString().length / 10)
  for (let i = 1; i <= 10 ** value.toString().length / 10; i *= 10) {
    array.push(i)
    calculatedValue += Math.floor(value / i) ** value.toString().length
  }
  console.log(array)
  return calculatedValue === value
}
narcissistic(153)
