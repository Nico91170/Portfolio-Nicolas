"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Gamepad, Code, Palette } from "lucide-react"

export const AnimatedGameDevIntro: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto text-center py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Plongez dans mes créations ludiques
      </motion.h2>

      <motion.p className="text-lg md:text-xl text-gray-300 mb-8" variants={itemVariants}>
        Le développement de jeux vidéo, là où la créativité rencontre la technologie pour créer des expériences uniques.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-gradient-to-br from-purple-500/10 to-purple-500/20 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Gamepad className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Gameplay Innovant</h3>
          <p className="text-gray-300">Des mécaniques de jeu uniques et captivantes</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-pink-500/10 to-pink-500/20 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Code className="w-12 h-12 text-pink-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Technologies Avancées</h3>
          <p className="text-gray-300">Utilisation des derniers outils et frameworks</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/20 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Palette className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Direction Artistique</h3>
          <p className="text-gray-300">Des univers visuels immersifs et uniques</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
