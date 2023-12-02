import React, { useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { uid as charId } from 'uid'
import { useNavigate } from 'react-router-dom'
import { getData, addData } from '../../firebase/firestore.js'
import { getCurrentUser } from '../../firebase/auth.js'
import { Utils } from '../../utils/calc/utils.js'
import { Vagrant } from '../../utils/calc/jobs.js'

export function CreateCharacterView({
  setCharacter,
  setCreateChar,
  onClick,
  error,
}) {
  const [characterName, setCharacterName] = useState('')
  const [characterSex, setCharacterSex] = useState('')
  const navigate = useNavigate()

  const handleSexSelect = (evt, setCharacterSex) => {
    setCharacterSex(evt.target.value)
  }

  const handleCharacterName = (evt, setCharacterName) => {
    setCharacterName(evt.target.value)
  }

  const sexSelect = (setCharacterSex) => {
    return (
      <div className="flex justify-center">
        <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem] text-white font-bold">
          <input
            onChange={(evt) => {
              handleSexSelect(evt, setCharacterSex)
            }}
            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="male"
          />
          <span className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer">
            Male
          </span>
        </div>
        <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem] text-white font-bold">
          <input
            onChange={(evt) => {
              handleSexSelect(evt, setCharacterSex)
            }}
            className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="female"
          />
          <span className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer">
            Female
          </span>
        </div>
      </div>
    )
  }

  const getUID = async () => {
    const user = await getCurrentUser()
    return user.uid
  }

  const getCurrentUserData = async (uid) => {
    const { result, error } = await getData('user', uid)
    if (error) {
      return console.log(error)
    }
    return result
  }

  const createStartingInventory = async () => {
    // const lollipop = await Utils.getItemById('5325')
    // lollipop.count = 3
    const biscuit = await Utils.getItemById('9449')
    biscuit.count = 1
    const blinkwing = await Utils.getItemById('8815')
    blinkwing.count = 5
    return { tab1: [biscuit, blinkwing] }
  }

  const createStartingEquipment = async (characterSex) => {
    const equipment = {
      mainhand: null,
      offhand: null,
      ammo: null,
      cloak: null,
      mask: null,
      helmet: null,
      suit: null,
      gauntlet: null,
      boots: null,
      mount: null,
      ringL: null,
      ringR: null,
      earringL: null,
      earringR: null,
      necklace: null,
      hatF: null,
      suitF: null,
      gauntletF: null,
      bootsF: null,
      hpFood: [],
      fpFood: [],
      mpFood: [],
    }
    const lollipop = await Utils.getItemById('5325')
    lollipop.count = 3
    equipment.hpFood.push(lollipop)
    equipment.mainhand = await Utils.getItemById('3497')
    if (characterSex === 'male') {
      equipment.suit = await Utils.getItemById('3314')
      equipment.gauntlet = await Utils.getItemById('5535')
      equipment.boots = await Utils.getItemById('4750')
    } else if (characterSex === 'female') {
      equipment.suit = await Utils.getItemById('6040')
      equipment.gauntlet = await Utils.getItemById('5011')
      equipment.boots = await Utils.getItemById('8195')
    }
    return equipment
  }

  const submitCharacter = async (
    event,
    setCharacter,
    setCreateChar,
    navigate,
    characterName,
    characterSex,
  ) => {
    event.preventDefault()
    const uid = await getUID()
    const userData = await getCurrentUserData(uid)
    const current_timestamp = Timestamp.fromDate(new Date())
    const newCharId = charId()
    const startingInventory = await createStartingInventory()
    const startingEquipment = await createStartingEquipment(characterSex)
    const character = {
      [newCharId]: {
        action: null,
        jobId: 9686,
        lastOnline: current_timestamp,
        level: 1,
        name: characterName,
        sex: characterSex,
        penya: 0,
        stats: {
          sta: 15,
          str: 15,
          dex: 15,
          int: 15,
        },
        inventory: startingInventory,
        equipment: startingEquipment,
        uid: newCharId,
      },
    }
    userData.characters.push(character)
    const { res, error } = await addData('user', uid, userData)
    if (error) {
      return console.log(error)
    }
    await setCreateChar(false)
    await setCharacter({ selected: true, ...character[newCharId] })
    return navigate('/character')
  }

  return (
    <div className="bg-gray-800 pt-8 px-4 pb-8 sm:px-6 lg:px-8 justify-center bg-opacity-60 h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white text-center pb-4">
          What shall we call you?
        </h1>
        <form
          onSubmit={(event) => {
            submitCharacter(
              event,
              setCharacter,
              setCreateChar,
              navigate,
              characterName,
              characterSex,
            )
          }}
          className="flex flex-col items-center"
        >
          <input
            onChange={(evt) => {
              handleCharacterName(evt, setCharacterName)
            }}
            type="text"
            name="name"
            id="name"
            className="block my-4 w-1/3 rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-bold"
            placeholder="Jane Smith"
          />
          {sexSelect(setCharacterSex)}
          <button
            type="submit"
            className="rounded-md my-4 w-1/3 bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Create Character
          </button>
        </form>
      </div>
    </div>
  )
}
