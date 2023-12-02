import React, { useContext, useState } from 'react'
import { CharContext } from '../../context/characterContext.js'
import { EquipmentView } from '../organisms/Character/EquipmentView.js'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView.js'
import { StatsView } from '../organisms/Character/StatsView.js'

export function CharacterPage() {
  const { equipment, sex } = useContext(CharContext)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemSlot, setSelectedItemSlot] = useState(null)

  return (
    <div className="w-full p-8">
      <div className="flex">
        <EquipmentView
          sex={sex}
          equipment={equipment}
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
