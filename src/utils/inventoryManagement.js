export function addItemToInventory(character, newItem) {
  const { inventory } = character
  const newItemId = newItem.id

  // Iterate through each tab to find a place to stack items
  const tabNames = Object.keys(inventory)
  tabNames.forEach((tabName) => {
    const tab = inventory[tabName]

    const stackableItemIndex = tab.findIndex(
      (item) =>
        item.id === newItemId && item.stack > 1 && item.count < item.stack,
    )

    if (stackableItemIndex !== -1) {
      const stackableItem = tab[stackableItemIndex]
      const remainingSpaceInStack = stackableItem.stack - stackableItem.count

      if (newItem.count <= remainingSpaceInStack) {
        // Fill up the existing stack
        stackableItem.count += newItem.count
        return
      }
      // Fill the existing stack to its max
      stackableItem.count = stackableItem.stack

      // Create a new object to avoid modifying the parameter directly
      const remainingNewItem = { ...newItem }
      remainingNewItem.count -= remainingSpaceInStack
    }
  })

  // If no place to stack items is found, add them to tab1
  inventory.tab1 = inventory.tab1 || []
  inventory.tab1.push({ ...newItem })
}

export function removeItemFromInventory(character, itemId, amountToRemove) {
  const { inventory } = character

  const tabNames = Object.keys(inventory)
  tabNames.forEach((tabName) => {
    const tab = inventory[tabName]
    const itemIndex = tab.findIndex((item) => item.id === itemId)

    if (itemIndex !== -1) {
      if (tab[itemIndex].count <= amountToRemove) {
        // Remove the item if the count is less than or equal to the amount to remove
        tab.splice(itemIndex, 1)
      } else {
        // Ensure the count won't go below zero
        tab[itemIndex].count = Math.max(
          0,
          tab[itemIndex].count - amountToRemove,
        )
      }
    }
  })
}

export function addItemToEquipment(character, newItem) {
  const { inventory } = character
  const newItemId = newItem.id

  const stackableItemIndex = inventory.findIndex(
    (item) => item.id === newItemId && item.stack > 1,
  )

  if (stackableItemIndex !== -1) {
    const stackableItem = inventory[stackableItemIndex]
    const remainingSpaceInStack = stackableItem.stack - stackableItem.count

    if (newItem.count <= remainingSpaceInStack) {
      // Add to existing stack
      stackableItem.count += newItem.count
    } else {
      // Fill the existing stack to its max and create a new stack
      stackableItem.count = stackableItem.stack

      // Create a new object to avoid modifying the parameter directly
      const remainingNewItem = { ...newItem }
      remainingNewItem.count -= remainingSpaceInStack

      inventory.push(remainingNewItem)
    }
  } else {
    // Create a new object to avoid modifying the parameter directly
    inventory.push({ ...newItem })
  }
}

export function removeItemFromEquipment(character, slot, amountToRemove) {
  const { equipment } = character
  if (equipment[slot]) {
    if (equipment[slot].count <= amountToRemove) {
      // Remove the item if the count is less than or equal to the amount to remove
      equipment[slot] = null
    } else {
      // Ensure the count won't go below zero
      equipment[slot].count = Math.max(
        0,
        equipment[slot].count - amountToRemove,
      )
    }
  }
}

export function equipItem(character, item) {
  const { equipment } = character
  const itemSubCategory = item.subcategory

  // Check if the item is equippable
  if (itemSubCategory in equipment) {
    // Unequip any item currently in the slot
    const unequippedItem = equipment[itemSubCategory]
    if (unequippedItem) {
      removeItemFromEquipment(
        character,
        unequippedItem.subcategory,
        unequippedItem.count,
      )
      addItemToInventory(character, unequippedItem)
    }

    // Equip the new item
    equipment[itemSubCategory] = item

    // Remove the equipped item from the inventory
    removeItemFromInventory(character, item.id, 1)
  }
}
