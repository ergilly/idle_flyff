import React, { useEffect, useState } from 'react'
import { getData } from '../../../firebase/firestore.js'

const rarityColor = {
  common: 'text-cyan-300',
  uncommon: 'text-yellow-700',
  rare: 'text-green-400',
  veryrare: 'text-rose-600',
  unique: 'text-fuchsia-500',
}

function attackSpeedString(inputString) {
  let newString = inputString
  if (newString.startsWith('very')) {
    newString = newString.replace('very', 'very ')
  }
  newString = newString.charAt(0).toUpperCase() + newString.slice(1)
  return newString
}

export function SelectedItemDescription({ item }) {
  const [className, setClassName] = useState('Vagrant')

  useEffect(() => {
    let isMounted = true
    const fetchClass = async () => {
      if (item?.class) {
        const { result, error } = await getData('class', `${item.class}`)
        if (error) {
          console.log(error)
          return
        }
        if (isMounted) {
          setClassName(result?.name?.en || 'Vagrant')
        }
      }
    }
    fetchClass()
    return () => {
      isMounted = false
    }
  }, [item])

  return (
    <div className="selected-item-description flex flex-col m-1 p-4 bg-gray-600 border-0 rounded-lg w-3/4 h-min">
      <span className={`${rarityColor[item?.rarity]} text-lg font-bold`}>
        {item?.name?.en}
      </span>
      {item?.category === 'weapon' && (
        <span className="text-gray-100">
          {item.twoHanded ? 'Two-handed weapon' : 'One-handed weapon'}
        </span>
      )}
      {item?.sex !== undefined && (
        <span className="text-gray-100">{`Sex: ${item.sex}`}</span>
      )}
      {item?.minAttack !== undefined && item?.maxAttack !== undefined && (
        <span className="text-gray-100">{`Attack: ${item.minAttack} ~ ${item.maxAttack}`}</span>
      )}
      {item?.minDefense !== undefined && item?.maxDefense !== undefined && (
        <span className="text-gray-100">{`Defense: ${item.minDefense} ~ ${item.maxDefense}`}</span>
      )}
      {item?.attackSpeed !== undefined && (
        <span className="text-gray-100">{`Attack speed: ${attackSpeedString(
          item.attackSpeed,
        )}`}</span>
      )}
      {item?.class !== undefined && (
        <span className="text-gray-100">{className}</span>
      )}
      {item?.level !== undefined && item.level !== 1 && (
        <span className="text-gray-100">{`Required Level: ${item.level}`}</span>
      )}
      {item?.rarity !== undefined && (
        <span className="text-gray-100">
          Rarity:{' '}
          <span className={rarityColor[item.rarity]}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </span>
        </span>
      )}
      {item?.abilities !== undefined && (
        <span className="text-gray-100">{`Restore ${item.abilities[0]?.parameter?.toUpperCase()}: ${
          item.abilities[0]?.add
        }`}</span>
      )}
      {item?.description?.en !== undefined &&
        item.description.en !== 'null' && (
          <span className="text-gray-100">{`Description: ${item.description.en}`}</span>
        )}
      {item?.cooldown !== undefined && (
        <span className="text-gray-100">{`Cooldown: ${item.cooldown} seconds`}</span>
      )}
      {item?.duration !== undefined && (
        <span className="text-gray-100">{`Duration: ${item.duration}`}</span>
      )}
      {item?.flightSpeed !== undefined && (
        <span className="text-gray-100">{`Flight speed: ${item.flightSpeed}km/h`}</span>
      )}
    </div>
  )
}
