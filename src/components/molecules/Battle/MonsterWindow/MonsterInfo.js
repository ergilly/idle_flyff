import React from 'react'
import { ItemImage } from '../../../atoms/ItemImage.js'
import { MonsterImage } from '../../../atoms/Battle/MonsterImage.js'
import { ElementImage } from '../../../atoms/Battle/ElementImage.js'

export function MonsterInfo({ monsterData }) {
  return (
    <div
      id="Monster Info"
      className="container flex flex-col text-white font-bold w-auto h-min m-2 border rounded-xl p-4 bg-gray-800"
    >
      <div className="text-start text-md w-full">Flaris</div>
      <div className="flex">
        <div className="flex w-1/3 h-max">
          <div className="flex flex-col text-start text-md">
            <div className="flex w-max justify-between">
              <div className="flex flex-col items-center">
                STR<div className="px-2 text-cyan-300">{monsterData.str}</div>
              </div>
              <div className="flex flex-col items-center">
                STA<div className="px-2 text-cyan-300">{monsterData.sta}</div>
              </div>
              <div className="flex flex-col items-center">
                DEX<div className="px-2 text-cyan-300">{monsterData.dex}</div>
              </div>
              <div className="flex flex-col items-center">
                INT<div className="px-2 text-cyan-300">{monsterData.int}</div>
              </div>
            </div>
            <div className="flex items-center">
              {/* <ItemImage
                item={{
                  id: 3497,
                  icon: 'weaswowooden.png',
                  name: 'Wooden Sword',
                }}
                classNames="item-image h-6 w-6"
              /> */}
              Attack:
              <div className="px-2 text-cyan-300">
                {monsterData.minAttack} ~ {monsterData.maxAttack}
              </div>
            </div>
            <div className="flex items-center">
              Defense:
              <div className="px-2 text-cyan-300">{monsterData.defense}</div>
            </div>
            <div className="flex items-center">
              Speed:
              <div className="px-2 text-cyan-300">{monsterData.speed}</div>
            </div>
            <div className="flex items-center">Exp?</div>
            <div className="flex items-center">
              Parry:
              <div className="px-2 text-cyan-300">{monsterData.parry}</div>
            </div>
            <div className="flex items-center">QuestItem?</div>
          </div>
        </div>
        <div className="flex justify-center items-center text-white text-lg font-bold w-2/3">
          <div className="flex flex-col">
            <div className="flex">
              <ElementImage element={monsterData.element} classNames="px-2" />
              {monsterData.name.en} (Lvl {monsterData.level})
            </div>
            <div className="relative flex justify-center items-center w-40 h-40 left-1/2 transform -translate-x-1/2">
              <MonsterImage
                monsterData={monsterData}
                classNames="w-min h-min"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
