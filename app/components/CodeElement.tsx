"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import type React from "react" // Added import for React

interface CodeElementProps {
  code: string
  x: string
  y: string
  rotate?: number
  scale?: number
  color?: string
}

export const CodeElement: React.FC<CodeElementProps> = ({
  code,
  x,
  y,
  rotate = 0,
  scale = 1,
  color = "text-blue-400",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      className={`absolute ${color} text-sm font-mono opacity-20 pointer-events-none select-none`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isVisible ? { opacity: 0.2, scale, rotate } : {}}
      transition={{ duration: 0.5 }}
    >
      {code}
    </motion.div>
  )
}
