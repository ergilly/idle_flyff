import React, { useState, useRef, useEffect } from 'react'

export function ItemAmountSlider({ itemCount, value, setValue }) {
  const [sliderWidth, setSliderWidth] = useState(0)
  const [bubbleWidth, setBubbleWidth] = useState(0)
  const sliderRef = useRef(null)
  const bubbleRef = useRef(null)
  const min = 1

  useEffect(() => {
    setSliderWidth(sliderRef.current.offsetWidth)
    setBubbleWidth(bubbleRef.current.offsetWidth)
  }, [value])

  const getNewVal = () => {
    return Number(
      ((value - min) * (sliderWidth - bubbleWidth)) / (itemCount - min),
    )
  }

  const handleSliderChange = (event) => {
    const sliderValue = parseInt(event.target.value, 10)
    if (!Number.isNaN(sliderValue)) {
      setValue(sliderValue)
    }
  }

  return (
    <div className="relative bottom-5 flex flex-col w-full">
      <div>
        <div
          ref={bubbleRef}
          style={{ left: `${getNewVal()}px`, top: '23.5px' }}
          className="relative w-min px-1 py-0.5 bg-indigo-500 border-0 font-bold text-white text-md rounded-sm"
        >
          {value}
        </div>
      </div>
      <div className="item-amount-slider flex flex-col items-center w-full">
        <div className="flex justify-between w-full pb-2">
          <div>
            {value !== min && (
              <div className="px-0.5 py-0.5 bg-white border-0 rounded-md">
                <span className="amount-label text-black font-bold text-md px-0.5">
                  1
                </span>
              </div>
            )}
          </div>
          <div>
            {value !== itemCount && (
              <div className="px-0.5 py-0.5 bg-white border-0 rounded-md">
                <span className="item-count-label text-black font-bold text-md px-0.5">
                  {itemCount}
                </span>
              </div>
            )}
          </div>
        </div>
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={itemCount}
          value={value}
          onChange={handleSliderChange}
          step="1"
          className="amount-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
    </div>
  )
}
