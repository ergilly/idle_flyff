import {
  addItemToInventory,
  removeItemFromInventory,
  addItemToEquipment,
  removeItemFromEquipment,
  equipItem,
} from './inventoryManagement.js'

describe('addItemToInventory', () => {
  test('should add a new item to the inventory', () => {
    const characterData = {
      inventory: [],
      equipment: {
        boots: null,
        gauntlet: null,
      },
    }
    const newItem = {
      id: 1,
      category: 'armor',
      stack: 5,
      count: 2,
    }
    addItemToInventory(characterData, newItem)
    expect(characterData.inventory).toHaveLength(1)
    expect(characterData.inventory[0].id).toBe(newItem.id)
  })

  test('should stack items with count property if item already exists and count is less than stack', () => {
    const characterData = {
      inventory: [
        {
          id: 1,
          category: 'armor',
          stack: 5,
          count: 2,
        },
      ],
      equipment: {
        boots: null,
        gauntlet: null,
      },
    }
    const newItem = {
      id: 1,
      category: 'armor',
      stack: 5,
      count: 2,
    }
    // Add the same item again with a count less than the stack
    newItem.count = 3
    addItemToInventory(characterData, newItem)

    expect(characterData.inventory).toHaveLength(1)
    expect(characterData.inventory[0].count).toBe(5) // 2 (existing) + 3 (new)
  })

  test('should not stack items if count is greater than or equal to stack', () => {
    const characterData = {
      inventory: [
        {
          id: 1,
          category: 'armor',
          stack: 5,
          count: 2,
        },
      ],
      equipment: {
        boots: null,
        gauntlet: null,
      },
    }
    const newItem = {
      id: 1,
      category: 'armor',
      stack: 5,
      count: 2,
    }
    // Add the same item again with a count equal to the stack
    newItem.count = 5
    addItemToInventory(characterData, newItem)

    expect(characterData.inventory).toHaveLength(2)
    expect(characterData.inventory[0].count).toBe(5)
    expect(characterData.inventory[1].count).toBe(2)
  })

  test('should add a new item if stack property is not more than 1', () => {
    const characterData = {
      inventory: [
        {
          id: 1,
          category: 'armor',
          stack: 1,
          count: 2,
        },
      ],
      equipment: {
        boots: null,
        gauntlet: null,
      },
    }
    const newItem = {
      id: 1,
      category: 'armor',
      stack: 1,
      count: 2,
    }

    // Update newItem stack property to 1
    newItem.stack = 1

    // Add the same item again
    addItemToInventory(characterData, newItem)

    expect(characterData.inventory).toHaveLength(2)
  })
})

describe('removeItemFromInventory', () => {
  const characterData = {
    inventory: [
      {
        id: 1,
        category: 'armor',
        stack: 5,
        count: 2,
      },
    ],
    equipment: {
      boots: null,
      gauntlet: null,
    },
  }
  const newItem = {
    id: 1,
    category: 'armor',
    stack: 5,
    count: 2,
  }

  test('should remove entire item if count is equal to the amountToRemove', () => {
    // Remove the entire item
    removeItemFromInventory(characterData, newItem.id, 2)

    expect(characterData.inventory).toHaveLength(0)
  })

  test('should reduce item count if amountToRemove is less than the count', () => {
    // Add an item to the inventory first
    addItemToInventory(characterData, newItem)

    // Remove a smaller amount than the count
    removeItemFromInventory(characterData, newItem.id, 1)

    expect(characterData.inventory).toHaveLength(1)
    expect(characterData.inventory[0].count).toBe(1)
  })
})

describe('removeItemFromEquipment', () => {
  test('should remove item from equipment slot if count is less than or equal to amount to remove', () => {
    const characterData = {
      equipment: {
        boots: {
          id: 1,
          count: 2,
          // ... other item properties
        },
        gauntlet: null,
        // ... other equipment slots
      },
    }

    removeItemFromEquipment(characterData, 'boots', 2)

    expect(characterData.equipment.boots).toBeNull()
  })

  test('should decrease item count in equipment slot if count is greater than amount to remove', () => {
    const characterData = {
      equipment: {
        boots: {
          id: 1,
          count: 5,
          // ... other item properties
        },
        gauntlet: null,
        // ... other equipment slots
      },
    }

    removeItemFromEquipment(characterData, 'boots', 3)

    expect(characterData.equipment.boots.count).toBe(2)
  })

  test('should set item count to 0 and remove item if count becomes 0', () => {
    const characterData = {
      equipment: {
        boots: {
          id: 1,
          count: 2,
          // ... other item properties
        },
        gauntlet: null,
        // ... other equipment slots
      },
    }

    removeItemFromEquipment(characterData, 'boots', 2)

    expect(characterData.equipment.boots).toBeNull()
  })
})

describe('equipItem', () => {
  test('should equip an item and move it from inventory to equipment', () => {
    const characterData = {
      inventory: [
        {
          id: 1,
          category: 'armor',
          subcategory: 'boots',
          stack: 1,
          count: 1,
        },
      ],
      equipment: {
        boots: null,
        gauntlet: null,
      },
    }
    const newItem = {
      id: 1,
      category: 'armor',
      subcategory: 'boots',
      stack: 1,
      count: 1,
    }

    // Equip the item
    equipItem(characterData, characterData.inventory[0])

    // Check if the item is equipped
    expect(characterData.equipment.boots).toEqual(newItem)
    expect(characterData.inventory).toHaveLength(0)
  })

  test('should unequip the existing item in the slot and move it to inventory', () => {
    const characterData = {
      inventory: [
        {
          id: 1,
          category: 'armor',
          subcategory: 'boots',
          stack: 1,
          count: 1,
        },
      ],
      equipment: {
        boots: {
          id: 5,
          category: 'armor',
          subcategory: 'boots',
          stack: 1,
          count: 1,
        },
        gauntlet: null,
      },
    }
    const newItem = {
      id: 1,
      category: 'armor',
      subcategory: 'boots',
      stack: 1,
      count: 1,
    }
    const currentEquip = {
      id: 5,
      category: 'armor',
      subcategory: 'boots',
      stack: 1,
      count: 1,
    }

    // Equip the new item, which should unequip the existing item
    equipItem(characterData, characterData.inventory[0])

    // Check if the new item is equipped and the existing item is in the inventory
    expect(characterData.equipment.boots).toEqual(newItem)
    expect(characterData.inventory).toHaveLength(1)
    expect(characterData.inventory[0]).toEqual(currentEquip)
  })
})
