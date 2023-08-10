import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ItemImage } from '../../../atoms/ItemImage.js'

export function Consumables({ hpFood, fpFood, mpFood }) {
  function useFood(food) {
    console.log(food)
  }
  console.log(hpFood)

  const renderItemCount = (item) => {
    console.log(item)
    if (item?.stack > 1) {
      return (
        <span className="absolute top-10 bg-gray-500 text-gray-100 font-bold hidden rounded-full h-5 px-2.5 text-sm md:inline-block">
          {item.count}
        </span>
      )
    }
    return null
  }

  return (
    <div
      id="Consumables"
      className="container flex min-w-min w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
    >
      <div className="text-white text-center text-lg font-bold w-full">
        Consumables
        <div className="flex w-full justify-between">
          <div className="flex">
            <div
              className="equipment-item-squares relative flex flex-col items-center justify-center box-content h-10 w-10 p-2 my-2 border-2 border-white rounded-l-lg bg-gray-700"
              onClick={useFood}
            >
              {hpFood.length > 0 && (
                <>
                  <ItemImage
                    item={hpFood[0]}
                    classNames="item-image h-10 w-10"
                  />
                  {renderItemCount(hpFood[0])}
                </>
              )}
            </div>
            <div className="equipment-item-squares relative flex flex-col items-center justify-center box-content h-10 w-4 py-2 my-2 border-t-2 border-r-2 border-b-2 border-white rounded-r-lg bg-gray-700">
              <ChevronDownIcon />
            </div>
          </div>
          <div className="flex">
            <div
              className="equipment-item-squares relative flex flex-col items-center justify-center box-content h-10 w-10 p-2 my-2 border-2 border-white rounded-l-lg bg-gray-700"
              onClick={useFood}
            >
              {fpFood.length > 0 && (
                <>
                  <ItemImage
                    item={fpFood[0]}
                    classNames="item-image h-10 w-10"
                  />
                  {renderItemCount(fpFood[0])}
                </>
              )}
            </div>
            <div className="equipment-item-squares relative flex flex-col items-center justify-center box-content h-10 w-4 py-2 my-2 border-t-2 border-r-2 border-b-2 border-white rounded-r-lg bg-gray-700">
              <ChevronDownIcon />
            </div>
          </div>
          <div className="flex">
            <div
              className="equipment-item-squares relative flex flex-col items-center justify-center box-content h-10 w-10 p-2 my-2 border-2 border-white rounded-l-lg bg-gray-700"
              onClick={useFood[0]}
            >
              {mpFood.length > 0 && (
                <>
                  <ItemImage
                    item={mpFood[0]}
                    classNames="item-image h-10 w-10"
                  />
                  {renderItemCount(mpFood[0])}
                </>
              )}
            </div>
            <div className="equipment-item-squares relative flex flex-col items-center justify-center box-content h-10 w-4 py-2 my-2 border-t-2 border-r-2 border-b-2 border-white rounded-r-lg bg-gray-700">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
