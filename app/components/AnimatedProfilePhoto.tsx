"use client"

import { useAnimationControls, useReducedMotion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Code, Binary, Braces, Hash, Database, Server, Terminal, Laptop, Globe } from "lucide-react"
import { LazyMotion, domAnimation, m } from "framer-motion"

// Éléments de code qui flotteront autour de la photo
const codeSnippets = [
  "const dev = new Developer();",
  "while(dev.isCoding()) {",
  "dev.improve();",
  "}",
  "git push origin main",
  "npm run dev",
  "function solve()",
  "<React.Fragment>",
]

const floatingIcons = [
  { Icon: Code, delay: 0, distance: 80 },
  { Icon: Binary, delay: 0.2, distance: 80 },
  { Icon: Braces, delay: 0.4, distance: 80 },
  { Icon: Hash, delay: 0.6, distance: 80 },
  { Icon: Database, delay: 0.8, distance: 80 },
  { Icon: Server, delay: 1, distance: 80 },
  { Icon: Terminal, delay: 1.2, distance: 80 },
  { Icon: Laptop, delay: 1.4, distance: 80 },
  { Icon: Globe, delay: 1.6, distance: 80 },
]

export function AnimatedProfilePhoto() {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()
  const [glitchActive, setGlitchActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Effet de glitch périodique
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Utilisez prefersReducedMotion pour ajuster les animations
  const animationSettings = useMemo(
    () => (prefersReducedMotion ? { animate: { scale: 1 } } : { whileHover: { scale: 1.05 } }),
    [prefersReducedMotion],
  )

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative w-full max-w-md mx-auto aspect-square">
        {/* Cercle lumineux principal */}
        <m.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            background: [
              "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(34,211,238,0.2) 50%, rgba(59,130,246,0.2) 100%)",
              "radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(59,130,246,0.2) 50%, rgba(34,211,238,0.2) 100%)",
              "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(34,211,238,0.2) 50%, rgba(59,130,246,0.2) 100%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {codeSnippets.map((snippet, index) => (
            <m.div
              key={index}
              className="absolute text-xs text-blue-400/30 font-mono whitespace-nowrap"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, (index % 2 === 0 ? 100 : -100) * Math.random()],
                y: [-50 * Math.random(), 50 * Math.random()],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {snippet}
            </m.div>
          ))}
        </div>

        {/* Icônes flottantes en orbite */}
        {floatingIcons.map(({ Icon, delay, distance }, index) => (
          <m.div
            key={index}
            className="absolute left-1/2 top-1/2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              rotate: [0, 360],
              x: Array.from({ length: 360 }, (_, i) => Math.cos((i * Math.PI) / 180) * distance),
              y: Array.from({ length: 360 }, (_, i) => Math.sin((i * Math.PI) / 180) * distance),
            }}
            transition={{
              duration: 20,
              delay: delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Icon className="w-6 h-6 text-blue-400/50" />
          </m.div>
        ))}

        {/* Cercles concentriques */}
        {[1, 2, 3].map((ring) => (
          <m.div
            key={ring}
            className="absolute inset-0 rounded-full border border-blue-500/10"
            initial={{ scale: ring }}
            animate={{
              scale: [ring, ring + 0.2, ring],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              delay: ring * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Photo de profil avec effets */}
        <m.div
          className="relative z-10 w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-500/20 backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          {...animationSettings}
          onHoverStart={() => {
            setIsHovered(true)
            controls.start({
              borderColor: ["rgba(59,130,246,0.2)", "rgba(34,211,238,0.4)", "rgba(59,130,246,0.2)"],
            })
          }}
          onHoverEnd={() => {
            setIsHovered(false)
            controls.start({
              borderColor: "rgba(59,130,246,0.2)",
            })
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Effet de glitch */}
          {glitchActive && (
            <>
              <m.div
                className="absolute inset-0 bg-blue-500/30"
                animate={{
                  x: [-2, 2, 0],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 0.2 }}
              />
              <m.div
                className="absolute inset-0 bg-red-500/30"
                animate={{
                  x: [2, -2, 0],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 0.2 }}
              />
            </>
          )}

          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pp-w2GG1DuljKwkZI0wCuoAPwbprQNHF2.png"
            alt="Nicolas Pires De Jesus"
            width={256}
            height={256}
            className="object-cover rounded-full"
            priority
          />

          {/* Overlay au survol */}
          <m.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </m.div>

        {/* Cercle rotatif externe */}
        <m.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/10"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
          }}
        />

        {/* Points lumineux en orbite */}
        {Array.from({ length: 12 }).map((_, index) => (
          <m.div
            key={index}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-blue-400/50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              x: Math.cos((index * Math.PI * 2) / 12) * 120,
              y: Math.sin((index * Math.PI * 2) / 12) * 120,
            }}
            transition={{
              duration: 2,
              delay: index * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </LazyMotion>
  )
}
