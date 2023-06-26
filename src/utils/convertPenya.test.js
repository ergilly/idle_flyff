import { formatNumber } from './convertPenya'

describe('formatNumber', () => {
  test('should format large numbers with abbreviations', () => {
    expect(formatNumber(1500000000)).toEqual('1.5B')
    expect(formatNumber(2500000)).toEqual('2.5M')
    expect(formatNumber(5000)).toEqual('5.0K')
  })

  test('should format small numbers without abbreviations', () => {
    expect(formatNumber(100)).toEqual('100')
    expect(formatNumber(-250)).toEqual('-250')
    expect(formatNumber(0)).toEqual('0')
  })
})
