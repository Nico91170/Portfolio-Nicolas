"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Link } from "react-scroll"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu } from "lucide-react"
import { SECTIONS } from "../../constants/portfolioData"
import { useSectionObserver } from "../../hooks/useSectionObserver"

// Définition des éléments de navigation
const navigationItems = SECTIONS

/**
 * Composant Header
 * Gère l'affichage et le comportement de l'en-tête du site
 */
export function Header() {
  // États pour gérer l'ouverture du menu mobile et le défilement
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useSectionObserver()

  // Gestion du défilement pour l'effet de fond
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mémoisation des éléments de navigation pour optimiser les performances
  const memoizedNavigationItems = useMemo(() => navigationItems, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 font-mono ${
        scrolled ? "bg-[#1a1b26]/95 backdrop-blur-md" : "bg-[#1a1b26]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Barre supérieure */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span>main</span>
            <span>Break</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-gray-800/50 text-sm pl-10 pr-4 py-1 rounded-md w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Section du logo */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="relative w-10 h-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pp-w2GG1DuljKwkZI0wCuoAPwbprQNHF2.png"
                  alt="Nicolas Pires De Jesus"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full ring-2 ring-blue-500/20"
                />
              </div>
            </motion.div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-[#61afef]">class</span>
              <span className="text-[#98c379]">Nicolas</span>
              <span className="text-[#61afef]">{"{"}</span>
            </div>
          </motion.div>

          {/* Navigation pour desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {memoizedNavigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <Link
                  to={item.id}
                  smooth={true}
                  duration={500}
                  className={`
                    group relative px-4 py-2 transition-all duration-300
                    font-mono text-sm flex items-center space-x-2
                    ${activeSection === item.id ? "text-[#98c379]" : "text-gray-400 hover:text-[#98c379]"}
                  `}
                  spy={true}
                >
                  <span className="text-[#61afef]">public</span>
                  <span>{item.label}</span>
                  <span className="text-[#61afef]">()</span>

                  {/* Effet de survol */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#98c379]/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    layoutId="navIndicator"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bouton du menu mobile */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="w-6 h-6 text-[#98c379]" />
          </motion.button>
        </div>

        {/* Navigation mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="bg-[#1a1b26] rounded-lg border border-gray-800 overflow-hidden">
                {memoizedNavigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      to={item.id}
                      smooth={true}
                      duration={500}
                      className={`
                        block px-4 py-3 transition-colors font-mono text-sm
                        ${
                          activeSection === item.id
                            ? "text-[#98c379] bg-[#98c379]/10"
                            : "text-gray-400 hover:text-[#98c379] hover:bg-[#98c379]/5"
                        }`}
                      onClick={() => setIsOpen(false)}
                      spy={true}
                    >
                      <span className="text-[#61afef]">public</span> <span>{item.label}</span>
                      <span className="text-[#61afef]">()</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
