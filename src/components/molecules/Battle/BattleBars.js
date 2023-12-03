import React from 'react'
import { useSelector } from 'react-redux'

export function BattleBars({ target, currentHp, currentFp, currentMp }) {
  const health = useSelector((state) => state?.health)
  const fp = useSelector((state) => state?.fp)
  const mp = useSelector((state) => state?.mp)
  const hpPercent = (currentHp / health) * 100
  const fpPercent = (currentFp / fp) * 100
  const mpPercent = (currentMp / mp) * 100
  return (
    <div className="w-auto mx-2">
      <div className="w-full mt-2 bg-gray-600 rounded-md h-5">
        <div
          className="bg-red-400 h-5 rounded-md"
          style={{ width: `${hpPercent}%` }}
        />
        <div className="relative -top-5 text-white text-md font-bold text-center">
          {currentHp}/{health} HP
        </div>
      </div>
      {target === 'player' && (
        <div className="w-full mt-2 bg-gray-600 rounded-md h-5">
          <div
            className="bg-green-400 h-5 rounded-md"
            style={{ width: `${fpPercent}%` }}
          />
          <div className="relative -top-5 text-white text-md font-bold text-center">
            {currentFp}/{fp} FP
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
            {currentMp}/{mp} MP
          </div>
        </div>
      )}
    </div>
  )
}
