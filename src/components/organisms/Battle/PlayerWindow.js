import React, { useContext, useState, useEffect } from 'react'
import { EquipmentView } from '../Character/EquipmentView.js'
import { CharContext } from '../../../context/characterContext.js'
import { BattleBars } from '../../molecules/Battle/BattleBars.js'
import { AttkInterval } from '../../molecules/Battle/AttkInterval.js'
import { MenuSelect } from '../../molecules/Battle/PlayerWindow/MenuSelect.js'
import { Consumables } from '../../molecules/Battle/PlayerWindow/Consumables.js'
import { Utils } from '../../../utils/calc/utils.js'

export function PlayerWindow() {
  const { equipment, jobId, level, stats } = useContext(CharContext)
  const [playerMenu, setPlayerMenu] = useState('equipment')
  const [currentHp, setCurrentHp] = useState(150)
  const [characterData, setCharacterData] = useState(null)

  async function createCharacterData() {
    const charData = await Utils.getJobFromId(jobId, [
      stats.str,
      stats.sta,
      stats.int,
      stats.dex,
      level,
      null,
      null,
      equipment.mainhand,
      equipment.offhand,
      equipment.helmet,
      equipment.suit,
      equipment.gauntlet,
      equipment.boots,
      equipment.cloak,
      equipment.earringR,
      equipment.earringL,
      equipment.ringR,
      equipment.ringL,
      equipment.necklace,
      null,
      jobId,
    ])
    await charData.initialize()
    await setCharacterData(charData)
  }

  useEffect(() => {
    createCharacterData()
  }, [jobId])

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

  console.log(characterData)
  console.log(characterData.defense)

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
              currentFp={characterData.fp}
              currentMp={characterData.mp}
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
            <AttkInterval />
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
