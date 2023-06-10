import React from 'react'

export function SortBanner() {
  return (
    <div className="m-0.5 h-16 border-t-4 flex items-center rounded-tl-md rounded-tr-md border-blue-400 bg-gray-800">
      <button
        type="button"
        className="rounded-md bg-indigo-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Sort items
      </button>
      <button
        type="button"
        className="rounded-md bg-gray-500 px-3 py-2  ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-400"
      >
        Move items to new Tab
      </button>
      <button
        type="button"
        className="rounded-md bg-rose-500 px-3 py-2  ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-rose-400"
      >
        Toggle Sell Mode
      </button>
    </div>
  )
}
