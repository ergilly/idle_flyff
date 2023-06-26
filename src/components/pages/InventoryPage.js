import React, { useContext, useState } from 'react'
import { CharContext } from '../../context/characterContext'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView'
import { InventoryView } from '../organisms/Inventory/InventoryView'
import { SortBanner } from '../organisms/Inventory/SortBanner'

export function InventoryPage() {
  const { inventory } = useContext(CharContext)
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
