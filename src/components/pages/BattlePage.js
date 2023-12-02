import React, { useEffect, useState } from 'react'
import { getData } from '../../firebase/firestore.js'
import { PlayerWindow } from '../organisms/Battle/PlayerWindow.js'
import { MonsterWindow } from '../organisms/Battle/MonsterWindow.js'
import { BattleMap } from '../organisms/Battle/BattleMap.js'
import { DamageCalculator } from '../../utils/calc/damageCalculator.js'

export function BattlePage({ characterData }) {
  const [monsterData, setMonsterData] = useState(null)
  const [combatRunning, setCombatRunning] = useState(false) // Track whether the interval is running
  const [damageCalculator, setDamageCalculator] = useState(null)
  const [monsterCurrentHp, setMonsterCurrentHp] = useState(0)
  const [playerCurrentHp, setPlayerCurrentHp] = useState(0)
  const [playerCurrentFp, setPlayerCurrentFp] = useState(0)
  const [playerCurrentMp, setPlayerCurrentMp] = useState(0)
  const [playerHitsPerSecond, setPlayerHitsPerSecond] = useState(0)

  console.log(characterData)
  useEffect(() => {
    let isMounted = true
    const setDynamicStats = async () => {
      if (isMounted && characterData) {
        await Promise.all([
          setPlayerCurrentHp(characterData.health),
          setPlayerCurrentFp(characterData.fp),
          setPlayerCurrentMp(characterData.mp),
          setPlayerHitsPerSecond(
            characterData.constants.hps * characterData.aspd,
          ),
        ])
      }
    }
    setDynamicStats()
    return () => {
      isMounted = false
    }
  }, [characterData])

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
      if (isMounted) {
        await setDamageCalculator(damageInfo)
      }
    }
    if (monsterData) {
      setDamageCalc()
    }
    return () => {
      isMounted = false
    }
  }, [characterData, monsterData])

  return (
    <div className="w-full py-8 px-6">
      <BattleMap characterData={characterData} />
      <div className="flex">
        {characterData && (
          <PlayerWindow
            characterData={characterData}
            monsterData={monsterData}
            combatRunning={combatRunning}
            setCombatRunning={setCombatRunning}
            damageCalculator={damageCalculator}
            monsterCurrentHp={monsterCurrentHp}
            setMonsterCurrentHp={setMonsterCurrentHp}
            playerCurrentHp={playerCurrentHp}
            playerCurrentFp={playerCurrentFp}
            playerCurrentMp={playerCurrentMp}
            setPlayerCurrentHp={setPlayerCurrentHp}
            setPlayerCurrentFp={setPlayerCurrentFp}
            setPlayerCurrentMp={setPlayerCurrentMp}
            playerHitsPerSecond={playerHitsPerSecond}
          />
        )}
        {monsterData && (
          <MonsterWindow
            characterData={characterData}
            monsterData={monsterData}
            monsterCurrentHp={monsterCurrentHp}
            setMonsterCurrentHp={setMonsterCurrentHp}
            playerCurrentHp={playerCurrentHp}
            setPlayerCurrentHp={setPlayerCurrentHp}
            combatRunning={combatRunning}
            setCombatRunning={setCombatRunning}
            damageCalculator={damageCalculator}
          />
        )}
      </div>
    </div>
  )
}
