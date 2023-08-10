import React from 'react'
import { PlayerWindow } from '../organisms/Battle/PlayerWindow.js'
import { MonsterWindow } from '../organisms/Battle/MonsterWindow.js'
import { BattleMap } from '../organisms/Battle/BattleMap.js'

export function BattlePage() {
  return (
    <div className="w-full py-8 px-6">
      <BattleMap />
      <div className="flex">
        <PlayerWindow />
        <MonsterWindow />
      </div>
    </div>
  )
}
