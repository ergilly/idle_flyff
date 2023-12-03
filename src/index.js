import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import reducer from './reducers/reducer.js'
import { UserProvider } from './context/userContext.js'
import { CharProvider } from './context/characterContext.js'
import App from './App.js'
import './index.css'
import reportWebVitals from './reportWebVitals.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  // call reducer
  reducer,
  composeEnhancers(applyMiddleware(thunk)),
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <CharProvider>
            <App />
          </CharProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
