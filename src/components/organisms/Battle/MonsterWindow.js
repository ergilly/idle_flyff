import React, { useState, useEffect } from 'react'
import { BattleBars } from '../../molecules/Battle/BattleBars.js'
import { MonsterInfo } from '../../molecules/Battle/MonsterWindow/MonsterInfo.js'
import { AttkInterval } from '../../molecules/Battle/AttkInterval.js'

export function MonsterWindow({
  characterData,
  monsterData,
  monsterCurrentHp,
  setMonsterCurrentHp,
  playerCurrentHp,
  setPlayerCurrentHp,
  combatRunning,
  setCombatRunning,
  damageCalculator,
}) {
  const [attackRotation, setAttackRotation] = useState(0)

  useEffect(() => {
    let isMounted = true
    const setDynamicStats = async () => {
      if (isMounted && monsterData) {
        await setMonsterCurrentHp(monsterData.hp)
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

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const calculateDamage = async () => {
    const attack = getRandomInt(
      monsterData.attacks[attackRotation].minAttack,
      monsterData.attacks[attackRotation].maxAttack,
    )
    if (playerCurrentHp - attack >= 0) {
      setPlayerCurrentHp(playerCurrentHp - attack)
    } else {
      setPlayerCurrentHp(0)
    }
    // if (monsterCurrentHp === monsterData.hp) {
    //   setMonsterCurrentHp(monsterCurrentHp - 1)
    // } else {
    //   setMonsterCurrentHp(monsterData.hp)
    // }
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div
      id="MonsterWindow"
      className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-red-400 bg-gray-800"
    >
      <div className="flex flex-col w-full">
        <div className="flex">
          <div className="flex flex-col min-w-min w-1/2">
            <BattleBars
              target="monster"
              maxHp={numberWithCommas(monsterData.hp)}
              currentHp={numberWithCommas(monsterCurrentHp)}
            />
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
