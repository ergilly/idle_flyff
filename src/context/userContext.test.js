import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { UserProvider, UserContext } from './UserProvider'

// Mock firebase/auth functions
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  getAuth: jest.fn(),
}))
jest.mock('../firebase/auth', () => ({
  signIn: jest.fn(),
  signup: jest.fn(),
  setUsername: jest.fn(),
  verifyEmail: jest.fn(),
}))

describe('UserProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders SignInView when user is not logged in', () => {
    const { getByText } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            return <div>{value.loggedIn ? 'Logged In' : 'Not Logged In'}</div>
          }}
        </UserContext.Consumer>
      </UserProvider>,
    )

    expect(getByText('Not Logged In')).toBeInTheDocument()
    expect(getByText('Sign In')).toBeInTheDocument()
  })

  test('renders SignUpView when signUp state is true', () => {
    const { getByText } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            return <div>{value.loggedIn ? 'Logged In' : 'Not Logged In'}</div>
          }}
        </UserContext.Consumer>
      </UserProvider>,
    )

    fireEvent.click(getByText('Sign Up'))

    expect(getByText('Sign Up')).toBeInTheDocument()
  })

  test('calls requestLogin function on sign in button click', () => {
    const { getByText, getByPlaceholderText } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            return <div>{value.loggedIn ? 'Logged In' : 'Not Logged In'}</div>
          }}
        </UserContext.Consumer>
      </UserProvider>,
    )

    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const signInButton = getByText('Sign In')

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(signInButton)
    })

    expect(signIn).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  test('calls requestSignUp function on sign up button click', () => {
    const { getByText, getByPlaceholderText } = render(
      <UserProvider>
        <UserContext.Consumer>
          {(value) => {
            return <div>{value.loggedIn ? 'Logged In' : 'Not Logged In'}</div>
          }}
        </UserContext.Consumer>
      </UserProvider>,
    )

    fireEvent.click(getByText('Sign Up'))

    const usernameInput = getByPlaceholderText('Username')
    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const signUpButton = getByText('Sign Up')

    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.click(signUpButton)
    })

    expect(signup).toHaveBeenCalledWith('test@example.com', 'password123')
    expect(setUsername).toHaveBeenCalledWith('testuser')
    expect(verifyEmail).toHaveBeenCalled()
  })
})
