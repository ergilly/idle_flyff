import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { EquipmentItemSquares } from '../../molecules/Equipment/EquipmentItemSquares.js'
import { ModelViewer } from '../../molecules/Equipment/ModelViewer.js'

export function EquipmentView({
  selectedItem,
  setSelectedItem,
  setSelectedItemSlot,
}) {
  const equipment = useSelector((state) => state?.equipment)
  const sex = useSelector((state) => state?.sex)

  const [modelViewerSource, setModelViewerSource] = useState(
    sex === 'male'
      ? 'https://www.flyffmodelviewer.com/wp-content/uploads/FlyffCSViewer.html?gender=Female&face=Face&hair=Hair&helmet=%20%20None&torso=Body&hands=Hands&feet=Feet&cloak=None&mask=%20%20None&leftwepclass=Weapon%20Category&leftwep=None&rightwepclass=Weapon%20Category&rightwep=None'
      : 'https://www.flyffmodelviewer.com/wp-content/uploads/FlyffCSViewer.html?gender=Male&face=Face&hair=Hair&helmet=%20%20None&torso=Body&hands=Hands&feet=Feet&cloak=None&mask=%20%20None&leftwepclass=Weapon%20Category&leftwep=None&rightwepclass=Weapon%20Category&rightwep=None',
  )
  const equipmentSlots = [
    {
      item: equipment.mainhand,
      size: 8,
      slot: 'mainhand',
    },
    {
      item: equipment.offhand,
      size: 8,
      slot: 'offhand',
    },
    {
      item: equipment.ammo,
      size: 8,
      slot: 'ammo',
    },
    {
      item: equipment.cloak,
      size: 8,
      slot: 'cloak',
    },
    {
      item: equipment.mask,
      size: 8,
      slot: 'mask',
    },
    {
      item: equipment.ringL,
      size: 6,
      slot: 'ringL',
    },
    {
      item: equipment.earringL,
      size: 6,
      slot: 'earringL',
    },
    {
      item: equipment.necklace,
      size: 6,
      slot: 'necklace',
    },
    {
      item: equipment.earringR,
      size: 6,
      slot: 'earringR',
    },
    {
      item: equipment.ringR,
      size: 6,
      slot: 'ringR',
    },
    {
      item: equipment.hatF,
      size: 6,
      slot: 'hatF',
    },
    {
      item: equipment.suitF,
      size: 6,
      slot: 'suitF',
    },
    {
      item: equipment.gauntletF,
      size: 6,
      slot: 'gauntletF',
    },
    {
      item: equipment.bootsF,
      size: 6,
      slot: 'bootsF',
    },
    {
      item: equipment.helmet,
      size: 8,
      slot: 'helmet',
    },
    {
      item: equipment.suit,
      size: 8,
      slot: 'suit',
    },
    {
      item: equipment.gauntlet,
      size: 8,
      slot: 'gauntlet',
    },
    {
      item: equipment.boots,
      size: 8,
      slot: 'boots',
    },
    {
      item: equipment.mount,
      size: 8,
      slot: 'mount',
    },
  ]

  return (
    <div className="container flex flex-col justify-between min-w-min w-auto h-min m-2 border rounded-xl px-4 py-2 bg-gray-800">
      <div className="text-white text-center text-lg font-bold">Equipment</div>
      <div className="flex self-center">
        {equipmentSlots.slice(5, 10).map((slot) => (
          <EquipmentItemSquares
            key={slot.slot}
            item={slot.item}
            size={slot.size}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            slot={slot.slot}
            setSelectedItemSlot={setSelectedItemSlot}
          />
        ))}
      </div>
      <div className="flex justify-between items-between">
        <div>
          {equipmentSlots.slice(0, 5).map((slot) => (
            <EquipmentItemSquares
              key={slot.slot}
              item={slot.item}
              size={slot.size}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              slot={slot.slot}
              setSelectedItemSlot={setSelectedItemSlot}
            />
          ))}
        </div>
        <ModelViewer
          modelViewerSource={modelViewerSource}
          setModelViewerSource={setModelViewerSource}
        />
        <div>
          {equipmentSlots.slice(14).map((slot) => (
            <EquipmentItemSquares
              key={slot.slot}
              item={slot.item}
              size={slot.size}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              slot={slot.slot}
              setSelectedItemSlot={setSelectedItemSlot}
            />
          ))}
        </div>
      </div>
      <div className="flex self-center">
        {equipmentSlots.slice(10, 14).map((slot) => (
          <EquipmentItemSquares
            key={slot.slot}
            item={slot.item}
            size={slot.size}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            slot={slot.slot}
            setSelectedItemSlot={setSelectedItemSlot}
          />
        ))}
      </div>
    </div>
  )
}
