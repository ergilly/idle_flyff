import React, { useEffect } from 'react'
import { Utils } from '../../../utils/calc/utils.js'

export function ModelViewer({
  modelViewerSource,
  setModelViewerSource,
  equipment,
  sex,
}) {
  const weaponClasses = {
    axe1: '1H Axe',
    axe2: '2H Axe',
    sword1: '1H Sword',
    sword2: '2H Sword',
    shield: 'Shield',
    bow: 'Bow',
    stick: 'Stick',
    knuckle: 'Knuckle',
    staff: 'Staff',
    wand: 'Wand',
    yoyo: 'Yo-Yo',
  }

  const capitaliseFirstCharacter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const getWeaponClass = (weapon) => {
    let weaponClass
    switch (weapon.subcategory) {
      case 'axe':
        weaponClass = weapon.twoHanded ? '2H Axe' : '1H Axe'
        break
      case 'sword':
        weaponClass = weapon.twoHanded ? '2H Sword' : '1H Sword'
        break
      case 'yoyo':
        weaponClass = 'Yo-Yo'
        break
      default:
        weaponClass = capitaliseFirstCharacter(weapon.subcategory)
        break
    }
    return weaponClass
  }

  const getItemClass = async (item) => {
    const job = await Utils.getJobById(item.class)
    return job.name.en
  }

  useEffect(() => {
    let isMounted = true
    const createModelViewerUrl = async () => {
      let modelViewerUrl
      if (isMounted && equipment && sex) {
        const urlSuffix =
          'https://www.flyffmodelviewer.com/wp-content/uploads/FlyffCSViewer.html?'
        const genderString = `gender=${capitaliseFirstCharacter(sex)}`
        const faceString = `face=${capitaliseFirstCharacter(sex)} Head 01`
        const hairString = `hair=${capitaliseFirstCharacter(sex)} Hair 01`
        const helmetString = equipment.helmet
          ? `helmet=[${await getItemClass(equipment.helmet)}] ${
              equipment.helmet.name.en
            }`
          : 'helmet=  None'
        const torsoString = equipment.suit
          ? `torso=[${await getItemClass(equipment.suit)}] ${
              equipment.suit.name.en
            }`
          : 'torso=  None'
        const handsString = equipment.gauntlet
          ? `hands=[${await getItemClass(equipment.gauntlet)}] ${
              equipment.gauntlet.name.en.charAt(
                equipment.gauntlet.name.en.length - 1,
              ) === 's'
                ? equipment.gauntlet.name.en.slice(0, -1)
                : equipment.gauntlet.name.en
            }`
          : 'hands=  None'
        const feetString = equipment.boots
          ? `feet=[${await getItemClass(equipment.boots)}] ${
              equipment.boots.name.en
            }`
          : 'feet=  None'
        const cloakString = equipment.cloak
          ? `cloak=${equipment.cloak.name.en}`
          : 'cloak=  None'
        const maskString = equipment.mask
          ? `mask=${equipment.mask.name.en}`
          : 'mask=  None'
        const leftWeaponClassString = equipment.offhand
          ? `leftwepclass=${getWeaponClass(equipment.offhand)}`
          : 'leftwepclass=Weapon Category'
        const leftWeaponString = equipment.offhand
          ? `leftwep=${equipment.offhand.name.en}`
          : 'leftwep='
        const rightWeaponClassString = equipment.mainhand
          ? `rightwepclass=${getWeaponClass(equipment.mainhand)}`
          : 'rightwepclass=  Weapon Category'
        const rightWeaponString = equipment.mainhand
          ? `rightwep=${equipment.mainhand.name.en}`
          : 'rightwep=  None'
        const fullUrl = `${urlSuffix}${genderString}&${faceString}&${hairString}&${helmetString}&${torsoString}&${handsString}&${feetString}&${cloakString}&${maskString}&${leftWeaponClassString}&${leftWeaponString}&${rightWeaponClassString}&${rightWeaponString}`
        modelViewerUrl = fullUrl
          .split(' ')
          .join('%20')
          .split('[')
          .join('%5B')
          .split(']')
          .join('%5D')
      }
      setModelViewerSource(modelViewerUrl)
    }
    createModelViewerUrl()
    return () => {
      isMounted = false
    }
  }, [equipment, sex])

  return (
    <div className="p-4">
      <div className="overflow-hidden h-72 w-64 border border-1 rounded-xl">
        <iframe
          className="relative h-96 w-256 -left-96 -top-24"
          title="modelViewer"
          src={modelViewerSource}
        />
      </div>
    </div>
  )
}
