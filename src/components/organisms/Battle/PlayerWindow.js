import React, { useContext, useState, useEffect } from 'react'
import { EquipmentView } from '../Character/EquipmentView.js'
import { CharContext } from '../../../context/characterContext.js'
import { BattleBars } from '../../molecules/Battle/BattleBars.js'
import { AttkInterval } from '../../molecules/Battle/AttkInterval.js'
import { MenuSelect } from '../../molecules/Battle/PlayerWindow/MenuSelect.js'
import { Food } from '../../molecules/Battle/PlayerWindow/Food.js'
import { Consumables } from '../../molecules/Battle/PlayerWindow/Consumables.js'
import { Buffs } from '../../molecules/Battle/PlayerWindow/Buffs.js'
import { Skills } from '../../molecules/Battle/PlayerWindow/Skills.js'
import { Stats } from '../../molecules/Battle/PlayerWindow/Stats.js'
import { Utils } from '../../../utils/calc/utils.js'

export function PlayerWindow({
  characterData,
  monsterData,
  combatRunning,
  setCombatRunning,
  damageCalculator,
  monsterCurrentHp,
  setMonsterCurrentHp,
  playerCurrentHp,
  playerCurrentFp,
  playerCurrentMp,
  setPlayerCurrentHp,
  setPlayerCurrentFp,
  setPlayerCurrentMp,
  playerHitsPerSecond,
}) {
  const { equipment, sex } = useContext(CharContext)
  const [playerMenu, setPlayerMenu] = useState('equipment')

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
    console.log(damageCalculator.computeDamage())
    if (monsterCurrentHp - damageCalculator.computeDamage() >= 0) {
      setMonsterCurrentHp(monsterCurrentHp - damageCalculator.computeDamage())
    } else {
      setMonsterCurrentHp(0)
    }
    // if (playerCurrentHp === characterData.health) {
    //   setPlayerCurrentHp(playerCurrentHp - 1)
    // } else {
    //   setPlayerCurrentHp(characterData.health)
    // }
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
              currentHp={playerCurrentHp}
              currentFp={playerCurrentFp}
              currentMp={playerCurrentMp}
            />
            <Food
              hpFood={equipment.hpFood}
              fpFood={equipment.fpFood}
              mpFood={equipment.mpFood}
            />
            <MenuSelect playerMenu={playerMenu} setPlayerMenu={setPlayerMenu} />
            <div id="View">
              {playerMenu === 'equipment' && (
                <EquipmentView equipment={equipment} sex={sex} />
              )}
              {playerMenu === 'skills' && <Skills />}
              {playerMenu === 'buffs' && <Buffs />}
              {playerMenu === 'consumables' && <Consumables />}
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <AttkInterval
              calculateDamage={calculateDamage}
              hitsPerSecond={playerHitsPerSecond}
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
