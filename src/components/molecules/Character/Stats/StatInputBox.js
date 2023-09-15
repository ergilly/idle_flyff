import React, { useState } from 'react'

export function StatInputBox({
  stat,
  stats,
  availableStatPoints,
  value,
  setValue,
}) {
  const [inputValue, setInputValue] = useState(value)
  const [timeoutId, setTimeoutId] = useState(null)

  async function incrementStatValue(
    value,
    setValue,
    inputValue,
    setInputValue,
  ) {
    if (availableStatPoints > 0) {
      setValue(value + 1)
      setInputValue(inputValue + 1)
    }
  }

  async function decrementStatValue(
    value,
    setValue,
    inputValue,
    setInputValue,
  ) {
    if (value > 0) {
      setValue(value - 1)
      setInputValue(inputValue - 1)
    }
  }

  function handleOnChange(newValue) {
    setInputValue(newValue)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      if (newValue < 0) {
        setValue(0)
        setInputValue(0)
      } else if (newValue > availableStatPoints) {
        setValue(availableStatPoints)
        setInputValue(availableStatPoints)
      } else {
        setValue(newValue)
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
            decrementStatValue(value, setValue, inputValue, setInputValue)
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
          value={inputValue}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button
          type="button"
          className="px-1 text-xl"
          onClick={() => {
            incrementStatValue(value, setValue, inputValue, setInputValue)
          }}
        >
          +
        </button>
      </form>
    </div>
  )
}
