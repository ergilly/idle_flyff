import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react'
import { UserContext } from './userContext.js'
import { CreateCharacterView } from './characterContext/createCharacter.js'
import { SelectCharacterView } from './characterContext/selectCharacter.js'
import { getData, addData } from '../firebase/firestore.js'
import { getCurrentUser } from '../firebase/auth.js'

export const CharContext = createContext({})

export function CharProvider({ children }) {
  const user = useContext(UserContext)
  const [character, setCharacter] = useState({ selected: false })
  const [createChar, setCreateChar] = useState(false)
  const [error, setError] = useState('')

  const getUID = async () => {
    const userData = await getCurrentUser()
    return userData.uid
  }

  const requestCharacter = useCallback((char) => {
    setCharacter(char)
    setError('')
  }, [])

  const getCurrentUserData = async (uid) => {
    try {
      const { result, error } = await getData('user', uid)
      if (error) {
        throw new Error(error) // Throw an error if there's an issue
      }
      return result
    } catch (error) {
      console.error('Error getting user data:', error)
      return null
    }
  }

  function findIndexByUID(array, uidToFind) {
    for (let i = 0; i < array.length; i++) {
      const object = array[i]
      const keys = Object.keys(object)
      if (keys.includes(uidToFind)) {
        return i // Return the index if a match is found
      }
    }
    return -1 // Return -1 if no match is found
  }

  const saveCharacter = async (characterData) => {
    try {
      const uid = await getUID()
      const userData = await getCurrentUserData(uid)
      const characterIndex = findIndexByUID(
        userData.characters,
        characterData.uid,
      )
      userData.characters[characterIndex] = {
        [characterData.uid]: characterData,
      }
      const { res, error } = await addData('user', uid, userData)
      if (error) {
        throw new Error(error)
      }
      setCharacter(characterData)
      return res
    } catch (error) {
      console.error('Error saving character:', error)
      return null
    }
  }

  const contextValue = useMemo(() => {
    return {
      character,
      saveCharacter,
    }
  }, [character, saveCharacter])

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
    <CharContext.Provider value={contextValue}>{children}</CharContext.Provider>
  )
}
