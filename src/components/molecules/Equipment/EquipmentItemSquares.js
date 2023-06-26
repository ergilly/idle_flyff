import React from 'react'
import { ItemImage } from '../../atoms/ItemImage'

export function EquipmentItemSquares({
  item,
  size,
  selectedItem,
  setSelectedItem,
  slot,
  setSelectedItemSlot,
}) {
  const selectItem = (item, selectedItem, slot) => {
    console.log(item)
    setSelectedItem(item === selectedItem ? null : item)
    setSelectedItemSlot(slot)
  }

  const handleClick = () => {
    if (selectedItem !== undefined) {
      selectItem(item, selectedItem, slot)
    }
  }

  const isItemSelected = item === selectedItem

  return (
    <div
      className={`equipment-item-squares relative flex flex-col items-center justify-center box-content h-${size} w-${size} p-2 my-2 border-2 border-white rounded-lg bg-gray-700`}
      onClick={handleClick}
    >
      {item && (
        <ItemImage item={item} classNames={`item-image h-${size} w-${size}`} />
      )}
      {isItemSelected && <div className="selected-overlay" />}
    </div>
  )
}
