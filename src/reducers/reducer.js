const reducer = (action, state = []) => {
  switch (action) {
    case 'ADD_ITEMS':
      return [...state, ...action]
    default:
      return state
  }
}

export default reducer
