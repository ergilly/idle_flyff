import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../firebase/storage'

export function ItemImage({ item, classNames }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchUrl() {
      const imageUrl = await getImageUrl('item/', `${item.id}-${item.icon}`)
      if (isMounted) {
        setSrc(imageUrl)
      }
    }

    if (item) {
      fetchUrl()
    }

    return () => {
      isMounted = false
    }
  }, [item])

  return <img src={src} alt={item?.name?.en} className={classNames} />
}
