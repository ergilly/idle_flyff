import React, { useContext, useState } from 'react'
import { CharContext } from '../../context/characterContext.js'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView.js'
import { InventoryView } from '../organisms/Inventory/InventoryView.js'
import { SortBanner } from '../organisms/Inventory/SortBanner.js'

export function InventoryPage() {
  const {
    character: { inventory },
  } = useContext(CharContext)
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="w-full p-8">
      <SortBanner />
      <div className="flex">
        <InventoryView
          inventory={inventory}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SelectedItemView item={selectedItem} equipped={false} />
      </div>
    </div>
  )
}
