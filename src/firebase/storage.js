import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import firebaseApp from './config'

export function getImageUrl(route, imageName) {
  const storage = getStorage(firebaseApp)
  const storageRef = ref(storage, `images/${route}${imageName}`)

  return getDownloadURL(storageRef)
}
