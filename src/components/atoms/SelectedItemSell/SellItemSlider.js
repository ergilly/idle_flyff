import React from 'react'

export function SellItemSlider({ itemCount, value, setValue }) {
  const handleSliderChange = (event) => {
    const sliderValue = parseInt(event.target.value, 10)
    setValue(sliderValue)
  }
  return (
    <div className="flex items-center">
      <span className="mr-4 text-white text-lg">{1}</span>
      <input
        type="range"
        min="1"
        max={itemCount}
        value={value}
        onChange={handleSliderChange}
        step="1"
        style={{ position: 'relative' }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="ml-4 text-white text-lg">{itemCount}</span>
    </div>
  )
}
