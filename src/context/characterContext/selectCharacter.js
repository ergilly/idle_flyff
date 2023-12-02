import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../firebase/firestore.js'

const getLastOnline = (time) => {
  const lastOnline = new Date(time.seconds * 1000)
  const now = new Date()
  const since = (now.getTime() - lastOnline.getTime()) / 1000
  if (since < 60) {
    return `${Math.floor(since)} ${
      Math.floor(since) > 1 ? 'seconds' : 'second'
    }`
  }
  if (since < 3600) {
    return `${Math.floor(since / 60)} ${
      Math.floor(since / 60) > 1 ? 'minutes' : 'minute'
    }`
  }
  if (since < 86400) {
    return `${Math.floor(since / 3600)} ${
      Math.floor(since / 3600) > 1 ? 'hours' : 'hour'
    }`
  }
  return `${Math.floor(since / 86400)} ${
    Math.floor(since / 86400) > 1 ? 'days' : 'day'
  }`
}

const renderCharacter = (userChar, index, setCreateChar, routeChange) => {
  if (userChar === null) {
    return (
      <li
        key={index}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-600 text-center shadow"
      >
        <div className="flex flex-1 flex-col p-8">
          <h3 className="mt-6 text-md font-medium text-gray-100">
            Character Slot #{index + 1}
          </h3>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <button
                type="button"
                onClick={() => setCreateChar(true)}
                className="relative -mr-px inline-flex w-0 flex-1 bg-gray-200 items-center justify-center gap-x-3 rounded-bl-lg border-2 border-gray-600 py-4 text-sm font-bold text-gray-600"
              >
                Create new Character
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  const [id] = Object.keys(userChar)
  const { imageUrl, name, action, lastOnline, level } = userChar[id]

  return (
    <li
      key={id}
      data-testid={`character-slot-${index + 1}`}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray-600 text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-black border-2 object-contain"
          src={imageUrl}
          alt=""
        />
        <h3 className="mt-6 text-md font-medium text-gray-100">{name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dd className="text-sm text-gray-100">
            <span className="font-bold">{action}</span>
            <span> since {getLastOnline(lastOnline)} ago</span>
          </dd>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Level {level}
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              type="button"
              onClick={() => routeChange(userChar[id])}
              className="relative -mr-px inline-flex w-0 flex-1 bg-green-200 items-center justify-center gap-x-3 rounded-bl-lg border-2 border-green-600 py-4 text-sm font-bold text-green-600"
            >
              Select Character
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              className="relative inline-flex w-0 flex-1 bg-red-200 items-center justify-center gap-x-3 rounded-br-lg border-2 border-red-600 py-4 text-sm font-bold text-red-600"
            >
              Delete Character
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export function SelectCharacterView({ user, setCharacter, setCreateChar }) {
  const [userChars, setUserChars] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const getCharacterData = async () => {
      if (user && user.uid) {
        const { result, error } = await getData('user', user.uid)
        if (error || !result) {
          console.log(error)
        } else {
          const characterData = result.characters
          const updatedCharacters =
            characterData.length < 8
              ? [
                  ...characterData,
                  ...Array(8 - characterData.length).fill(null),
                ]
              : characterData
          if (isMounted) {
            setUserChars(updatedCharacters)
          }
        }
      }
    }

    getCharacterData()
    return () => {
      isMounted = false
    }
  }, [user])

  const routeChange = (userChar) => {
    setCharacter({ selected: true, ...userChar })
    navigate('/character')
  }

  if (userChars.length === 0) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <ul className="m-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {userChars.map((userChar, index) =>
          renderCharacter(userChar, index, setCreateChar, routeChange),
        )}
      </ul>
    </div>
  )
}
