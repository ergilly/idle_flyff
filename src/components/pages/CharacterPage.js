import React, { useState } from 'react'
import { EquipmentView } from '../organisms/Character/EquipmentView.js'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView.js'
import { StatsView } from '../organisms/Character/StatsView.js'

export function CharacterPage() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemSlot, setSelectedItemSlot] = useState(null)

  return (
    <div className="w-full p-8">
      <div className="flex">
        <EquipmentView
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setSelectedItemSlot={setSelectedItemSlot}
        />
        <SelectedItemView
          item={selectedItem}
          slot={selectedItemSlot}
          equipped
        />
      </div>
      <div className="flex">
        <StatsView />
      </div>
    </div>
  )
}
