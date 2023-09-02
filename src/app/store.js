import { configureStore } from '@reduxjs/toolkit'
import reducer from '../reducers/reducer.js'

export const store = configureStore({
  reducer: {
    reducer,
  },
})
