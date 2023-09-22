import React, { useState, useEffect } from 'react'
import { BattleBars } from '../../molecules/Battle/BattleBars.js'
import { MonsterInfo } from '../../molecules/Battle/MonsterWindow/MonsterInfo.js'
import { AttkInterval } from '../../molecules/Battle/AttkInterval.js'

export function MonsterWindow({
  monsterData,
  combatRunning,
  setCombatRunning,
  damageCalculator,
}) {
  const [currentHp, setCurrentHp] = useState(0)

  console.log(monsterData)
  useEffect(() => {
    let isMounted = true
    const setDynamicStats = async () => {
      if (isMounted) {
        await setCurrentHp(monsterData.hp)
      }
    }

    setDynamicStats()
    return () => {
      isMounted = false
    }
  }, [monsterData])

  if (!monsterData) {
    return (
      <div
        id="MonsterWindow"
        className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-red-400 bg-gray-800"
      >
        Loading ...
      </div>
    )
  }

  const calculateDamage = async () => {
    if (currentHp === monsterData.hp) {
      setCurrentHp(currentHp - 1)
    } else {
      setCurrentHp(monsterData.hp)
    }
  }

  return (
    <div
      id="MonsterWindow"
      className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-red-400 bg-gray-800"
    >
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="flex flex-col min-w-min w-1/2">
            <BattleBars maxHp={monsterData.hp} currentHp={currentHp} />
          </div>
          <div className="flex flex-col min-w-min w-1/2">
            <AttkInterval
              calculateDamage={calculateDamage}
              hitsPerSecond={monsterData.attackDelay}
              combatRunning={combatRunning}
              setCombatRunning={setCombatRunning}
            />
          </div>
        </div>
        {monsterData && <MonsterInfo monsterData={monsterData} />}
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
