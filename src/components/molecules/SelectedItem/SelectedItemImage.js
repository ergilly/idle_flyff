import React from 'react'
import { ItemImage } from '../../atoms/ItemImage'

export function SelectedItemImage({ item }) {
  return (
    <div className="flex relative bg-gray-600 justify-center items-center border-0 rounded-lg m-1 w-24 h-24">
      <ItemImage item={item} classNames="h-16 w-16" />
      {item.stack > 1 && (
        <span className="absolute top-20 bg-gray-500 text-gray-100 font-bold rounded-full h-5 px-2.5 text-sm">
          {item.count}
        </span>
      )}
    </div>
  )
}
