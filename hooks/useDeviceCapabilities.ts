"use client"

import { useState, useEffect } from "react"

export function useDeviceCapabilities() {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    const checkPerformance = () => {
      if ("hardwareConcurrency" in navigator) {
        setIsLowPowerMode(navigator.hardwareConcurrency <= 4)
      } else {
        setIsLowPowerMode(false)
      }
    }

    checkPerformance()
    window.addEventListener("devicemotion", checkPerformance)

    return () => {
      window.removeEventListener("devicemotion", checkPerformance)
    }
  }, [])

  return { isLowPowerMode }
}
