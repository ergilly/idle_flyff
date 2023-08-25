import React from 'react'
import { ItemImage } from '../../atoms/ItemImage.js'

export function BattleMap() {
  return (
    <div
      id="Collapsable Map"
      className="flex justify-center items-center mx-2 mb-2 p-2 w-auto border-t-4 flex rounded-tl-md rounded-tr-md border-blue-400 bg-gray-800 text-white text-center text-lg font-bold"
    >
      <ItemImage item="map.png" classNames="item-image mx-2 h-10 w-10" icon />
      <span>Expand Map</span>
    </div>
  )
}
