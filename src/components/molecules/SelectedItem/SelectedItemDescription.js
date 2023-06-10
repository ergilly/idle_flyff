import React from 'react'

export function SelectedItemDescription({ item }) {
  return (
    <div className="flex flex-col m-1 p-4 bg-gray-600 border-0 rounded-lg w-3/4 h-24">
      <span className="text-white text-lg font-bold">{item.name.en}</span>
      <span className="text-green-400">{item.description.en}</span>
    </div>
  )
}
