"use client"

import { useState, useEffect, useRef } from "react"

interface Command {
  command: string
  output: string
}

interface TerminalProps {
  commands?: Command[]
  prompt?: string
  autoStart?: boolean
  typingSpeed?: number
}

export function Terminal({
  commands = [],
  prompt = "user@portfolio:~$",
  autoStart = false,
  typingSpeed = 50,
}: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: "command" | "output"; text: string }>>([])
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Fonction pour démarrer l'animation de frappe
  const startTyping = () => {
    // Vérifier que commands existe et n'est pas vide
    if (!commands || commands.length === 0) {
      setIsComplete(true)
      return
    }

    if (currentCommandIndex >= commands.length) {
      setIsComplete(true)
      return
    }

    setIsTyping(true)
  }

  // Effet pour gérer l'animation de frappe
  useEffect(() => {
    if (autoStart && !isTyping && !isComplete && currentCommandIndex === 0) {
      setTimeout(() => {
        startTyping()
      }, 500)
    }
  }, [autoStart, isTyping, isComplete, currentCommandIndex])

  // Effet pour animer la frappe des commandes
  useEffect(() => {
    if (!isTyping || !commands || commands.length === 0) return

    const currentCommand = commands[currentCommandIndex]?.command

    if (!currentCommand) {
      setIsTyping(false)
      return
    }

    if (currentCharIndex < currentCommand.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else {
      setHistory((prev) => [...prev, { type: "command", text: currentCommand }])

      setTimeout(() => {
        setHistory((prev) => [...prev, { type: "output", text: commands[currentCommandIndex]?.output || "" }])

        setCurrentCharIndex(0)
        setCurrentCommandIndex((prev) => prev + 1)

        if (currentCommandIndex + 1 < commands.length) {
          setTimeout(() => {
            setIsTyping(true)
          }, 1000)
        } else {
          setIsComplete(true)
        }

        setIsTyping(false)
      }, 500)
    }
  }, [isTyping, currentCharIndex, currentCommandIndex, commands, typingSpeed])

  // Effet pour faire défiler le terminal vers le bas
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <div
      ref={terminalRef}
      className="font-mono text-sm text-gray-300 h-full overflow-auto"
      style={{
        backgroundColor: "#1e1e1e",
        maxHeight: "100%",
      }}
    >
      {history.map((item, index) => (
        <div key={index} className="mb-1">
          {item.type === "command" ? (
            <div>
              <span className="text-green-400">{prompt}</span> <span>{item.text}</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap pl-2">{item.text}</div>
          )}
        </div>
      ))}

      {isTyping && commands && commands.length > 0 && (
        <div>
          <span className="text-green-400">{prompt}</span>{" "}
          <span>{commands[currentCommandIndex]?.command.substring(0, currentCharIndex)}</span>
          <span className="animate-pulse">▋</span>
        </div>
      )}

      {!isTyping && !isComplete && currentCommandIndex === 0 && !autoStart && commands && commands.length > 0 && (
        <button
          onClick={startTyping}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs mt-2"
        >
          Exécuter les commandes
        </button>
      )}
    </div>
  )
}
