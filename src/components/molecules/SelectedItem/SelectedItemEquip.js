import React, { useContext } from 'react'
import {
  addItemToEquipment,
  replaceEquippedItem,
  removeItemFromInventory,
  removeItemFromEquipment,
  addItemToInventory,
} from '../../../utils/inventoryManagement'
import { CharContext } from '../../../context/characterContext'

const equipable = [
  'weapon',
  'armor',
  'fashion',
  'jewelry',
  'flying',
  'collector',
  'arrow',
]

export function SelectedItemEquip({ item, equipped, slot }) {
  const { character, equipment } = useContext(CharContext)

  function equipItem() {
    if (equipment[slot]) {
      replaceEquippedItem(character, item, slot)
    } else {
      addItemToEquipment(character, item, slot)
    }
    removeItemFromInventory(character, item, 1)
  }

  function unequipItem() {
    addItemToInventory(character, item, slot)
    removeItemFromEquipment(character, item)
  }

  if (!equipable.includes(item.category)) {
    return null
  }

  if (equipped === true) {
    return (
      <div className="flex justify-between m-1 p-4 bg-gray-600 border-0 rounded-lg h-16">
        <span className="text-white text-lg font-bold">Unequip Item</span>
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={unequipItem}
        >
          Unequip Item
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-between m-1 p-4 bg-gray-600 border-0 rounded-lg h-16">
      <span className="text-white text-lg font-bold">Equip Item</span>
      <button
        type="button"
        className="rounded-md bg-indigo-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={equipItem}
      >
        Equip Item
      </button>
    </div>
  )
}
