import React, { useState } from 'react'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView.js'
import { InventoryView } from '../organisms/Inventory/InventoryView.js'
import { SortBanner } from '../organisms/Inventory/SortBanner.js'

export function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="w-full p-8">
      <SortBanner />
      <div className="flex">
        <InventoryView
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SelectedItemView item={selectedItem} equipped={false} />
      </div>
    </div>
  )
}
