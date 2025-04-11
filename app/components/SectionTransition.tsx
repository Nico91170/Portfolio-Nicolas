"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionTransitionProps {
  children: ReactNode
  id: string
}

export function SectionTransition({ children, id }: SectionTransitionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: [0.17, 0.55, 0.55, 1],
      }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.section>
  )
}
