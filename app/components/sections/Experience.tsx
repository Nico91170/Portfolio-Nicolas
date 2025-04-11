"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionTitle } from "../SectionTitle"
import { portfolioData } from "@/app/constants/portfolioData"
import {
  Code2,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  X,
  Maximize2,
  Minimize2,
  FileCode,
  Clock,
  MapPin,
  Briefcase,
  MousePointer,
} from "lucide-react"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

// Définir les types pour les expériences
interface Technology {
  name: string
  logo?: string
}

interface Experience {
  title: string
  company: string
  period: string
  location?: string
  description: string[]
  technologies: string[]
  logo?: string
  fileType?: string
  fileName?: string
  logoBgColor?: string
}

// Composant pour l'explorateur de fichiers
const FileExplorer = ({ experiences, activeFile, setActiveFile }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="w-64 h-full bg-gray-900 border-r border-gray-700 overflow-y-auto hidden md:block">
      <div className="p-2 text-gray-300 font-medium border-b border-gray-700 flex items-center justify-between">
        <span>EXPLORER</span>
        {expanded ? (
          <ChevronDown size={16} className="cursor-pointer" onClick={() => setExpanded(false)} />
        ) : (
          <ChevronRight size={16} className="cursor-pointer" onClick={() => setExpanded(true)} />
        )}
      </div>

      {expanded && (
        <div className="p-2">
          <div className="mb-2">
            <div
              className="flex items-center text-gray-300 hover:text-blue-400 cursor-pointer py-1"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <FolderOpen size={16} className="ml-1 mr-2 text-yellow-500" />
              <span>Expériences</span>
            </div>

            <div className="ml-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`flex items-center py-1 cursor-pointer ${activeFile === index ? "text-blue-400" : "text-gray-300"} hover:text-blue-400`}
                  onClick={() => setActiveFile(index)}
                >
                  <FileCode size={16} className="mr-2" />
                  <span className="text-sm truncate">
                    {exp.fileName || `${exp.company.split(" ")[0]}.${exp.fileType || "js"}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Composant pour les onglets
const Tabs = ({ experiences, activeFile, setActiveFile }) => {
  return (
    <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`flex items-center py-2 px-4 cursor-pointer border-r border-gray-700 min-w-max ${
            activeFile === index ? "bg-gray-900 text-white" : "bg-gray-800 text-gray-400"
          }`}
          onClick={() => setActiveFile(index)}
        >
          <FileCode size={14} className="mr-2" />
          <span className="text-sm">{exp.fileName || `${exp.company.split(" ")[0]}.${exp.fileType || "js"}`}</span>
          {activeFile === index && (
            <X
              size={14}
              className="ml-2 hover:bg-gray-700 rounded-sm"
              onClick={(e) => {
                e.stopPropagation()
                setActiveFile(null)
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// Composant pour l'éditeur de code
const CodeEditor = ({ experience, lineNumbers = true }) => {
  const getLanguageClass = (fileType) => {
    switch (fileType) {
      case "js":
        return "language-javascript"
      case "jsx":
        return "language-jsx"
      case "ts":
        return "language-typescript"
      case "tsx":
        return "language-tsx"
      case "php":
        return "language-php"
      default:
        return "language-javascript"
    }
  }

  const formatExperienceAsCode = (exp) => {
    const langClass = getLanguageClass(exp.fileType || "js")

    return `
// ${exp.title} @ ${exp.company}
// ${exp.period}
// ${exp.location || ""}

const experience = {
  title: "${exp.title}",
  company: "${exp.company}",
  period: "${exp.period}",
  
  responsibilities: [
${exp.description.map((desc) => `    "${desc}",`).join("\n")}
  ],
  
  technologies: [
${exp.technologies.map((tech) => `    "${tech}",`).join("\n")}
  ]
};

export default experience;
`
  }

  const code = formatExperienceAsCode(experience)
  const lines = code.split("\n")

  return (
    <div className="flex-1 overflow-auto bg-gray-900 text-gray-300 font-mono text-sm">
      <div className="flex">
        {lineNumbers && (
          <div className="py-4 pr-4 text-right bg-gray-900 text-gray-500 select-none border-r border-gray-700 min-w-[3rem]">
            {lines.map((_, i) => (
              <div key={i} className="px-2">
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <pre className="p-4 overflow-auto w-full">
          <code className={`${getLanguageClass(experience.fileType || "js")}`}>
            {lines.map((line, i) => {
              // Appliquer la coloration syntaxique basique
              const coloredLine = line
                .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>') // Commentaires
                .replace(/(".*?")/g, '<span class="text-green-400">$1</span>') // Chaînes
                .replace(
                  /\b(const|let|var|function|export|default|return)\b/g,
                  '<span class="text-purple-400">$1</span>',
                ) // Mots-clés
                .replace(
                  /\b(title|company|period|responsibilities|technologies)\b(?=:)/g,
                  '<span class="text-blue-400">$1</span>',
                ) // Propriétés

              return <div key={i} dangerouslySetInnerHTML={{ __html: coloredLine }} />
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}

// Composant pour le logo
const LogoDisplay = ({ experience }) => {
  // Déterminer si le logo a besoin d'un fond spécifique
  const needsWhiteBg = experience.company === "Les Apprentis Dev"
  const needsSpecificBg = experience.logoBgColor

  return (
    <div
      className={`w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center border ${
        needsWhiteBg ? "bg-white border-gray-300" : needsSpecificBg ? "" : "bg-gray-800 border-gray-700"
      }`}
      style={needsSpecificBg ? { backgroundColor: experience.logoBgColor } : {}}
    >
      {experience.logo ? (
        <Image
          src={experience.logo || "/placeholder.svg"}
          alt={experience.company}
          width={64}
          height={64}
          className="object-contain p-1"
        />
      ) : (
        <Briefcase size={24} className="text-blue-400" />
      )}
    </div>
  )
}

// Composant pour le titre stylisé de type IDE
const IDEStyledTitle = () => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-10 shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center mb-4 border-b border-gray-700 pb-3">
        <Code2 size={24} className="text-blue-400 mr-3" />
        <h3 className="text-xl font-bold text-white">experience_explorer.js</h3>
      </div>

      <div className="font-mono text-sm space-y-3">
        <div className="flex">
          <span className="text-gray-500 w-8">1</span>
          <span className="text-purple-400">const</span>
          <span className="text-white mx-2">journey</span>
          <span className="text-blue-300">=</span>
          <span className="text-white mx-2">{"{"}</span>
        </div>

        <div className="flex pl-8">
          <span className="text-gray-500 w-8">2</span>
          <span className="text-blue-400">action</span>
          <span className="text-white">:</span>
          <motion.span
            className="text-green-400 mx-2"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            "<span className="text-yellow-300 font-semibold">Explore</span> my professional journey"
          </motion.span>
          <span className="text-white">,</span>
        </div>

        <div className="flex pl-8">
          <span className="text-gray-500 w-8">3</span>
          <span className="text-blue-400">interface</span>
          <span className="text-white">:</span>
          <span className="text-green-400 mx-2">"IDE-inspired"</span>
          <span className="text-white">,</span>
        </div>

        <div className="flex pl-8">
          <span className="text-gray-500 w-8">4</span>
          <span className="text-blue-400">instruction</span>
          <span className="text-white">:</span>
          <div className="flex items-center">
            <span className="text-green-400 mx-2">"</span>
            <MousePointer size={14} className="text-yellow-300 mx-1" />
            <span className="text-yellow-300 font-semibold">Click on an experience</span>
            <span className="text-green-400"> to view details</span>
            <span className="text-green-400">"</span>
          </div>
          <span className="text-white">,</span>
        </div>

        <div className="flex">
          <span className="text-gray-500 w-8">5</span>
          <span className="text-white">{"}"}</span>
          <span className="text-gray-500">;</span>
        </div>

        <div className="flex">
          <span className="text-gray-500 w-8">6</span>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="text-purple-400">export default</span>
            <span className="text-white mx-2">journey</span>
            <span className="text-gray-500">;</span>
            <motion.span
              className="ml-2 inline-block w-2 h-4 bg-blue-400"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Composant principal pour l'expérience
export function Experience() {
  const [activeFile, setActiveFile] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Ajouter des propriétés spécifiques pour l'affichage des logos
  const enhancedExperiences = portfolioData.experiences.map((exp) => {
    let logoBgColor = null

    // Définir des couleurs de fond spécifiques pour certains logos
    if (exp.company === "Mutuaide") {
      logoBgColor = "#006259" // Vert foncé pour Mutuaide
    }

    return {
      ...exp,
      logoBgColor,
    }
  })

  // Fonction pour basculer en plein écran
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <section id="expériences" ref={ref} className="py-32 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Expériences" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <IDEStyledTitle />
        </motion.div>

        {/* Vue des cartes d'expérience (affichée quand aucun fichier n'est actif) */}
        {activeFile === null && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
            {enhancedExperiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer group"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                }}
                onClick={() => setActiveFile(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <LogoDisplay experience={exp} />
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-gray-400">{exp.company}</p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-gray-400">
                      <Clock size={16} className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center text-gray-400">
                        <MapPin size={16} className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300 line-clamp-2">{exp.description[0]}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-700 text-blue-400 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                        +{exp.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900 px-6 py-3 text-gray-400 text-sm border-t border-gray-700 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileCode size={14} className="mr-2 text-yellow-500" />
                    <span>{exp.fileName || `${exp.company.split(" ")[0]}.${exp.fileType || "js"}`}</span>
                  </div>
                  <div className="text-blue-400 group-hover:underline">Ouvrir →</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Interface IDE (affichée quand un fichier est actif) */}
        {activeFile !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-2xl ${
              isFullscreen ? "fixed inset-0 z-50 rounded-none" : "h-[80vh]"
            }`}
          >
            {/* Barre de titre IDE avec logo */}
            <div className="bg-gray-800 border-b border-gray-700 p-2 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-2 relative overflow-hidden rounded">
                  {enhancedExperiences[activeFile].logo ? (
                    <Image
                      src={enhancedExperiences[activeFile].logo || "/placeholder.svg"}
                      alt={enhancedExperiences[activeFile].company}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <Code2 size={16} className="text-blue-400" />
                  )}
                </div>
                <span className="text-gray-300 font-medium">
                  {enhancedExperiences[activeFile].company} - VS Experience
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isFullscreen ? (
                  <Minimize2
                    size={18}
                    className="text-gray-400 hover:text-white cursor-pointer"
                    onClick={toggleFullscreen}
                  />
                ) : (
                  <Maximize2
                    size={18}
                    className="text-gray-400 hover:text-white cursor-pointer"
                    onClick={toggleFullscreen}
                  />
                )}
                <X
                  size={18}
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => setActiveFile(null)}
                />
              </div>
            </div>

            <div className="flex h-full">
              {/* Explorateur de fichiers */}
              <FileExplorer experiences={enhancedExperiences} activeFile={activeFile} setActiveFile={setActiveFile} />

              {/* Zone principale */}
              <div className="flex-1 flex flex-col h-full">
                {/* Onglets */}
                <Tabs experiences={enhancedExperiences} activeFile={activeFile} setActiveFile={setActiveFile} />

                {/* Contenu principal - Éditeur de code (maintenant en pleine hauteur) */}
                <div className="flex-1 overflow-hidden">
                  <CodeEditor experience={enhancedExperiences[activeFile]} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
