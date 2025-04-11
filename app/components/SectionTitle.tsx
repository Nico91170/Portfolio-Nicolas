"use client"

import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
}

export function SectionTitle({ title }: SectionTitleProps) {
  return (
    <motion.div
      className="mb-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative inline-block">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-75 filter blur-lg"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white px-6 py-3 rounded-lg bg-gray-900 bg-opacity-75 border border-blue-500/30">
          <span className="text-blue-400">{`<`}</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-blue-400"
          >
            {` />`}
          </motion.span>
        </h2>
      </div>
      <motion.div
        className="mt-4 text-gray-400 font-mono"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {`// Explorez cette section`}
      </motion.div>
    </motion.div>
  )
}
