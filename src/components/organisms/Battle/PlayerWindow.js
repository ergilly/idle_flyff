import React, { useContext, useState } from 'react'
import { EquipmentView } from '../Character/EquipmentView'
import { CharContext } from '../../../context/characterContext'

export function PlayerWindow() {
  const character = useContext(CharContext)
  const { equipment } = useContext(CharContext)
  const [playerMenu, setPlayerMenu] = useState('equipment')

  return (
    <div
      id="PlayerWindow"
      className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-green-400 bg-gray-800"
    >
      <div className="flex flex-col w-full">
        <div id="Bars" />
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <div id="HP bar" />
            <div
              id="Food"
              className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
            >
              <div className="text-white text-center text-lg font-bold w-full">
                Food
              </div>
            </div>
            <div
              id="Menu"
              className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
            >
              <div className="text-white text-center text-lg font-bold w-full">
                Menu
              </div>
            </div>
            <div id="View">
              {playerMenu === 'equipment' && (
                <EquipmentView equipment={equipment} />
              )}
              {playerMenu === 'skills' && <div id="Skills" />}
              {playerMenu === 'consumables' && <div id="Consumables" />}
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div id="Attack Interval Bar" />
            <div
              id="Stats"
              className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
            >
              <div className="text-white text-center text-lg font-bold w-full">
                Stats
              </div>
            </div>
            <div
              id="Quest"
              className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
            >
              <div className="text-white text-center text-lg font-bold w-full">
                Quest
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
