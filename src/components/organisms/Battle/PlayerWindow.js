import React, { useContext, useState, useEffect } from 'react'
import { EquipmentView } from '../Character/EquipmentView.js'
import { CharContext } from '../../../context/characterContext.js'
import { BattleBars } from '../../molecules/Battle/BattleBars.js'
import { AttkInterval } from '../../molecules/Battle/AttkInterval.js'
import { MenuSelect } from '../../molecules/Battle/PlayerWindow/MenuSelect.js'
import { Consumables } from '../../molecules/Battle/PlayerWindow/Consumables.js'
import { Stats } from '../../molecules/Battle/PlayerWindow/Stats.js'

export function PlayerWindow({
  characterData,
  combatRunning,
  setCombatRunning,
  damageCalculator,
}) {
  const { equipment } = useContext(CharContext)
  const [playerMenu, setPlayerMenu] = useState('equipment')
  const [currentHp, setCurrentHp] = useState(0)
  const [currentFp, setCurrentFp] = useState(0)
  const [currentMp, setCurrentMp] = useState(0)
  const [hitsPerSecond, setHitsPerSecond] = useState(0)

  console.log(characterData)
  useEffect(() => {
    let isMounted = true
    const setDynamicStats = async () => {
      if (isMounted) {
        await Promise.all([
          setCurrentHp(characterData.health),
          setCurrentFp(characterData.fp),
          setCurrentMp(characterData.mp),
          setHitsPerSecond(characterData.constants.hps * characterData.aspd),
        ])
      }
    }
    setDynamicStats()
    return () => {
      isMounted = false
    }
  }, [characterData])

  if (!characterData) {
    return (
      <div
        id="PlayerWindow"
        className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-green-400 bg-gray-800"
      >
        Loading ...
      </div>
    )
  }

  const calculateDamage = async () => {
    console.log(damageCalculator.computeAttack())
    if (currentHp === characterData.health) {
      setCurrentHp(currentHp - 1)
    } else {
      setCurrentHp(characterData.health)
    }
  }

  return (
    <div
      id="PlayerWindow"
      className="min-w-min mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-green-400 bg-gray-800"
    >
      <div className="flex flex-col w-full min-w-min">
        <div className="flex">
          <div className="flex flex-col min-w-min w-1/2">
            <BattleBars
              target="player"
              maxHp={characterData.health}
              maxFp={characterData.fp}
              maxMp={characterData.mp}
              currentHp={currentHp}
              currentFp={currentFp}
              currentMp={currentMp}
            />
            <Consumables
              hpFood={equipment.hpFood}
              fpFood={equipment.fpFood}
              mpFood={equipment.mpFood}
            />
            <MenuSelect playerMenu={playerMenu} setPlayerMenu={setPlayerMenu} />
            <div id="View">
              {playerMenu === 'equipment' && (
                <EquipmentView equipment={equipment} />
              )}
              {playerMenu === 'skills' && <div id="Skills" />}
              {playerMenu === 'buffs' && <div id="Buffs" />}
              {playerMenu === 'consumables' && <div id="Consumables" />}
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <AttkInterval
              calculateDamage={calculateDamage}
              hitsPerSecond={hitsPerSecond}
              combatRunning={combatRunning}
              setCombatRunning={setCombatRunning}
            />
            <Stats characterData={characterData} />
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
