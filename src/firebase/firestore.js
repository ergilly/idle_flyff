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
import firebaseApp from './config.js'

const db = getFirestore(firebaseApp)

export async function addData(collectionName, documentId, documentData) {
  try {
    await setDoc(doc(db, collectionName, documentId), documentData, {
      merge: true,
    })
    return { success: true }
  } catch (error) {
    return { error }
  }
}

export async function getData(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId)

  try {
    const documentSnapshot = await getDoc(docRef)
    return { result: documentSnapshot.data() }
  } catch (error) {
    return { error }
  }
}

export async function getDataByField(collectionName, field, evaluator, value) {
  const queryRef = collection(db, collectionName)
  const q = await query(queryRef, where(field, evaluator, value))

  try {
    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map((doc) => doc.data())
    return { result }
  } catch (error) {
    return { error }
  }
}

export async function getDocuments(collectionName) {
  const q = query(collection(db, collectionName))

  try {
    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map((doc) => doc.data())
    return { result }
  } catch (error) {
    return { error }
  }
}
