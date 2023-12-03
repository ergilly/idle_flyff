import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { useSelector } from 'react-redux'
import { ItemImage } from '../../atoms/ItemImage.js'
import { formatNumber } from '../../../utils/convertPenya.js'

export function InventoryView({ selectedItem, setSelectedItem }) {
  const inventory = useSelector((state) => state?.inventory)
  const [items, setItems] = useState(inventory.tab1)
  const [slots, setSlots] = useState(50)

  const calculateInventoryValue = (inventoryTabs) => {
    let inventoryValue = 0
    Object.values(inventoryTabs).forEach((itemsArray) => {
      itemsArray.forEach((item) => {
        inventoryValue += item.sellPrice * item.count
      })
    })
    return formatNumber(inventoryValue)
  }

  const calculateTabValue = (items) => {
    let tabValue = 0
    items.forEach((item) => {
      tabValue += item.sellPrice * item.count
    })
    return formatNumber(tabValue)
  }

  const renderItemCount = (item) => {
    if (item.stack > 1) {
      return (
        <span className="absolute top-12 bg-gray-500 text-gray-100 font-bold hidden rounded-full h-5 px-2.5 text-sm md:inline-block">
          {item.count}
        </span>
      )
    }
    return null
  }

  const selectItem = (item) => {
    if (item === selectedItem) {
      setSelectedItem(null)
    } else {
      setSelectedItem(item)
    }
  }

  const renderItem = (item, index) => {
    return (
      <div
        key={item.id} // Use a unique identifier as the key
        className="relative flex flex-col items-center justify-center box-content h-12 w-12 p-1 border-2 border-white cursor-pointer rounded-lg bg-gray-700"
        onClick={() => selectItem(item)}
      >
        <ItemImage item={item} classNames="h-8 w-8" />
        {renderItemCount(item)}
      </div>
    )
  }

  return (
    <div className="container max-w-none h-min m-0.5 bg-gray-800">
      <div className="bg-gray-600 h-12">Tabs</div>
      <div className="bg-gray-700 flex items-center justify-around h-8 text-white">
        <span>
          <b>Space:</b> {items.length}/{slots}
        </span>
        <span className="flex items-center">
          <b>Inventory:</b>{' '}
          <img
            className="m-1 h-4 w-4"
            src="https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2FItm_SysSysScrPerin.png?alt=media&token=c6826842-9868-4255-9dd0-839af67ab336&_gl=1*1ezrnmp*_ga*MTY1ODg3MTI0Mi4xNjgzMzMyNTA1*_ga_CW55HF8NVT*MTY4NTYyNzYyOS4zOS4xLjE2ODU2Mjc2NDQuMC4wLjA."
            alt="perinImage"
          />{' '}
          {calculateInventoryValue(inventory)}
        </span>
        <span className="flex items-center">
          <b>Tab:</b>{' '}
          <img
            className="m-1 h-4 w-4"
            src="https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2FItm_SysSysScrPerin.png?alt=media&token=c6826842-9868-4255-9dd0-839af67ab336&_gl=1*1ezrnmp*_ga*MTY1ODg3MTI0Mi4xNjgzMzMyNTA1*_ga_CW55HF8NVT*MTY4NTYyNzYyOS4zOS4xLjE2ODU2Mjc2NDQuMC4wLjA."
            alt="perinImage"
          />{' '}
          {calculateTabValue(items)}
        </span>
      </div>
      <ReactSortable
        list={items}
        setList={setItems}
        className="m-4 flex flex-wrap gap-4"
      >
        {items.map(renderItem)}
      </ReactSortable>
    </div>
  )
}
