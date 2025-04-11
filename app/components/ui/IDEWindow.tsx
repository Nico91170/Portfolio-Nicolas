"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { X, Maximize2, Minimize2, Code2 } from "lucide-react"

interface IDEWindowProps {
  title: string
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export function IDEWindow({ title, children, onClose, className = "" }: IDEWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-2xl ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      } ${className}`}
    >
      {/* Barre de titre IDE */}
      <div className="bg-gray-800 border-b border-gray-700 p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Code2 size={18} className="text-blue-400 mr-2" />
          <span className="text-gray-300 font-medium">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          {isFullscreen ? (
            <Minimize2 size={18} className="text-gray-400 hover:text-white cursor-pointer" onClick={toggleFullscreen} />
          ) : (
            <Maximize2 size={18} className="text-gray-400 hover:text-white cursor-pointer" onClick={toggleFullscreen} />
          )}
          {onClose && <X size={18} className="text-gray-400 hover:text-white cursor-pointer" onClick={onClose} />}
        </div>
      </div>

      {children}
    </motion.div>
  )
}
