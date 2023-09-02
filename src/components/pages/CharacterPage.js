import React, { useContext, useState } from 'react'
import { CharContext } from '../../context/characterContext'
import { EquipmentView } from '../organisms/Character/EquipmentView'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView'
import { StatsView } from '../organisms/Character/StatsView'

export function CharacterPage() {
  const { equipment } = useContext(CharContext)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemSlot, setSelectedItemSlot] = useState(null)

  return (
    <div className="w-full p-8">
      <div className="flex">
        <EquipmentView
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
