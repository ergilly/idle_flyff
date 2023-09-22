import React from 'react'

export function Stats({ characterData }) {
  return (
    <div
      id="Stats"
      className="container flex min-w-min w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
    >
      <div className="text-white text-center text-lg font-bold w-full">
        Stats
        <div>
          <ul className="text-sm text-left font-bold">
            <li className="flex justify-between">
              <div>Attack</div>
              <div className="text-cyan-300">
                {Math.round(characterData.attack)}
              </div>
            </li>
            <li className="flex justify-between">
              <div>Attack Speed</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.aspd * 100.0,
              )}%`}</div>
            </li>
            <li className="flex justify-between">
              <div>Casting Speed</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.DCT * 100.0,
              )}%`}</div>
            </li>
            <li className="flex justify-between">
              <div>Hit Rate</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.hitrate,
              )}%`}</div>
            </li>
            <li className="flex justify-between">
              <div>Crit Chance</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.criticalChance,
              )}%`}</div>
            </li>
            <li className="flex justify-between">
              <div>Crit Damage</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.criticalDamage,
              )}%`}</div>
            </li>
            <div id="seperator" />
            <li className="flex justify-between">
              <div>Defense</div>
              <div className="text-cyan-300">
                {Math.round(characterData.defense)}
              </div>
            </li>
            <li className="flex justify-between">
              <div>Parry</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.parry,
              )}%`}</div>
            </li>
            <li className="flex justify-between">
              <div>Melee Block</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.meleeBlock,
              )}%`}</div>
            </li>
            <li className="flex justify-between">
              <div>Ranged Block</div>
              <div className="text-cyan-300">{`${Math.round(
                characterData.rangedBlock,
              )}%`}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
