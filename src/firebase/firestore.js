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
import firebaseApp from './config'

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

export async function getDocuments(collectionName, query1Key, query1Val) {
  const q = query(
    collection(db, collectionName),
    where(query1Key, '==', query1Val),
  )

  try {
    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map((doc) => doc.data())
    return { result }
  } catch (error) {
    return { error }
  }
}
