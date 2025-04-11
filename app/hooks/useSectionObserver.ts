"use client"

import { useState, useEffect } from "react"
import { SECTIONS } from "../constants/portfolioData"

/**
 * Hook personnalisé pour observer quelle section est actuellement visible
 * @returns {string} L'ID de la section actuellement visible
 */
export function useSectionObserver(): string {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const current = SECTIONS.find(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current.id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Vérification initiale

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return activeSection
}
