"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useReducer, useCallback, useState, useRef } from "react"
import Image from "next/image"
import {
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Users,
  Timer,
  Sparkles,
  Github,
  PlayCircle,
  Download,
} from "lucide-react"
import { SectionTitle } from "../SectionTitle"
import { AnimatedGameDevIntro } from "../AnimatedGameDevIntro"
import { MacWindow } from "../MacWindow"
import { GameDevSkills } from "../GameDevSkills"

type GameImage = {
  url: string
  alt: string
}

type GameFeature = {
  icon: typeof Gamepad2
  title: string
  description: string
}

type Game = {
  title: string
  description: string
  longDescription: string
  engine: string
  platform: string
  status: "En développement" | "Terminé" | "En pause" | "Concept"
  teamSize: string
  duration: string
  mainImage: string
  gallery: GameImage[]
  features: GameFeature[]
  technologies: { name: string; logo: string }[]
  links?: {
    github?: string
  }
  color: string
  downloadLink?: string
  videoUrl?: string
}

const games: Game[] = [
  {
    title: "Pixel Adventure",
    description: "Un jeu de plateforme en 2D avec des mécaniques de puzzle",
    longDescription: `Pixel Adventure est un jeu de plateforme innovant qui combine des éléments de puzzle et d'action.
    Les joueurs doivent utiliser leur intelligence et leurs réflexes pour progresser à travers des niveaux
    soigneusement conçus. Le jeu propose des graphismes pixel art et une bande sonore originale.`,
    engine: "Unity",
    platform: "PC / Web",
    status: "En développement",
    teamSize: "Solo",
    duration: "6 mois",
    mainImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%202025-02-06%20171113-Up34Il3axSW86BIrwBnLxJVCIEr1o9.png",
    gallery: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%202025-02-06%20171113-Up34Il3axSW86BIrwBnLxJVCIEr1o9.png",
        alt: "Niveau 1",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%202025-02-06%20171113-Up34Il3axSW86BIrwBnLxJVCIEr1o9.png",
        alt: "Combat de boss",
      },
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%202025-02-06%20171113-Up34Il3axSW86BIrwBnLxJVCIEr1o9.png",
        alt: "Menu principal",
      },
    ],
    features: [
      {
        icon: Gamepad2,
        title: "Gameplay Innovant",
        description: "Mélange unique de plateforme et de puzzle",
      },
      {
        icon: Sparkles,
        title: "Style Artistique",
        description: "Pixel art moderne avec des effets visuels dynamiques",
      },
      {
        icon: Users,
        title: "Mode Histoire",
        description: "Une aventure narrative immersive",
      },
    ],
    technologies: [
      { name: "Unity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
      { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "Blender", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      {
        name: "Aseprite",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Aseprite.svg-AClpQTdBqH8xBcluzxrdFu0CE5NfYu.png",
      },
    ],
    links: {
      github: "https://github.com/username/pixel-adventure",
    },
    color: "from-blue-500/20 to-purple-500/20",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    downloadLink: "https://example.com/pixel-adventure-demo.zip",
  },
  // Vous pouvez ajouter d'autres jeux ici
]

type State = {
  currentGame: number
  currentImage: number
  activeTab: "overview" | "features" | "gallery"
  isVideoPlaying: boolean
}

type Action =
  | { type: "SET_GAME"; payload: number }
  | { type: "SET_IMAGE"; payload: number }
  | { type: "SET_TAB"; payload: "overview" | "features" | "gallery" }
  | { type: "TOGGLE_VIDEO" }

const initialState: State = {
  currentGame: 0,
  currentImage: 0,
  activeTab: "overview",
  isVideoPlaying: false,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_GAME":
      return { ...state, currentGame: action.payload, isVideoPlaying: false }
    case "SET_IMAGE":
      return { ...state, currentImage: action.payload }
    case "SET_TAB":
      return { ...state, activeTab: action.payload, currentImage: 0, isVideoPlaying: false }
    case "TOGGLE_VIDEO":
      return { ...state, isVideoPlaying: !state.isVideoPlaying }
    default:
      return state
  }
}

export function GameDev() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [direction, setDirection] = useState(0)
  const videoRef = useRef<HTMLIFrameElement>(null)

  const handleTabChange = useCallback((tabId: "overview" | "features" | "gallery") => {
    dispatch({ type: "SET_TAB", payload: tabId })
  }, [])

  const game = games[state.currentGame]

  const slideVariants = {
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
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    dispatch({ type: "SET_GAME", payload: (state.currentGame + newDirection + games.length) % games.length })
    dispatch({ type: "TOGGLE_VIDEO" })
    if (videoRef.current) {
      videoRef.current.src = videoRef.current.src
    }
  }

  const toggleVideo = () => {
    dispatch({ type: "TOGGLE_VIDEO" })
  }

  return (
    <section id="jeux-video" className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)]" />

      <div className="relative container mx-auto px-6">
        <SectionTitle title="Développement de Jeux Vidéo" />

        <AnimatedGameDevIntro />

        <GameDevSkills />

        <MacWindow title="games.js">
          <div className="relative max-w-6xl mx-auto mt-16">
            {/* Navigation arrows */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-blue-500/20 text-blue-400 backdrop-blur-sm hover:bg-blue-500/30 transition-all duration-300"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-blue-500/20 text-blue-400 backdrop-blur-sm hover:bg-blue-500/30 transition-all duration-300"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Game showcase */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={state.currentGame}
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
                <div className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm border border-blue-500/20 transform transition-all duration-500 hover:shadow-blue-500/20 bg-[#1a1f2e]/95">
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${
                          game.status === "Terminé"
                            ? "bg-green-500/20 text-green-400"
                            : game.status === "En développement"
                              ? "bg-blue-500/20 text-blue-400"
                              : game.status === "En pause"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-gray-500/20 text-gray-400"
                        }
                      `}
                    >
                      {game.status}
                    </span>
                  </div>

                  {/* Main image or video */}
                  <div className="relative h-[450px] overflow-hidden">
                    {state.activeTab === "gallery" ? (
                      <Image
                        src={game.gallery[state.currentImage].url || "/placeholder.svg"}
                        alt={game.gallery[state.currentImage].alt}
                        layout="fill"
                        objectFit="cover"
                        className="transform hover:scale-105 transition-transform duration-700"
                      />
                    ) : state.isVideoPlaying && game.videoUrl ? (
                      <iframe
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        src={game.videoUrl}
                        title={`${game.title} gameplay video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <Image
                        src={game.mainImage || "/placeholder.svg"}
                        alt={game.title}
                        layout="fill"
                        objectFit="cover"
                        className="transform hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-[#1a1f2e]/80 to-transparent" />

                    {/* Video play button */}
                    {game.videoUrl && !state.isVideoPlaying && (
                      <button
                        onClick={toggleVideo}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-full p-4 transition-all duration-300"
                      >
                        <PlayCircle className="w-12 h-12" />
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative p-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10`} />

                    <div className="relative">
                      <h3 className="text-3xl font-bold text-white mb-4">{game.title}</h3>

                      {/* Quick info */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Code2 className="w-4 h-4" />
                          <span>{game.engine}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Users className="w-4 h-4" />
                          <span>{game.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Timer className="w-4 h-4" />
                          <span>{game.duration}</span>
                        </div>
                        {game.downloadLink && (
                          <motion.a
                            href={game.downloadLink}
                            download
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="w-4 h-4" />
                            <span>Télécharger</span>
                          </motion.a>
                        )}
                      </div>

                      {/* Tabs */}
                      <div className="flex gap-4 mb-6 border-b border-blue-500/20">
                        {[
                          { id: "overview", label: "Aperçu", icon: Gamepad2 },
                          { id: "features", label: "Caractéristiques", icon: Sparkles },
                          { id: "gallery", label: "Galerie", icon: PlayCircle },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id as "overview" | "features" | "gallery")}
                            className={`
                              flex items-center gap-2 px-4 py-2 text-sm font-medium
                              border-b-2 transition-all duration-300
                              ${
                                state.activeTab === tab.id
                                  ? "border-blue-400 text-blue-400"
                                  : "border-transparent text-gray-400 hover:text-gray-300"
                              }
                            `}
                          >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Tab content */}
                      <div className="min-h-[150px] mb-6">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={state.activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {state.activeTab === "overview" && (
                              <div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed">{game.longDescription}</p>
                                <div className="flex flex-wrap gap-4">
                                  {game.technologies.map((tech, index) => (
                                    <motion.div
                                      key={tech.name}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                    >
                                      <div className="relative w-5 h-5 mr-2">
                                        <Image
                                          src={tech.logo || "/placeholder.svg"}
                                          alt={`${tech.name} logo`}
                                          layout="fill"
                                          objectFit="contain"
                                        />
                                      </div>
                                      <span>{tech.name}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {state.activeTab === "features" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {game.features.map((feature, index) => (
                                  <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
                                  >
                                    <feature.icon className="w-6 h-6 text-blue-400 mb-2" />
                                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                                    <p className="text-gray-300 text-sm">{feature.description}</p>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {state.activeTab === "gallery" && (
                              <div className="space-y-4">
                                <div className="flex gap-2 overflow-x-auto pb-4 snap-x">
                                  {game.gallery.map((image, index) => (
                                    <button
                                      key={image.url}
                                      onClick={() => dispatch({ type: "SET_IMAGE", payload: index })}
                                      className={`
                                        relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden
                                        ${state.currentImage === index ? "ring-2 ring-blue-400" : ""}
                                      `}
                                    >
                                      <Image
                                        src={image.url || "/placeholder.svg"}
                                        alt={image.alt}
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Links */}
                      {game.links && (
                        <div className="flex gap-4">
                          {game.links.github && (
                            <motion.a
                              href={game.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Github className="w-5 h-5" />
                              <span>Code source</span>
                            </motion.a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3 mt-8">
              {games.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > state.currentGame ? 1 : -1)
                    dispatch({ type: "SET_GAME", payload: index })
                  }}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${state.currentGame === index ? "bg-blue-400 scale-110" : "bg-gray-600 hover:bg-gray-500 hover:scale-110"}
                  `}
                  aria-label={`Voir jeu ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  )
}
