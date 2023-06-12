import React, { useContext, useState } from 'react'
import { CharContext } from '../../context/characterContext'
import { EquipmentView } from '../organisms/Character/EquipmentView'
import { SelectedItemView } from '../organisms/Inventory/SelectedItemView'

export function CharacterPage() {
  const { equipment } = useContext(CharContext)
  const [selectedItem, setSelectedItem] = useState({})

  return (
    <div className="w-full p-8">
      <div className="flex">
        <EquipmentView
          equipment={equipment}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <SelectedItemView item={selectedItem} equipped />
      </div>
    </div>
  )
}
