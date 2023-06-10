import React from 'react'

const equipable = [
  'weapon',
  'armor',
  'fashion',
  'jewelry',
  'flying',
  'collector',
  'arrow',
]

export function SelectedItemEquip({ item }) {
  if (!equipable.includes(item.category)) {
    return <div />
  }
  return (
    <div className="flex justify-between m-1 p-4 bg-gray-600 border-0 rounded-lg h-16">
      <span className="text-white text-lg font-bold">Upgrade Item</span>
      <button
        type="button"
        className="rounded-md bg-indigo-500 px-3 py-2 ml-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Upgrade Item
      </button>
    </div>
  )
}
