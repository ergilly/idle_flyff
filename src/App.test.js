import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  const learnReactLink = getByText(/Learn React/i)
  expect(learnReactLink).toBeInTheDocument()
})
