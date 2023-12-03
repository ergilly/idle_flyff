import React from 'react'
import { useSelector } from 'react-redux'
import { ItemImage } from '../../atoms/ItemImage.js'
import { Utils } from '../../../utils/calc/utils.js'
import { addItemToInventory } from '../../../utils/inventoryManagement.js'

export function BattleMap() {
  const characterData = useSelector((state) => state)
  const addItem = async (id) => {
    const item = await Utils.getItemById(id)
    item.count = 1
    await addItemToInventory(characterData, item)
  }

  if (!characterData) {
    return (
      <div
        id="PlayerWindow"
        className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-green-400 bg-gray-800"
      >
        Loading ...
      </div>
    )
  }

  return (
    <div
      id="Collapsable Map"
      className="flex justify-center items-center mx-2 mb-2 p-2 w-auto border-t-4 flex rounded-tl-md rounded-tr-md border-blue-400 bg-gray-800 text-white text-center text-lg font-bold"
      onClick={() => addItem('3352')}
    >
      <ItemImage item="map.png" classNames="item-image mx-2 h-10 w-10" icon />
      <span>Expand Map</span>
    </div>
  )
}
