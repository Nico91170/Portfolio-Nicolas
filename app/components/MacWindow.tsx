"use client"

import type React from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface MacWindowProps {
  children: ReactNode
  title: string
}

export const MacWindow: React.FC<MacWindowProps> = ({ children, title }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-900 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
        </div>
        <h3 className="text-white text-sm font-medium ml-4">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  )
}
