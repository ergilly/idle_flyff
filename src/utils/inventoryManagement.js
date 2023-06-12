function searchItemInObject(obj, searchItem) {
  const entries = Object.entries(obj)
  let result = null

  entries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const foundItem = value.find((item) => item.id === searchItem.id)
      if (foundItem) {
        result = {
          item: foundItem,
          tab: key,
        }
      }
    }
  })

  return result
}

export function addItemToInventory(character, item) {
  const newChar = character
  const existingItem = searchItemInObject(newChar.inventory, item)
  if (existingItem === null || item.stack === 1) {
    newChar.inventory.tab1.push(item)
  } else {
    const index = newChar.inventory[existingItem.tab].indexOf(existingItem.item)
    if (index !== -1) {
      newChar.inventory[existingItem.tab][index].count += item.count
    }
  }
  return newChar
}

export function removeItemFromInventory(character, item, count) {
  const newChar = character
  const existingItem = searchItemInObject(newChar.inventory, item)
  if (existingItem !== null) {
    const index = newChar.inventory[existingItem.tab].indexOf(existingItem.item)
    if (existingItem.item.count > count) {
      newChar.inventory[existingItem.tab][index].count -= item.count
    } else {
      newChar.inventory[existingItem.tab].splice(index, 1)
    }
  }
  return newChar
}

export function addItemToEquipment(character, item, slot) {
  const newChar = character
  newChar.equipment[slot] = item
  return newChar
}

export function removeItemFromEquipment(character, slot) {
  const newChar = character
  newChar.equipment[slot] = null
  return newChar
}

export function replaceEquippedItem(character, item, slot) {
  let newChar = character
  if (newChar.equipment[slot] !== null) {
    const currentEquip = newChar.equipment[slot]
    newChar = removeItemFromEquipment(newChar, slot)
    newChar = addItemToInventory(newChar, currentEquip)
  }
  newChar.equipment[slot] = item
  return newChar
}
