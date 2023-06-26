import React, { useContext, useState, useEffect } from 'react'
import { getData } from '../../../firebase/firestore'

export function MonsterWindow() {
  const [monster, setMonster] = useState(null)

  async function fetchClass() {
    const { result, error } = await getData('monster', `5745`)
    if (error) {
      console.log(error)
      return
    }
    setMonster(result)
  }

  useEffect(() => {
    fetchClass()
  }, [])
  console.log(monster)

  return (
    <div
      id="MonsterWindow"
      className="mx-2 p-2 w-1/2 border-t-4 flex rounded-tl-md rounded-tr-md border-red-400 bg-gray-800"
    >
      <div className="flex flex-col w-full">
        <div id="Bars" />
        <div
          id="Monster Info"
          className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
        >
          <div className="text-white text-center text-lg font-bold w-full">
            Monster Info
          </div>
        </div>
        <div
          id="Monster Stats"
          className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
        >
          <div className="text-white text-center text-lg font-bold w-full">
            Monster Stats
          </div>
        </div>
        <div
          id="Loot"
          className="container flex w-auto h-min m-2 border rounded-xl px-4 bg-gray-800"
        >
          <div className="text-white text-center text-lg font-bold w-full">
            Loot
          </div>
        </div>
      </div>
    </div>
  )
}
