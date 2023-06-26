import React from 'react'

export function ItemAmountSlider({ itemCount, value, setValue }) {
  const handleSliderChange = (event) => {
    const sliderValue = parseInt(event.target.value, 10)
    if (!Number.isNaN(sliderValue)) {
      setValue(sliderValue)
    }
  }

  return (
    <div className="item-amount-slider flex items-center">
      <span className="amount-label text-white text-lg">{value}</span>
      <input
        type="range"
        min="1"
        max={itemCount}
        value={value}
        onChange={handleSliderChange}
        step="1"
        className="amount-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="item-count-label text-white text-lg">{itemCount}</span>
    </div>
  )
}
