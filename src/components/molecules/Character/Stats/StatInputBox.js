import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function StatInputBox({
  stat,
  unassignedStatPoints,
  setUnassignedStatPoints,
  availableStatPoints,
  value,
  setValue,
}) {
  const { stats } = useSelector((state) => state)
  const [timeoutId, setTimeoutId] = useState(null)

  async function incrementStatValue(
    value,
    setValue,
    unassignedStatPoints,
    setUnassignedStatPoints,
  ) {
    if (unassignedStatPoints > 0) {
      setValue(value + 1)
      setUnassignedStatPoints(unassignedStatPoints - 1)
    }
  }

  async function decrementStatValue(
    value,
    setValue,
    unassignedStatPoints,
    setUnassignedStatPoints,
  ) {
    if (value > 0) {
      setValue(value - 1)
      setUnassignedStatPoints(unassignedStatPoints + 1)
    }
  }

  function handleOnChange(value) {
    const newValue = Number.isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10)
    setValue(newValue)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setUnassignedStatPoints(
      availableStatPoints - newValue >= 0 ? availableStatPoints - newValue : 0,
    )

    const newTimeoutId = setTimeout(() => {
      if (newValue < 0) {
        setValue(0)
      } else if (newValue > availableStatPoints) {
        setUnassignedStatPoints(0)
        setValue(availableStatPoints)
      } else {
        setUnassignedStatPoints(availableStatPoints - newValue)
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
              unassignedStatPoints,
              setUnassignedStatPoints,
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
              unassignedStatPoints,
              setUnassignedStatPoints,
            )
          }}
        >
          +
        </button>
      </form>
    </div>
  )
}
