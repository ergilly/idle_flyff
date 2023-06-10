import {
  getFirestore,
  doc,
  setDoc,
  collection,
  where,
  query,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import firebase_app from './config'

const db = getFirestore(firebase_app)

export async function addData(collection, id, data) {
  let result = null
  let error = null

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    })
  } catch (e) {
    error = e
  }

  return { result, error }
}

export async function getData(collection, id) {
  const docRef = doc(db, collection, id)

  let result = null
  let error = null

  try {
    result = await getDoc(docRef)
  } catch (e) {
    error = e
  }

  return { result, error }
}

export async function getDocument(col, query1Key, query1Val) {
  const q = query(collection(db, col), where(query1Key, '==', query1Val))

  let querySnapshot = null
  const result = []
  let error = null

  try {
    querySnapshot = await getDocs(q)
  } catch (e) {
    error = e
  }

  querySnapshot.forEach((doc) => {
    result.push(doc.data())
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
  })

  return { result, error }
}
