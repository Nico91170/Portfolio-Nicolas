"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import { Gamepad, Code, Palette, Music } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const gameDevSkills = [
  {
    category: "Moteurs de jeu",
    icon: Gamepad,
    items: [
      { name: "Unity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
      {
        name: "Unreal Engine",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg",
      },
      { name: "Godot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg" },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    category: "Langages de programmation",
    icon: Code,
    items: [
      { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Lua", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    category: "Graphismes et Animation",
    icon: Palette,
    items: [
      { name: "Blender", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      {
        name: "Aseprite",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Aseprite.svg-AClpQTdBqH8xBcluzxrdFu0CE5NfYu.png",
      },
      {
        name: "Spine",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/esoteric_software_badge-FqaidKt5rWILDPvb0SKAdv1g12UhFz.png",
      },
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    category: "Audio",
    icon: Music,
    items: [
      {
        name: "FMOD",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aav5artzz-fRFvHBPqn49nKt1gxa98h5o1ILS9Gz.webp",
      },
      {
        name: "Wwise",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wwise-Logo-2016-Wwise_R-Color-FdHGeVzdve37ro98AFrUV4bjvfVijW.png",
      },
      {
        name: "Audacity",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/audacity8797.jpg-PEugqAobh9LeMzep3gITjX3en1uwmk.jpeg",
      },
    ],
    color: "from-purple-500 to-pink-500",
  },
]

const SkillCard = ({ category, items, color, icon: Icon }) => {
  const [hoveredSkill, setHoveredSkill] = useState("")
  const cardRef = useRef(null)
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-[#1a1f2e]/95 p-6 shadow-xl backdrop-blur-sm border border-blue-500/20"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 text-white" />
          <h3 className="text-2xl font-bold text-white">{category}</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {items.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill("")}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-12 h-12 mb-2 flex items-center justify-center">
                <Image
                  src={skill.logo || "/placeholder.svg"}
                  alt={`${skill.name} logo`}
                  layout="fill"
                  objectFit="contain"
                  className={`filter drop-shadow-lg ${
                    skill.name === "FMOD" || skill.name === "Spine"
                      ? "invert"
                      : skill.name === "Aseprite" || skill.name === "Wwise"
                        ? "bg-white/90 rounded-lg p-1"
                        : ""
                  }`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = "/placeholder.svg"
                  }}
                />
              </div>
              <span className="text-sm text-center text-white font-medium">{skill.name}</span>
              {hoveredSkill === skill.name && (
                <motion.div
                  className="absolute inset-0 border-2 border-white/50 rounded-xl"
                  layoutId="skillHighlight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function GameDevSkills() {
  return (
    <div className="py-16">
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
              Compétences en développement de jeux
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
          {`// Explorez mes compétences en game dev`}
        </motion.div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {gameDevSkills.map((skillCategory) => (
          <SkillCard key={skillCategory.category} {...skillCategory} />
        ))}
      </div>
    </div>
  )
}
