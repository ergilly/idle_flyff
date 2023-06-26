import React from 'react'

export function SortBanner() {
  const buttonStyles = {
    base: 'rounded-md px-3 py-2 ml-2.5 text-sm font-bold shadow-sm',
    primary:
      'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-400',
    tertiary: 'bg-rose-500 text-white hover:bg-rose-400',
  }

  return (
    <div className="m-0.5 h-16 border-t-4 flex items-center rounded-tl-md rounded-tr-md border-blue-400 bg-gray-800">
      <button
        type="button"
        className={`${buttonStyles.base} ${buttonStyles.primary}`}
      >
        Sort items
      </button>
      <button
        type="button"
        className={`${buttonStyles.base} ${buttonStyles.secondary}`}
      >
        Move items to new Tab
      </button>
      <button
        type="button"
        className={`${buttonStyles.base} ${buttonStyles.tertiary}`}
      >
        Toggle Sell Mode
      </button>
    </div>
  )
}
