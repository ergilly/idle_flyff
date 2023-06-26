function searchItemInObject(obj, searchItem) {
  const entries = Object.entries(obj)
  const foundEntry = entries.find(([key, value]) => {
    if (Array.isArray(value)) {
      const foundItem = value.find((item) => item.id === searchItem.id)
      return foundItem !== undefined
    }
    return false
  })

  if (foundEntry) {
    const [key, value] = foundEntry
    return {
      item: value.find((item) => item.id === searchItem.id),
      tab: key,
    }
  }

  return null
}

export function addItemToInventory(character, item) {
  const newCharacter = { ...character }
  const existingItem = searchItemInObject(newCharacter.inventory, item)

  if (existingItem === null || item.stack === 1 || !existingItem.tab) {
    newCharacter.inventory.tab1.push(item)
  } else {
    const index = newCharacter.inventory[existingItem.tab].indexOf(
      existingItem.item,
    )
    if (index !== -1) {
      newCharacter.inventory[existingItem.tab][index].count += item.count
    }
  }

  return newCharacter
}

export function removeItemFromInventory(character, item, count) {
  const newCharacter = { ...character }
  const existingItem = searchItemInObject(newCharacter.inventory, item)

  if (existingItem !== null && existingItem.tab) {
    const index = newCharacter.inventory[existingItem.tab].indexOf(
      existingItem.item,
    )
    if (existingItem.item.count > count) {
      newCharacter.inventory[existingItem.tab][index].count -= count
    } else {
      newCharacter.inventory[existingItem.tab].splice(index, 1)
    }
  }

  return newCharacter
}

export function addItemToEquipment(character, item, slot) {
  const newCharacter = { ...character }
  newCharacter.equipment[slot] = item
  return newCharacter
}

export function removeItemFromEquipment(character, slot) {
  const newCharacter = { ...character }
  newCharacter.equipment[slot] = null
  return newCharacter
}

export function replaceEquippedItem(character, item, slot) {
  let newCharacter = { ...character }
  if (newCharacter.equipment[slot] !== null) {
    const currentEquip = newCharacter.equipment[slot]
    newCharacter = removeItemFromEquipment(newCharacter, slot)
    newCharacter = addItemToInventory(newCharacter, currentEquip)
  }
  newCharacter.equipment[slot] = item
  return newCharacter
}
