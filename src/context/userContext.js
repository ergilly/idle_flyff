import React, { useCallback, useEffect, useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { SignInView } from './userContext/signInView.js'
import { SignUpView } from './userContext/signUpView.js'
import { signIn, signup, setUsername, verifyEmail } from '../firebase/auth.js'
import firebase_app from '../firebase/config.js'
import { addData, getData } from '../firebase/firestore.js'

const auth = getAuth(firebase_app)
export const UserContext = React.createContext({})

function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user.uid)
      console.log(await getData('user', user.uid))
      const { result, error } = await getData('user', user.uid)
      if (error) {
        return console.log(error)
      }
      console.log(result)
      if (result === undefined) {
        const { res, err } = await addData('user', user.uid, {
          characters: [],
          displayName: user.displayName,
        })
        if (err) {
          return console.log(err)
        }
      }
      callback({ loggedIn: true, ...user })
    } else {
      callback({ loggedIn: false })
    }
    return null
  })
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({ loggedIn: false })
  const [signUp, setSignUp] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser)
    return () => {
      unsubscribe()
    }
  }, [])

  const requestLogin = useCallback((email, password) => {
    signIn(email, password)
      .then(() => {
        setError('')
      })
      .catch((error) => setError(error.code))
  }, [])

  const requestSignUp = useCallback(async (username, email, password) => {
    try {
      await signup(email, password)
      await setUsername(username)
      await verifyEmail()
      setSignUp(false)
      setError('')
    } catch (error) {
      setError(error.code)
    }
  }, [])

  if (!user.loggedIn) {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fog_flyff-transformed.jpg?alt=media&token=574c202d-d695-4481-85bd-8fcdb197fb79')] bg-no-repeat bg-cover bg-center">
        {signUp ? (
          <SignUpView
            setSignUp={setSignUp}
            onClick={requestSignUp}
            error={error}
          />
        ) : (
          <SignInView
            setSignUp={setSignUp}
            onClick={requestLogin}
            error={error}
          />
        )}
      </div>
    )
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
