import React from 'react'
import { ItemImage } from '../../../atoms/ItemImage'

export function MenuSelect({ playerMenu, setPlayerMenu }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      id="Menu"
      className="container flex min-w-min w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
    >
      <div className="text-white text-center text-lg font-bold w-full">
        Menu
        <div className="flex justify-between">
          <div
            className={classNames(
              playerMenu === 'equipment'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 hover:text-white hover:bg-gray-500',
              'equipment-item-squares relative flex flex-col items-center justify-center box-content h-8 w-8 p-2 my-2 border-2 border-white rounded-lg',
            )}
            onClick={() => setPlayerMenu('equipment')}
          >
            <ItemImage
              item="rpg-game.png"
              classNames="item-image h-8 w-8"
              icon
            />
          </div>
          <div
            className={classNames(
              playerMenu === 'skills'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 hover:text-white hover:bg-gray-500',
              'equipment-item-squares relative flex flex-col items-center justify-center box-content h-8 w-8 p-2 my-2 border-2 border-white rounded-lg',
            )}
            onClick={() => setPlayerMenu('skills')}
          >
            <ItemImage item="power.png" classNames="item-image h-8 w-8" icon />
          </div>
          <div
            className={classNames(
              playerMenu === 'buffs'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 hover:text-white hover:bg-gray-500',
              'equipment-item-squares relative flex flex-col items-center justify-center box-content h-8 w-8 p-2 my-2 border-2 border-white rounded-lg',
            )}
            onClick={() => setPlayerMenu('buffs')}
          >
            <ItemImage item="revive.png" classNames="item-image h-8 w-8" icon />
          </div>
          <div
            className={classNames(
              playerMenu === 'consumables'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-700 hover:text-white hover:bg-gray-500',
              'equipment-item-squares relative flex flex-col items-center justify-center box-content h-8 w-8 p-2 my-2 border-2 border-white rounded-lg',
            )}
            onClick={() => setPlayerMenu('consumables')}
          >
            <ItemImage item="potion.png" classNames="item-image h-8 w-8" icon />
          </div>
        </div>
      </div>
    </div>
  )
}
