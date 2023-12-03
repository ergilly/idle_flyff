const initialState = null
// Reducer
// eslint-disable-next-line
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHARACTER':
      console.log(action.character)
      return action.character
    case 'SET_CHARACTER_STATS': {
      const newState = {
        ...state,
        stats: action.stats,
      }
      return newState
    }
    default:
      return state
  }
}

export default reducer
