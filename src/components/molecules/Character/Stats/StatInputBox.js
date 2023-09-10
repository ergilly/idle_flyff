import React from 'react'

export function StatInputBox({
  stat,
  stats,
  availableStatPoints,
  value,
  setValue,
}) {
  async function incrementStatValue(value, setValue) {
    console.log(availableStatPoints)
    if (availableStatPoints > 0) {
      setValue(value + 1)
    }
  }

  async function decrementStatValue(value, setValue) {
    if (value > 0) {
      setValue(value - 1)
    }
  }

  async function handleOnChange(value, setValue) {
    if (value > 0) {
      setValue(value)
    }
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
            decrementStatValue(value, setValue)
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
          onChange={(e) => handleOnChange(e.target.value, setValue)}
        />
        <button
          type="button"
          className="px-1 text-xl"
          onClick={() => {
            incrementStatValue(value, setValue)
          }}
        >
          +
        </button>
      </form>
    </div>
  )
}
