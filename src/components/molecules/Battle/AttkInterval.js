import React from 'react'

export function AttkInterval() {
  return (
    <div className="w-auto mx-2 mt-2">
      <div className="w-full bg-gray-600 rounded-md h-5">
        <div className="bg-blue-400 h-5 rounded-md" style={{ width: '45%' }} />
      </div>
      <div className="flex items-center justify-center m-1 text-white text-md font-bold">
        <span>Attack interval: 1s</span>
      </div>
    </div>
  )
}
