"use client"

import { useEffect } from "react"
import { useSectionObserver } from "../../hooks/useSectionObserver"

/**
 * Composant utilitaire qui observe les sections visibles
 */
export function SectionObserver() {
  const activeSection = useSectionObserver()

  useEffect(() => {
    if (activeSection && typeof window !== "undefined") {
      // Mettre à jour l'URL sans déclencher de défilement
      const url = new URL(window.location.href)
      url.hash = activeSection
      window.history.replaceState({}, "", url.toString())
    }
  }, [activeSection])

  // Ce composant ne rend rien visuellement
  return null
}
