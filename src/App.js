import React, { Fragment, useState, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { InventoryPage } from './components/pages/InventoryPage.js'
import { BattlePage } from './components/pages/BattlePage.js'
import { CharacterPage } from './components/pages/CharacterPage.js'
import { NavBar } from './components/organisms/NavBar.js'
import { HeaderBar } from './components/organisms/HeaderBar.js'
import { CharContext } from './context/characterContext.js'
import { Utils } from './utils/calc/utils.js'

function App() {
  const {
    character,
    character: {
      name,
      uid,
      action,
      selected,
      lastOnline,
      level,
      sex,
      jobId,
      stats,
      penya,
      inventory,
      equipment,
    },
  } = useContext(CharContext)
  const dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stateLoaded, setStateLoaded] = useState(false)

  useEffect(() => {
    let isMounted = true
    const createCharacterData = async () => {
      const charData = await Utils.getJobFromId(jobId, [
        name,
        uid,
        action,
        selected,
        lastOnline,
        level,
        sex,
        jobId,
        null, // constants
        null, // img
        stats,
        penya,
        inventory,
        equipment,
        null, // armorSet
        [], // buffsArray
        [], // skillsArray
      ])
      if (isMounted) {
        await charData.initialize()
        await charData.update()
        await Promise.all([
          dispatch({
            type: 'SET_CHARACTER',
            character: charData,
          }),
          setStateLoaded(true),
        ])
      }
    }
    createCharacterData()
    return () => {
      isMounted = false
    }
  }, [])
  if (!stateLoaded) {
    return <div id="Loading">Loading ...</div>
  }

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <NavBar />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <NavBar />
      </div>

      <div className="lg:pl-72">
        <HeaderBar setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route path="/character" element={<CharacterPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/battle" element={<BattlePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
