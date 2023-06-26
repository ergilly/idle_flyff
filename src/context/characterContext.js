import React, { useCallback, useState, useContext } from 'react'
import { UserContext } from './userContext'
import { CreateCharacterView } from './characterContext/createCharacter'
import { SelectCharacterView } from './characterContext/selectCharacter'

export const CharContext = React.createContext({})

export function CharProvider({ children }) {
  const user = useContext(UserContext)
  const [character, setCharacter] = useState({ selected: false })
  const [createChar, setCreateChar] = useState(false)
  const [error, setError] = useState('')

  const requestCharacter = useCallback((char) => {
    setCharacter(char)
    setError('')
  }, [])

  if (!character.selected) {
    if (!createChar) {
      return (
        <SelectCharacterView
          user={user}
          setCharacter={setCharacter}
          setCreateChar={setCreateChar}
          onClick={requestCharacter}
          error={error}
        />
      )
    }
    return (
      <CreateCharacterView
        user={user}
        setCharacter={setCharacter}
        setCreateChar={setCreateChar}
        onClick={requestCharacter}
        error={error}
      />
    )
  }

  return (
    <CharContext.Provider value={character}>{children}</CharContext.Provider>
  )
}
