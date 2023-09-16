import React, {
  useCallback,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import { CharContext } from '../../context/characterContext.js'
import { logOut } from '../../firebase/auth.js'
import { getImageUrl } from '../../firebase/store.js'
import { Utils } from '../../utils/calc/utils.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function SelectCharacterItem() {
  return (
    <Menu.Item key="selectCharacter">
      {({ active }) => (
        <button
          type="button"
          className={classNames(
            active ? 'bg-gray-50' : '',
            'block px-3 py-1 text-sm leading-6 text-gray-900',
          )}
        >
          Character Select
        </button>
      )}
    </Menu.Item>
  )
}

export function HeaderBar({ setSidebarOpen }) {
  const {
    character: { name, jobId, selected },
  } = useContext(CharContext)
  const [jobImageSrc, setJobImageSrc] = useState('')

  async function fetchJobImage() {
    if (jobId) {
      const jobName = await Utils.getJobName(`${jobId}`)
      const src = await getImageUrl(
        'class/target/',
        `${jobName.toLowerCase()}.png`,
      )
      setJobImageSrc(src)
    }
  }

  useEffect(() => {
    fetchJobImage()
  }, [jobId])

  const requestLogout = useCallback(() => {
    logOut()
  }, [])

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <span htmlFor="search-field" className="sr-only">
            Search
          </span>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src={jobImageSrc}
                alt="Profile"
              />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {name}
                </span>
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item key="yourProfile">
                  {({ active }) => (
                    <button
                      type="button"
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900',
                      )}
                    >
                      Your Profile
                    </button>
                  )}
                </Menu.Item>
                {selected && <SelectCharacterItem />}
                <Menu.Item key="signOut">
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={requestLogout}
                      className={classNames(
                        active ? 'bg-gray-50' : '',
                        'block px-3 py-1 text-sm leading-6 text-gray-900',
                      )}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
