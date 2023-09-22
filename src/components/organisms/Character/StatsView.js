import React, { useState, useContext, useEffect } from 'react'
import { CharContext } from '../../../context/characterContext.js'
import { StatInputBox } from '../../molecules/Character/Stats/StatInputBox.js'

export function StatsView() {
  const { stats, level } = useContext(CharContext)

  // 0-60 = 2 stat points per level
  // 60-120 = 3 stat points per level
  const [strValue, setStrValue] = useState(0)
  const [staValue, setStaValue] = useState(0)
  const [dexValue, setDexValue] = useState(0)
  const [intValue, setIntValue] = useState(0)

  const [statPointsForLevel, setStatPointsForLevel] = useState(0)
  const [availableStatPoints, setAvailableStatPoints] = useState(0)

  async function calculateStatPointsForLevel(level) {
    if (level <= 60) {
      setStatPointsForLevel((level - 1) * 2)
    } else {
      setStatPointsForLevel(118 + (level - 60) * 3)
    }
  }

  async function calculateAvailableStatPoints(
    statPointsForLevel,
    strValue,
    staValue,
    dexValue,
    intValue,
    stats,
  ) {
    setAvailableStatPoints(
      statPointsForLevel -
        strValue -
        staValue -
        dexValue -
        intValue -
        (stats.str - 15) -
        (stats.sta - 15) -
        (stats.dex - 15) -
        (stats.int - 15),
    )
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      calculateStatPointsForLevel(level)
    }
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      calculateAvailableStatPoints(
        statPointsForLevel,
        strValue,
        staValue,
        dexValue,
        intValue,
        stats,
      )
    }
    return () => {
      isMounted = false
    }
  }, [statPointsForLevel, strValue, staValue, dexValue, intValue, stats])

  return (
    <div className="container flex flex-col justify-between min-w-min w-auto h-min m-2 border rounded-xl px-4 py-2 bg-gray-800">
      <div
        id="available_stat_points"
        className="text-white text-center text-lg font-bold"
      >
        Available Stat Points: {availableStatPoints}
      </div>
      <div
        id="stat_input_box"
        className="text-white text-center text-lg font-bold"
      >
        <StatInputBox
          stat="str"
          stats={stats}
          availableStatPoints={availableStatPoints}
          value={strValue}
          setValue={setStrValue}
        />
        <StatInputBox
          stat="sta"
          stats={stats}
          availableStatPoints={availableStatPoints}
          value={staValue}
          setValue={setStaValue}
        />
        <StatInputBox
          stat="dex"
          stats={stats}
          availableStatPoints={availableStatPoints}
          value={dexValue}
          setValue={setDexValue}
        />
        <StatInputBox
          stat="int"
          stats={stats}
          availableStatPoints={availableStatPoints}
          value={intValue}
          setValue={setIntValue}
        />
      </div>
    </div>
  )
}
