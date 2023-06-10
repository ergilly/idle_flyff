import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import firebase_app from './config'

export async function getImageUrl(route, imageName) {
  const storage = getStorage(firebase_app)
  const starsRef = ref(storage, `images/${route}${imageName}`)

  return new Promise((resolve, reject) => {
    getDownloadURL(starsRef)
      .then((url) => resolve(url))
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            reject(error)
            break
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            reject(error)
            break
          case 'storage/canceled':
            // User canceled the upload
            reject(error)
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            reject(error)
            break
          default:
            break
        }
      })
  })
}
