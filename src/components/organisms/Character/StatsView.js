import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatInputBox } from '../../molecules/Character/Stats/StatInputBox.js'

export function StatsView() {
  const dispatch = useDispatch()
  const { stats, level } = useSelector((state) => state)

  const [strValue, setStrValue] = useState(0)
  const [staValue, setStaValue] = useState(0)
  const [dexValue, setDexValue] = useState(0)
  const [intValue, setIntValue] = useState(0)

  const [statPointsForLevel, setStatPointsForLevel] = useState(0)
  const [availableStatPoints, setAvailableStatPoints] = useState(0)
  const [unassignedStatPoints, setUnassignedStatPoints] = useState(0)

  async function calculateStatPointsForLevel(level) {
    if (level <= 60) {
      setStatPointsForLevel((level - 1) * 2)
    } else {
      setStatPointsForLevel(118 + (level - 60) * 3)
    }
  }

  async function calculateAvailableStatPoints(statPointsForLevel, stats) {
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
    if (stats) {
      calculateAvailableStatPoints(statPointsForLevel, stats)
    }
  }, [stats, statPointsForLevel])

  useEffect(() => {
    setUnassignedStatPoints(availableStatPoints)
  }, [availableStatPoints])

  async function handleReset() {
    setStrValue(0)
    setStaValue(0)
    setDexValue(0)
    setIntValue(0)
    setUnassignedStatPoints(availableStatPoints)
  }

  async function handleSubmit() {
    const newStr = stats.str + strValue
    const newSta = stats.sta + staValue
    const newDex = stats.dex + dexValue
    const newInt = stats.int + intValue
    await dispatch({
      type: 'SET_CHARACTER_STATS',
      stats: { str: newStr, sta: newSta, dex: newDex, int: newInt },
    })
    setStrValue(0)
    setStaValue(0)
    setDexValue(0)
    setIntValue(0)
    calculateAvailableStatPoints(statPointsForLevel, stats)
  }

  return (
    <div className="container flex flex-col justify-between min-w-min w-auto h-min m-2 border rounded-xl px-4 py-2 bg-gray-800">
      <div
        id="available_stat_points"
        className="text-white text-center text-lg font-bold"
      >
        Available Stat Points: {unassignedStatPoints}
      </div>
      <div
        id="stat_input_box"
        className="text-white text-center text-lg font-bold"
      >
        <StatInputBox
          stat="str"
          unassignedStatPoints={unassignedStatPoints}
          setUnassignedStatPoints={setUnassignedStatPoints}
          availableStatPoints={
            availableStatPoints - staValue - dexValue - intValue
          }
          value={strValue}
          setValue={setStrValue}
        />
        <StatInputBox
          stat="sta"
          unassignedStatPoints={unassignedStatPoints}
          setUnassignedStatPoints={setUnassignedStatPoints}
          availableStatPoints={
            availableStatPoints - strValue - dexValue - intValue
          }
          value={staValue}
          setValue={setStaValue}
        />
        <StatInputBox
          stat="dex"
          unassignedStatPoints={unassignedStatPoints}
          setUnassignedStatPoints={setUnassignedStatPoints}
          availableStatPoints={
            availableStatPoints - staValue - strValue - intValue
          }
          value={dexValue}
          setValue={setDexValue}
        />
        <StatInputBox
          stat="int"
          unassignedStatPoints={unassignedStatPoints}
          setUnassignedStatPoints={setUnassignedStatPoints}
          availableStatPoints={
            availableStatPoints - staValue - dexValue - strValue
          }
          value={intValue}
          setValue={setIntValue}
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
