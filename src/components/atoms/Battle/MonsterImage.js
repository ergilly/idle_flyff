import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../../firebase/store.js'

export function MonsterImage({ monster, classNames }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchUrl() {
      const imageUrl = await getImageUrl('monster/', monster.icon)
      if (isMounted) {
        setSrc(imageUrl)
      }
    }

    if (monster) {
      fetchUrl()
    }

    return () => {
      isMounted = false
    }
  }, [monster])

  return <img src={src} alt={monster?.name?.en} className={classNames} />
}
