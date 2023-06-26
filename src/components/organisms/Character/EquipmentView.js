import React from 'react'
import { EquipmentItemSquares } from '../../molecules/Equipment/EquipmentItemSquares'

export function EquipmentView({
  equipment,
  selectedItem,
  setSelectedItem,
  setSelectedItemSlot,
}) {
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
      item: equipment.l_ring,
      size: 6,
      slot: 'l_ring',
    },
    {
      item: equipment.l_earring,
      size: 6,
      slot: 'l_earring',
    },
    {
      item: equipment.necklace,
      size: 6,
      slot: 'necklace',
    },
    {
      item: equipment.r_earring,
      size: 6,
      slot: 'r_earring',
    },
    {
      item: equipment.r_ring,
      size: 6,
      slot: 'r_ring',
    },
    {
      item: equipment.f_hat,
      size: 6,
      slot: 'f_hat',
    },
    {
      item: equipment.f_suit,
      size: 6,
      slot: 'f_suit',
    },
    {
      item: equipment.f_gloves,
      size: 6,
      slot: 'f_gloves',
    },
    {
      item: equipment.f_boots,
      size: 6,
      slot: 'f_boots',
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
      item: equipment.gloves,
      size: 8,
      slot: 'gloves',
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
    <div className="container flex flex-col justify-between w-auto h-min m-2 border rounded-xl px-4 py-2 bg-gray-800">
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
