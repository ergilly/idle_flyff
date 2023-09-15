import React, { useEffect, useState } from 'react'

export function StatInputBox({
  stat,
  stats,
  availableStatPoints,
  setAvailableStatPoints,
  statPointsForLevel,
  value,
  setValue,
}) {
  const [timeoutId, setTimeoutId] = useState(null)

  async function incrementStatValue(
    value,
    setValue,
    availableStatPoints,
    setAvailableStatPoints,
  ) {
    if (availableStatPoints > 0) {
      setValue(value + 1)
      setAvailableStatPoints(availableStatPoints - 1)
    }
  }

  async function decrementStatValue(
    value,
    setValue,
    availableStatPoints,
    setAvailableStatPoints,
  ) {
    if (value > 0) {
      setValue(value - 1)
      setAvailableStatPoints(availableStatPoints + 1)
    }
  }

  function handleOnChange(value) {
    const newValue = Number.isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10)
    setValue(newValue)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setAvailableStatPoints(
      statPointsForLevel - newValue >= 0 ? statPointsForLevel - newValue : 0,
    )

    const newTimeoutId = setTimeout(() => {
      if (newValue < 0) {
        setValue(0)
      } else if (newValue > statPointsForLevel) {
        setAvailableStatPoints(0)
        setValue(statPointsForLevel)
      } else {
        setAvailableStatPoints(statPointsForLevel - newValue)
      }
    }, 500)

    setTimeoutId(newTimeoutId)
  }

  return (
    <div
      className="flex py-1 items-center justify-between"
      id={`${stat.toUpperCase()}_input_box`}
    >
      <span className="px-1">{stat.toUpperCase()}</span>
      <span className="px-1">{stats[stat]}</span>
      <span className="px-1">{stats[stat] - 15}</span>
      <form className="flex" id={`${stat.toUpperCase()}_input`}>
        <button
          type="button"
          className="px-1 text-xl"
          onClick={() => {
            decrementStatValue(
              value,
              setValue,
              availableStatPoints,
              setAvailableStatPoints,
            )
          }}
        >
          -
        </button>
        <input
          type="text"
          name="text"
          id={`${stat.toUpperCase()}_value`}
          className="block w-16 rounded-md border-0 px-2 py-1.5 text-gray-900 placeholder:text-gray-400"
          placeholder="0"
          value={value}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button
          type="button"
          className="px-1 text-xl"
          onClick={() => {
            incrementStatValue(
              value,
              setValue,
              availableStatPoints,
              setAvailableStatPoints,
            )
          }}
        >
          +
        </button>
      </form>
    </div>
  )
}
