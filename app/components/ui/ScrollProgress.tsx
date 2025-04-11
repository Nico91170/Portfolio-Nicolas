"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PixelHeart } from "./PixelHeart"
import { SECTIONS } from "../../constants/portfolioData"

const sections = SECTIONS.map((section) => section.id)

export function ScrollProgress() {
  const [filledHearts, setFilledHearts] = useState(0)
  const [animatingHeartIndex, setAnimatingHeartIndex] = useState<number | null>(null)

  useEffect(() => {
    let animationCleanup: NodeJS.Timeout

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY
      let newFilledHearts = 0

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollPosition
          const elementBottom = elementTop + rect.height

          if (scrollPosition + viewportHeight * 0.5 > elementTop) {
            newFilledHearts = index + 1
          }
        }
      })

      if (newFilledHearts !== filledHearts) {
        setAnimatingHeartIndex(newFilledHearts - 1)
        clearTimeout(animationCleanup)
        animationCleanup = setTimeout(() => setAnimatingHeartIndex(null), 300)
        setFilledHearts(newFilledHearts)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(animationCleanup)
    }
  }, [filledHearts])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="flex items-center gap-[2px] p-2 bg-black/80 backdrop-blur-sm rounded-lg">
        <AnimatePresence>
          {sections.map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: i * 0.05,
              }}
              className={`relative w-6 h-6 flex items-center justify-center ${
                animatingHeartIndex === i ? "minecraft-damage-effect" : ""
              }`}
            >
              <PixelHeart filled={i < filledHearts} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
