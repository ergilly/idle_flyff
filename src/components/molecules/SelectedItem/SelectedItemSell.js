import React, { useState } from 'react'
import { ItemAmountSlider } from '../../atoms/SelectedItemSell/ItemAmountSlider'

export function SelectedItemSell({ item, equipped }) {
  const [value, setValue] = useState(1)

  const handleInputChange = (event) => {
    let inputValue = event.target.value
    if (inputValue === '') {
      setValue(1)
    } else {
      const parsedValue = parseInt(inputValue, 10)
      if (!Number.isNaN(parsedValue)) {
        inputValue = Math.max(1, Math.min(parsedValue, item.count))
        setValue(inputValue)
      }
    }
  }

  const handleAll = () => {
    setValue(item.count)
  }

  const handleAllBut1 = () => {
    setValue(item.count - 1)
  }

  if (equipped) {
    return null
  }

  return (
    <div className="flex flex-col m-1 p-4 bg-gray-600 border-0 rounded-lg">
      <span className="text-white text-lg font-bold">Sell Item</span>
      <ItemAmountSlider
        itemCount={item.count}
        value={value}
        setValue={setValue}
      />
      <div className="flex">
        <input
          type="number"
          min="1"
          max={item.count}
          value={value}
          onChange={handleInputChange}
          className="w-16 px-2 py-1 text-center text-white border bg-gray-700 border-gray-300 rounded input-field"
        />
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleAllBut1}
        >
          All but 1
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={handleAll}
        >
          All
        </button>
        <button
          type="button"
          className="rounded-md bg-rose-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          Sell item
        </button>
      </div>
    </div>
  )
}
