import React from 'react'
import { ItemImage } from '../../../atoms/ItemImage.js'
import { MonsterImage } from '../../../atoms/Battle/MonsterImage.js'
import { ElementImage } from '../../../atoms/Battle/ElementImage.js'

export function MonsterInfo({ monster }) {
  return (
    <div
      id="Monster Info"
      className="container flex flex-col w-auto h-min m-2 border rounded-xl p-4 bg-gray-800"
    >
      <div className="text-white text-start text-md font-bold w-full">
        Flaris
      </div>
      <div className="flex justify-center items-center text-white text-lg font-bold w-full">
        <ElementImage element={monster.element} classNames="px-2" />
        <div>
          {monster.name.en} (Lvl {monster.level})
        </div>
      </div>
      <div className="flex w-full">
        <div className="absolute flex flex-col w-32 text-white text-start text-md">
          <div className="flex items-center">
            <ItemImage
              item={{
                id: 3497,
                icon: 'weaswowooden.png',
                name: 'Wooden Sword',
              }}
              classNames="item-image h-6 w-6"
            />
            <div className="p-2">
              {monster.minAttack} ~ {monster.maxAttack}
            </div>
          </div>
          <div>Def</div>
          <div>Stats?</div>
          <div>Speed</div>
          <div>Exp?</div>
          <div>Parry?</div>
          <div>QuestItem?</div>
        </div>
        <div className="relative flex justify-center items-center w-40 h-40 left-1/2 transform -translate-x-1/2">
          <MonsterImage monster={monster} classNames="w-min h-min" />
        </div>
      </div>
    </div>
  )
}
