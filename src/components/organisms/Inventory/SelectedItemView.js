import React from 'react'
import { SelectedItemImage } from '../../molecules/SelectedItem/SelectedItemImage.js'
import { SelectedItemDescription } from '../../molecules/SelectedItem/SelectedItemDescription.js'
import { SelectedItemSell } from '../../molecules/SelectedItem/SelectedItemSell.js'
import { SelectedItemUpgrade } from '../../molecules/SelectedItem/SelectedItemUpgrade.js'
import { SelectedItemEquip } from '../../molecules/SelectedItem/SelectedItemEquip.js'

export function SelectedItemView({ item, slot, equipped }) {
  return (
    <div className="container min-w-min max-w-lg h-128 m-0.5 py-4 px-4 bg-gray-800">
      {!item ? (
        <div className="text-center rounded-md bg-gray-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm">
          No item selected.
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <SelectedItemImage item={item} />
            <SelectedItemDescription item={item} />
          </div>
          <SelectedItemEquip item={item} equipped={equipped} slot={slot} />
          <SelectedItemUpgrade item={item} />
          <SelectedItemSell item={item} equipped={equipped} />
        </>
      )}
    </div>
  )
}
