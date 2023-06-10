import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../firebase/storage'

export function ItemImage({ item, classNames }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    async function fetchUrl() {
      const src = await getImageUrl('item/', `${item.id}-${item.icon}`)
      setSrc(src)
    }
    fetchUrl()
  }, [item])

  return <img src={src} alt={item.name.en} className={classNames} />
}
