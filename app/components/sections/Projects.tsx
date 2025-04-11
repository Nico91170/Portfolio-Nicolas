"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useMemo } from "react"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { SectionTitle } from "../SectionTitle"
import { AnimatedProjectsIntro } from "../AnimatedProjectsIntro"
import { MacWindow } from "../MacWindow"
import { AnimatedCodeSnippet } from "../AnimatedCodeSnippet"
import { Globe, Sparkles, Code2 } from "lucide-react"

const projects = [
  {
    title: "Portfolio",
    description: "Portfolio personnel présentant mes compétences et projets en développement web et mobile.",
    longDescription:
      "Développé avec Next.js et TypeScript, ce portfolio met en avant mes compétences en développement web moderne. Il utilise des animations fluides et une interface utilisateur intuitive pour présenter mes projets et mon parcours professionnel.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%202025-02-04%20164312-9WRovmdosZ1x5FhR0L1IVCsAGe2jJJ.png",
    technologies: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
      { name: "Framer Motion", logo: "/framer-motion-logo.svg" },
    ],
    features: ["Animations fluides et interactives", "Mode sombre/clair", "Design responsive", "Performance optimisée"],
    links: {
      github: "https://github.com/username/portfolio",
      live: "https://portfolio.dev",
    },
    color: "from-blue-500/20 to-purple-500/20",
    status: "Terminé",
    codeSnippet: {
      language: "typescript",
      code: `import React from 'react';

const ProjectCard: React.FC<ProjectProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProjectCard;`,
      fileName: "ProjectCard.tsx",
    },
  },
  {
    title: "Application de Gestion",
    description: "Application web de gestion des tâches et des projets pour les équipes.",
    longDescription:
      "Une application complète de gestion de projet avec authentification, tableaux de bord en temps réel, et fonctionnalités collaboratives avancées.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: [
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    ],
    features: [
      "Authentification sécurisée",
      "Temps réel avec Socket.IO",
      "Tableaux de bord interactifs",
      "API RESTful",
    ],
    links: {
      github: "https://github.com/username/task-manager",
      live: "https://task-app.dev",
    },
    color: "from-purple-500/20 to-pink-500/20",
    status: "En développement",
    codeSnippet: {
      language: "javascript",
      code: `// Some code here`,
      fileName: "TaskManager.js",
    },
  },
  {
    title: "E-commerce Platform",
    description: "Plateforme e-commerce complète avec panier et paiement intégré.",
    longDescription:
      "Une solution e-commerce moderne avec gestion des produits, panier d'achat, paiements sécurisés et tableau de bord administrateur.",
    image: "/placeholder.svg?height=600&width=800",
    technologies: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Stripe", logo: "/stripe-logo.svg" },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      { name: "Prisma", logo: "/prisma-logo.svg" },
    ],
    features: ["Paiements sécurisés", "Gestion des stocks", "Panel administrateur", "Analytics intégrés"],
    links: {
      github: "https://github.com/username/ecommerce",
      live: "https://shop.dev",
    },
    color: "from-pink-500/20 to-blue-500/20",
    status: "En cours",
    codeSnippet: {
      language: "jsx",
      code: `// Some more code here`,
      fileName: "Ecommerce.jsx",
    },
  },
]

export function Projects() {
  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech">("overview")

  const slideVariants = useMemo(
    () => ({
      enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }),
    }),
    [],
  )

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentProject((prev) => (prev + newDirection + projects.length) % projects.length)
  }, [])

  const handleTabChange = useCallback((tabId: "overview" | "features" | "tech") => {
    setActiveTab(tabId)
  }, [])

  return (
    <section id="projets" className="relative min-h-screen py-20 overflow-hidden">
      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative z-20"
        >
          <SectionTitle title="Projets" />
          <AnimatedProjectsIntro />
        </motion.div>

        <MacWindow title="projects.js">
          <div className="relative max-w-6xl mx-auto">
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-blue-400/20 hover:text-blue-400 transition-all duration-300"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-blue-400/20 hover:text-blue-400 transition-all duration-300"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentProject}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="w-full"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#232b3b] shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_3rem_0_rgba(245,205,121,0.2)]">
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      projects[currentProject].status === "Terminé"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                    >
                      {projects[currentProject].status}
                    </span>
                  </div>

                  <div className="relative h-[450px] overflow-hidden">
                    <Image
                      src={projects[currentProject].image || "/placeholder.svg"}
                      alt={projects[currentProject].title}
                      layout="fill"
                      objectFit="cover"
                      className="transform hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#232b3b] via-[#232b3b]/80 to-transparent" />
                  </div>

                  <div className="relative p-8">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${projects[currentProject].color} opacity-10`}
                    />

                    <div className="relative">
                      <h3 className="text-3xl font-bold text-white mb-4">{projects[currentProject].title}</h3>

                      <div className="flex gap-4 mb-6 border-b border-gray-700">
                        {[
                          { id: "overview", label: "Aperçu", icon: Globe },
                          { id: "features", label: "Fonctionnalités", icon: Sparkles },
                          { id: "tech", label: "Technologies", icon: Code2 },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id as "overview" | "features" | "tech")}
                            className={`
                            flex items-center gap-2 px-4 py-2 text-sm font-medium
                            border-b-2 transition-all duration-300
                            ${
                              activeTab === tab.id
                                ? "border-[#3b82f6] text-[#3b82f6]"
                                : "border-transparent text-gray-400 hover:text-gray-300"
                            }
                          `}
                          >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-h-[150px] mb-6">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {activeTab === "overview" && (
                              <div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed">
                                  {projects[currentProject].longDescription}
                                </p>
                                <AnimatedCodeSnippet
                                  language={projects[currentProject].codeSnippet.language}
                                  code={projects[currentProject].codeSnippet.code}
                                  fileName={projects[currentProject].codeSnippet.fileName}
                                />
                              </div>
                            )}

                            {activeTab === "features" && (
                              <ul className="grid grid-cols-2 gap-4">
                                {projects[currentProject].features.map((feature, index) => (
                                  <motion.li
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 text-gray-300"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                                    {feature}
                                  </motion.li>
                                ))}
                              </ul>
                            )}

                            {activeTab === "tech" && (
                              <div className="flex flex-wrap gap-4">
                                {projects[currentProject].technologies.map((tech, index) => (
                                  <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-[#3b82f6]/10 text-[#3b82f6] hover:bg-[#3b82f6]/20 transition-colors"
                                  >
                                    <div className="relative w-5 h-5 mr-2">
                                      <Image
                                        src={tech.logo || "/placeholder.svg"}
                                        alt={`${tech.name} logo`}
                                        layout="fill"
                                        objectFit="contain"
                                        loading="lazy"
                                      />
                                    </div>
                                    <span>{tech.name}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="flex gap-4">
                        <motion.a
                          href={projects[currentProject].links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-5 h-5" />
                          <span>Code source</span>
                        </motion.a>
                        <motion.a
                          href={projects[currentProject].links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Voir le projet</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentProject ? 1 : -1)
                    setCurrentProject(index)
                  }}
                  className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${
                    currentProject === index ? "bg-blue-400 scale-110" : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                  }
                `}
                  aria-label={`Voir projet ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  )
}
