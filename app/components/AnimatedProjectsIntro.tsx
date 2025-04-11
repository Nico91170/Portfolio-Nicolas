"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Code, Smartphone, Lightbulb } from "lucide-react"

export const AnimatedProjectsIntro: React.FC = () => {
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
        className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Découvrez mes dernières réalisations
      </motion.h2>

      <motion.p className="text-lg md:text-xl text-gray-300 mb-8" variants={itemVariants}>
        En développement web et mobile, chaque projet est une opportunité d'apprendre et d'innover.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/20 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Développement Web</h3>
          <p className="text-gray-300">Des sites web modernes et réactifs</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Smartphone className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Applications Mobiles</h3>
          <p className="text-gray-300">Des apps intuitives pour iOS et Android</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-amber-500/10 to-amber-500/20 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Innovation</h3>
          <p className="text-gray-300">Des solutions créatives à chaque défi</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
