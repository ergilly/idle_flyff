import {
  getAuth,
  sendPasswordResetEmail,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import firebase_app from './config'

const auth = getAuth(firebase_app)

export async function getCurrentUser() {
  return auth.currentUser
}

export async function resetPassword(email) {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export async function setUsername(username) {
  return new Promise((resolve, reject) => {
    updateProfile(auth.currentUser, { displayName: username })
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export async function signIn(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export async function logOut() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export async function signup(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}

export async function verifyEmail() {
  return new Promise((resolve, reject) => {
    sendEmailVerification(auth.currentUser)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
