import React from 'react'
import { SelectedItemImage } from '../../molecules/SelectedItem/SelectedItemImage'
import { SelectedItemDescription } from '../../molecules/SelectedItem/SelectedItemDescription'
import { SelectedItemSell } from '../../molecules/SelectedItem/SelectedItemSell'
import { SelectedItemUpgrade } from '../../molecules/SelectedItem/SelectedItemUpgrade'
import { SelectedItemEquip } from '../../molecules/SelectedItem/SelectedItemEquip'

export function SelectedItemView({ item, equipped }) {
  console.log(item)
  if (item.name === undefined) {
    return (
      <div className="container min-w-min max-w-lg h-128 m-0.5 py-4 px-4 bg-gray-800">
        <div className="text-center rounded-md bg-gray-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm">
          No item selected.
        </div>
      </div>
    )
  }
  return (
    <div className="container min-w-min max-w-lg h-128 m-0.5 py-4 px-4 bg-gray-800">
      <div className="flex justify-between">
        <SelectedItemImage item={item} />
        <SelectedItemDescription item={item} />
      </div>
      <SelectedItemEquip item={item} equipped={equipped} />
      <SelectedItemUpgrade item={item} />
      <SelectedItemSell item={item} equipped={equipped} />
    </div>
  )
}
