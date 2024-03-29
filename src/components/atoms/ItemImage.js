import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../firebase/store.js'

export function ItemImage({ item, classNames, icon }) {
  const [src, setSrc] = useState('')

  const route = icon ? 'app/icons/' : 'item/'
  const fileName = icon ? item : `${item.id}-${item.icon}`

  useEffect(() => {
    let isMounted = true

    async function fetchUrl() {
      const imageUrl = await getImageUrl(route, fileName)
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
