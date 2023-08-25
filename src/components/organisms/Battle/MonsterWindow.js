import React, { useContext, useState, useEffect } from 'react'
import { getData } from '../../../firebase/firestore.js'
import { BattleBars } from '../../molecules/Battle/BattleBars.js'
import { MonsterInfo } from '../../molecules/Battle/MonsterWindow/MonsterInfo.js'
import { AttkInterval } from '../../molecules/Battle/AttkInterval.js'

export function MonsterWindow() {
  const [monster, setMonster] = useState(null)

  async function fetchMonster() {
    const { result, error } = await getData('monster', `5745`)
    if (error) {
      console.log(error)
      return
    }
    setMonster(result)
  }

  useEffect(() => {
    fetchMonster()
  }, [])
  // console.log(monster)

  return (
    <div
      id="MonsterWindow"
      className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-red-400 bg-gray-800"
    >
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="flex flex-col min-w-min w-1/2">
            <BattleBars maxHp={100} currentHp={80} />
          </div>
          <div className="flex flex-col min-w-min w-1/2">
            <AttkInterval />
          </div>
        </div>
        {monster && <MonsterInfo monster={monster} />}
        <div
          id="Monster Stats"
          className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
        >
          <div className="text-white text-center text-lg font-bold w-full">
            Monster Stats
          </div>
        </div>
        <div
          id="Loot"
          className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
        >
          <div className="text-white text-center text-lg font-bold w-full">
            Loot to Collect ( 0 / 100 )
          </div>
        </div>
      </div>
    </div>
  )
}
