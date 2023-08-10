import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { ItemImage } from '../atoms/ItemImage.js'

const initialNavigation = [
  { name: 'Character', href: '/character', icon: 'rpg.png', current: true },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: 'backpack.png',
    current: false,
  },
  { name: 'Battle', href: '/battle', icon: 'slash.png', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const handleOnClick = (navigate, navigation, setNavigation, item) => {
  let newNavigation = [...navigation]
  newNavigation = newNavigation.map((element) => {
    if (element.name !== item.name) {
      return { ...element, current: false }
    }
    return { ...element, current: true }
  })
  setNavigation(newNavigation)
  navigate(item.href)
}

export function NavBar() {
  const [navigation, setNavigation] = useState(initialNavigation)
  const navigate = useNavigate()

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() =>
                      handleOnClick(navigate, navigation, setNavigation, item)
                    }
                    className={classNames(
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold',
                    )}
                  >
                    <ItemImage
                      item={item.icon}
                      classNames="item-image h-8 w-8"
                      icon
                    />
                    <span className="py-1">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-auto">
            <button
              type="button"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
