import React, { useContext } from 'react'
import { CharContext } from '../../context/characterContext'

export function BattlePage() {
  const character = useContext(CharContext)
  console.log(character)

  return <div>Battle</div>
}
