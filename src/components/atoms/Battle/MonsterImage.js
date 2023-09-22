import React, { useEffect, useState } from 'react'
import { getImageUrl } from '../../../firebase/store.js'

export function MonsterImage({ monsterData, classNames }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchUrl() {
      const imageUrl = await getImageUrl('monster/', monsterData.icon)
      if (isMounted) {
        setSrc(imageUrl)
      }
    }

    if (monsterData) {
      fetchUrl()
    }

    return () => {
      isMounted = false
    }
  }, [monsterData])

  return <img src={src} alt={monsterData?.name?.en} className={classNames} />
}
