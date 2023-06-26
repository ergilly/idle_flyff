import {
  addItemToInventory,
  removeItemFromInventory,
  addItemToEquipment,
  removeItemFromEquipment,
  replaceEquippedItem,
} from './inventoryManagement' // Replace with the actual file name

// Example test cases for the addItemToInventory function
describe('addItemToInventory', () => {
  test('should add item to inventory when no existing item is found', () => {
    const character = {
      inventory: {
        tab1: [],
      },
      equipment: {},
    }
    const item = { id: 'item1', stack: 1 }
    const expectedCharacter = {
      inventory: {
        tab1: [item],
      },
      equipment: {},
    }
    expect(addItemToInventory(character, item)).toEqual(expectedCharacter)
  })

  test('should merge item count when an existing item is found', () => {
    const character = {
      equipment: {},
      inventory: {
        tab1: [
          {
            id: 'item1',
            count: 3,
          },
          {
            id: 'item2',
            count: 1,
          },
        ],
      },
    }
    const item = {
      id: 'item1',
      count: 2,
    }
    const expectedCharacter = {
      equipment: {},
      inventory: {
        tab1: [
          {
            id: 'item1',
            count: 5,
          },
          {
            id: 'item2',
            count: 1,
          },
        ],
      },
    }
    expect(addItemToInventory(character, item)).toEqual(expectedCharacter)
  })
})

// Example test cases for the removeItemFromInventory function
describe('removeItemFromInventory', () => {
  test('should remove item from inventory when an existing item is found', () => {
    const character = {
      equipment: {},
      inventory: {
        tab1: [
          {
            id: 'item1',
            count: 3,
          },
          {
            id: 'item2',
            count: 1,
          },
        ],
      },
    }
    const item = {
      id: 'item2',
    }
    const count = 1
    const expectedCharacter = {
      equipment: {},
      inventory: {
        tab1: [
          {
            id: 'item1',
            count: 3,
          },
        ],
      },
    }
    expect(removeItemFromInventory(character, item, count)).toEqual(
      expectedCharacter,
    )
  })

  test('should remove item from inventory when item count becomes zero', () => {
    const character = {
      equipment: {},
      inventory: {
        tab1: [
          {
            id: 'item1',
            count: 3,
          },
          {
            id: 'item2',
            count: 1,
          },
        ],
      },
    }
    const item = {
      id: 'item2',
    }
    const count = 1
    const expectedCharacter = {
      equipment: {},
      inventory: {
        tab1: [
          {
            id: 'item1',
            count: 3,
          },
        ],
      },
    }
    expect(removeItemFromInventory(character, item, count)).toEqual(
      expectedCharacter,
    )
  })
})

// Example test cases for the addItemToEquipment function
describe('addItemToEquipment', () => {
  test('should add item to equipment slot', () => {
    const character = {
      inventory: {},
      equipment: {},
    }
    const item = { id: 'item1' }
    const slot = 'head'
    const expectedCharacter = {
      inventory: {},
      equipment: {
        head: { id: 'item1' },
      },
    }
    expect(addItemToEquipment(character, item, slot)).toEqual(expectedCharacter)
  })
})

// Example test cases for the removeItemFromEquipment function
describe('removeItemFromEquipment', () => {
  test('should remove item from equipment slot', () => {
    const character = {
      inventory: {},
      equipment: {
        head: { id: 'item1' },
      },
    }
    const slot = 'head'
    const expectedCharacter = {
      inventory: {},
      equipment: {
        head: null,
      },
    }
    expect(removeItemFromEquipment(character, slot)).toEqual(expectedCharacter)
  })
})

// Example test cases for the replaceEquippedItem function
describe('replaceEquippedItem', () => {
  test('should replace equipped item and move the existing item to inventory', () => {
    const character = {
      inventory: {
        tab1: [],
      },
      equipment: {
        head: { id: 'existingItem' },
      },
    }
    const item = { id: 'newItem' }
    const slot = 'head'
    const expectedCharacter = {
      inventory: {
        tab1: [{ id: 'existingItem' }],
      },
      equipment: {
        head: { id: 'newItem' },
      },
    }
    expect(replaceEquippedItem(character, item, slot)).toEqual(
      expectedCharacter,
    )
  })
})
