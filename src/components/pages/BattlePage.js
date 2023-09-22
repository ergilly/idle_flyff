import React, { useContext, useEffect, useState } from 'react'
import { getData } from '../../firebase/firestore.js'
import { CharContext } from '../../context/characterContext.js'
import { PlayerWindow } from '../organisms/Battle/PlayerWindow.js'
import { MonsterWindow } from '../organisms/Battle/MonsterWindow.js'
import { BattleMap } from '../organisms/Battle/BattleMap.js'
import { Utils } from '../../utils/calc/utils.js'
import { DamageCalculator } from '../../utils/calc/damageCalculator.js'

export function BattlePage() {
  const { equipment, jobId, level, stats } = useContext(CharContext)
  const [characterData, setCharacterData] = useState(null)
  const [monsterData, setMonsterData] = useState(null)
  const [combatRunning, setCombatRunning] = useState(false) // Track whether the interval is running
  const [damageCalculator, setDamageCalculator] = useState(null)

  useEffect(() => {
    let isMounted = true
    const createCharacterData = async () => {
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
      if (isMounted) {
        await charData.initialize()
        await charData.update()
        await Promise.all([setCharacterData(charData)])
      }
    }
    createCharacterData()
    return () => {
      isMounted = false
    }
  }, [jobId])

  useEffect(() => {
    let isMounted = true
    const fetchMonster = async () => {
      const { result, error } = await getData('monster', `5745`)
      if (error) {
        console.log(error)
        return
      }
      result.attackDelay = 1
      if (isMounted) {
        await setMonsterData(result)
      }
    }

    fetchMonster()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const setDamageCalc = async () => {
      const damageInfo = new DamageCalculator(characterData, monsterData)
      console.log(damageInfo)
      if (isMounted) {
        await setDamageCalculator(damageInfo)
      }
    }
    setDamageCalc()
    return () => {
      isMounted = false
    }
  }, [characterData])

  console.log(damageCalculator)

  return (
    <div className="w-full py-8 px-6">
      <BattleMap />
      <div className="flex">
        {characterData && (
          <PlayerWindow
            characterData={characterData}
            monsterData={monsterData}
            combatRunning={combatRunning}
            setCombatRunning={setCombatRunning}
            damageCalculator={damageCalculator}
          />
        )}
        {monsterData && (
          <MonsterWindow
            characterData={characterData}
            monsterData={monsterData}
            combatRunning={combatRunning}
            setCombatRunning={setCombatRunning}
            damageCalculator={damageCalculator}
          />
        )}
      </div>
    </div>
  )
}
