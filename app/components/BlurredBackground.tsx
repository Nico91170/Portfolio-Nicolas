"use client"

import { motion } from "framer-motion"
import type React from "react"

export const BlurredBackground: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[-1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 backdrop-blur-[100px]" />
    </motion.div>
  )
}
