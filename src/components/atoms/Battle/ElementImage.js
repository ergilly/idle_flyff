import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../../firebase/storage'

export function ElementImage({ element, classNames }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchUrl() {
      const imageUrl = await getImageUrl('element/pc/', `${element}.png`)
      if (isMounted) {
        setSrc(imageUrl)
      }
    }

    if (element) {
      fetchUrl()
    }

    return () => {
      isMounted = false
    }
  }, [element])

  return <img src={src} alt={element} className="h-6 w-6 mx-2" />
}
