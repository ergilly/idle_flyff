import React, { useContext } from 'react'
import { CharContext } from '../../context/characterContext'

export function CharacterPage() {
  const character = useContext(CharContext)
  console.log(character)

  return <div>Character</div>
}
