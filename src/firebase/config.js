import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAC0yQZeG9rB39xpBxJJq6D4vRsGZs9vCk',
  authDomain: 'flyff-idle.firebaseapp.com',
  projectId: 'flyff-idle',
  storageBucket: 'flyff-idle.appspot.com',
  messagingSenderId: '866070089994',
  appId: '1:866070089994:web:aec739977e69677db2eaf3',
  measurementId: 'G-DTZKXV1QLJ',
}

// Initialize Firebase
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export default firebaseApp
