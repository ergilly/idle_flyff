import React from 'react'

export function BattleBars({
  target,
  maxHp,
  maxFp,
  maxMp,
  currentHp,
  currentFp,
  currentMp,
}) {
  const hpPercent = (currentHp / maxHp) * 100
  const fpPercent = (currentFp / maxFp) * 100
  const mpPercent = (currentMp / maxMp) * 100
  return (
    <div className="w-auto mx-2">
      <div className="w-full mt-2 bg-gray-600 rounded-md h-5">
        <div
          className="bg-red-400 h-5 rounded-md"
          style={{ width: `${hpPercent}%` }}
        />
        <div className="relative -top-5 text-white text-md font-bold text-center">
          {currentHp}/{maxHp} HP
        </div>
      </div>
      {target === 'player' && (
        <div className="w-full mt-2 bg-gray-600 rounded-md h-5">
          <div
            className="bg-green-400 h-5 rounded-md"
            style={{ width: `${fpPercent}%` }}
          />
          <div className="relative -top-5 text-white text-md font-bold text-center">
            {currentFp}/{maxFp} FP
          </div>
        </div>
      )}
      {target === 'player' && (
        <div className="w-full mt-2 bg-gray-600 rounded-md h-5">
          <div
            className="bg-blue-400 h-5 rounded-md"
            style={{ width: `${mpPercent}%` }}
          />
          <div className="relative -top-5 text-white text-md font-bold text-center">
            {currentMp}/{maxMp} MP
          </div>
        </div>
      )}
    </div>
  )
}
