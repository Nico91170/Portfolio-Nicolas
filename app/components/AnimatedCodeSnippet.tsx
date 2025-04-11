"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeSnippetProps {
  language: string
  code: string
  fileName?: string
}

export function AnimatedCodeSnippet({ language, code, fileName }: CodeSnippetProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
      {/* En-tête du snippet */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
        {fileName && <span className="text-sm text-gray-400 font-mono">{fileName}</span>}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{language}</span>
          <button onClick={handleCopy} className="p-1 hover:bg-gray-700 rounded transition-colors">
            {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Corps du snippet */}
      <pre className="bg-[#1a1b26] p-4 rounded-b-lg overflow-x-auto">
        <code className="text-gray-300 font-mono">
          {code.split("\n").map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Numéro de ligne */}
              <span className="inline-block w-8 text-gray-600 select-none">{i + 1}</span>
              {/* Code */}
              <span className="relative">
                {line}
                {/* Effet de survol */}
                <motion.div
                  className="absolute inset-0 bg-gray-700/20 opacity-0 group-hover:opacity-100 -mx-4 px-4"
                  layoutId={`line-${i}`}
                />
              </span>
            </motion.div>
          ))}
        </code>
      </pre>
    </motion.div>
  )
}
