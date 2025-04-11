"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useState, useEffect } from "react"
import { FileCode2, Copy, Check } from "lucide-react"

interface CodeWindowProps {
  title?: string
  content: {
    name: string
    lastName: string
    age: number
    contact: {
      email: string
      phone: string
    }
    passions: string[]
  }
}

export function CodeWindow({ title = "about.ts", content }: CodeWindowProps) {
  const controls = useAnimationControls()
  const [isCopied, setIsCopied] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)

  // Définition des lignes de code avec une structure plus colorée
  const codeLines = [
    {
      content: "const developer = {",
      tokens: [
        { text: "const", class: "text-[#FF79C6] font-bold" },
        { text: " developer ", class: "text-[#50FA7B]" },
        { text: "= ", class: "text-white" },
        { text: "{", class: "text-[#FFB86C]" },
      ],
    },
    {
      content: `  name: "${content.name}",`,
      tokens: [
        { text: "  name", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: `"${content.name}"`, class: "text-[#F1FA8C]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: `  lastName: "${content.lastName}",`,
      tokens: [
        { text: "  lastName", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: `"${content.lastName}"`, class: "text-[#F1FA8C]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: `  age: ${content.age},`,
      tokens: [
        { text: "  age", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: content.age.toString(), class: "text-[#BD93F9]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: "  contact: {",
      tokens: [
        { text: "  contact", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: "{", class: "text-[#FFB86C]" },
      ],
    },
    {
      content: `    email: "${content.contact.email}",`,
      tokens: [
        { text: "    email", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: `"${content.contact.email}"`, class: "text-[#F1FA8C]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: `    phone: "${content.contact.phone}",`,
      tokens: [
        { text: "    phone", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: `"${content.contact.phone}"`, class: "text-[#F1FA8C]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: "  },",
      tokens: [
        { text: "  }", class: "text-[#FFB86C]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: "  passions: [",
      tokens: [
        { text: "  passions", class: "text-[#8BE9FD]" },
        { text: ": ", class: "text-white" },
        { text: "[", class: "text-[#FFB86C]" },
      ],
    },
    ...content.passions.map((passion) => ({
      content: `    "${passion}",`,
      tokens: [
        { text: "    ", class: "text-white" },
        { text: `"${passion}"`, class: "text-[#F1FA8C]" },
        { text: ",", class: "text-white" },
      ],
    })),
    {
      content: "  ],",
      tokens: [
        { text: "  ]", class: "text-[#FFB86C]" },
        { text: ",", class: "text-white" },
      ],
    },
    {
      content: "}",
      tokens: [{ text: "}", class: "text-[#FFB86C]" }],
    },
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (currentLine < codeLines.length && isTyping) {
      timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
      }, 100)
    } else {
      setIsTyping(false)
    }
    return () => clearTimeout(timeout)
  }, [currentLine, codeLines.length, isTyping])

  const handleCopyClick = async () => {
    const codeText = codeLines.map((line) => line.content).join("\n")
    await navigator.clipboard.writeText(codeText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg bg-[#282A36] shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* En-tête style VS Code amélioré */}
      <div className="bg-[#1E1F29] border-b border-[#44475A]">
        <div className="flex items-center px-4 h-9">
          <div className="flex items-center space-x-2 bg-[#282A36] px-3 py-1 rounded-t-lg border-t border-l border-r border-[#44475A]">
            <FileCode2 className="w-4 h-4 text-[#50FA7B]" />
            <span className="text-[#F8F8F2] text-sm">{title}</span>
          </div>
        </div>
        <div className="flex items-center px-4 py-1 text-xs border-t border-[#44475A]">
          <span className="text-[#50FA7B]">portfolio</span>
          <span className="mx-1 text-[#6272A4]">/</span>
          <span className="text-[#FF79C6]">src</span>
          <span className="mx-1 text-[#6272A4]">/</span>
          <span className="text-[#8BE9FD]">{title}</span>
        </div>
      </div>

      {/* Contenu du code avec coloration syntaxique améliorée */}
      <div className="p-4 font-mono text-sm leading-relaxed relative bg-[#282A36]">
        <div className="relative">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={currentLine >= index ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className="relative flex group"
              onMouseEnter={() => setHoveredLine(index)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              {/* Numéro de ligne stylisé */}
              <span className="select-none inline-block w-12 pr-4 text-right text-[#6272A4] border-r border-[#44475A] mr-4">
                {index + 1}
              </span>

              {/* Contenu de la ligne avec tokens colorés */}
              <div className="flex-1">
                <span className="relative">
                  {line.tokens.map((token, tokenIndex) => (
                    <span key={tokenIndex} className={token.class}>
                      {token.text}
                    </span>
                  ))}
                </span>
              </div>

              {/* Effet de survol amélioré */}
              {hoveredLine === index && (
                <motion.div
                  className="absolute inset-0 bg-[#44475A]/30"
                  layoutId="hoverHighlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}

          {/* Curseur de frappe amélioré */}
          {isTyping && (
            <motion.div
              className="absolute w-[2px] h-[18px] bg-[#F8F8F2]"
              style={{
                left: 70 + Math.random() * 200,
                top: currentLine * 21 + 4,
              }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>
      </div>

      {/* Pied de page style VS Code amélioré */}
      <div className="bg-[#191A21] h-6 flex items-center justify-between px-4 text-xs text-[#F8F8F2]">
        <div className="flex items-center space-x-4">
          <span className="text-[#8BE9FD]">TypeScript</span>
          <span className="text-[#FF79C6]">UTF-8</span>
        </div>
        <motion.button
          onClick={handleCopyClick}
          className="flex items-center space-x-1 hover:bg-[#44475A] px-2 py-1 rounded transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCopied ? <Check className="w-3 h-3 text-[#50FA7B]" /> : <Copy className="w-3 h-3 text-[#8BE9FD]" />}
          <span className={isCopied ? "text-[#50FA7B]" : "text-[#8BE9FD]"}>{isCopied ? "Copied!" : "Copy code"}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
