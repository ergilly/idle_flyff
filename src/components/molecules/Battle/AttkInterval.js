import React, { useState, useEffect, useRef } from 'react'

export function AttkInterval({
  hitsPerSecond,
  calculateDamage,
  combatRunning,
  setCombatRunning,
}) {
  const attkInterval = (1 / hitsPerSecond) * 1000 // Convert to milliseconds
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null) // useRef to store the interval ID

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(intervalRef.current)
          calculateDamage() // Trigger the parent component's function
          return 0 // Reset progress to 0
        }
        return prevProgress + 100 / attkInterval
      })
    }, attkInterval / 100) // Adjust the interval for smoother animation
  }

  const stopAndReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setProgress(0) // Reset progress to 0
    }
  }

  const toggleInterval = () => {
    if (combatRunning) {
      stopAndReset() // Clear the existing interval and reset the progress
      setCombatRunning(false)
    } else {
      setProgress(0) // Reset progress to 0
      stopAndReset() // Clear the existing interval and reset the progress
      startInterval() // Start a new interval
      setCombatRunning(true)
    }
  }

  useEffect(() => {
    if (combatRunning) {
      startInterval()
    } else {
      setProgress(0) // Reset progress to 0
    }

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [attkInterval, calculateDamage])

  return (
    <div className="w-auto mx-2 mt-2">
      <div className="w-full bg-gray-600 rounded-md h-5">
        <div
          className="bg-blue-400 h-5 rounded-md"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-center m-1 text-white text-md font-bold">
        <span>Attack interval: {Math.round(attkInterval)}ms</span>
        <button type="button" onClick={toggleInterval}>
          Toggle
        </button>
      </div>
    </div>
  )
}
