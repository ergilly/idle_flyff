import React from 'react'
import { ItemImage } from '../../atoms/ItemImage'

export function EquipmentItemSquares({
  item,
  size,
  selectedItem,
  setSelectedItem,
}) {
  const selectItem = (item, selectedItem) => {
    if (item === selectedItem) {
      setSelectedItem({})
    } else {
      setSelectedItem(item)
    }
  }

  if (item === undefined) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center box-content h-${size} w-${size} p-2 my-4 border-2 border-white rounded-lg bg-gray-700`}
        onClick={() => setSelectedItem({})}
      />
    )
  }
  return (
    <div
      className={`relative flex flex-col items-center justify-center box-content h-${size} w-${size} p-2 my-4 border-2 border-white rounded-lg bg-gray-700`}
      onClick={() => selectItem(item, selectedItem)}
    >
      <ItemImage item={item} classNames={`h-${size} w-${size}`} />
    </div>
  )
}
