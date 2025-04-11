import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Header } from "./components/layout/Header"
import { SectionTransition } from "./components/SectionTransition"
import { BlurredBackground } from "./components/BlurredBackground"
import { Footer } from "./components/layout/Footer"
import { UnifiedBackground } from "./components/UnifiedBackground"
import { Certifications } from "./components/sections/Certifications"

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[300px]">
    <div className="text-blue-400 font-mono">Loading section...</div>
  </div>
)

// Simplified imports to avoid Next.js 15 specific features
const About = dynamic(() => import("./components/sections/About"), {
  loading: () => <LoadingFallback />,
})

const Skills = dynamic(() => import("./components/sections/Skills").then((mod) => ({ default: mod.Skills })), {
  loading: () => <LoadingFallback />,
})

const Experience = dynamic(
  () => import("./components/sections/Experience").then((mod) => ({ default: mod.Experience })),
  {
    loading: () => <LoadingFallback />,
  },
)

const Projects = dynamic(() => import("./components/sections/Projects").then((mod) => ({ default: mod.Projects })), {
  loading: () => <LoadingFallback />,
})

const GameDev = dynamic(() => import("./components/sections/GameDev").then((mod) => ({ default: mod.GameDev })), {
  loading: () => <LoadingFallback />,
})

const Education = dynamic(() => import("./components/sections/Education").then((mod) => ({ default: mod.Education })), {
  loading: () => <LoadingFallback />,
})

const Recommendations = dynamic(
  () => import("./components/sections/Recommendations").then((mod) => ({ default: mod.Recommendations })),
  {
    loading: () => <LoadingFallback />,
  },
)

const Contact = dynamic(() => import("./components/sections/Contact").then((mod) => ({ default: mod.Contact })), {
  loading: () => <LoadingFallback />,
})

// Simplified 3D background loading
const Background3D = dynamic(
  () => import("./components/3d/Background3D").then((mod) => ({ default: mod.Background3D })),
  {
    loading: () => null,
  },
)

/**
 * Composant principal de la page d'accueil
 * Organise et affiche toutes les sections du portfolio
 */
export default function Home() {
  return (
    <main className="relative text-gray-100 min-h-screen">
      {/* Arrière-plan flou pour améliorer la lisibilité du contenu */}
      <BlurredBackground />

      {/* Arrière-plan unifié comme fallback */}
      <UnifiedBackground />

      {/* Chargement asynchrone du fond 3D avec un fallback pendant le chargement */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      {/* En-tête de la page */}
      <Header />

      {/* Sections principales du portfolio, chacune enveloppée dans un composant de transition */}
      <SectionTransition id="à-propos">
        <Suspense fallback={<LoadingFallback />}>
          <About id="à-propos" />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="compétences">
        <Suspense fallback={<LoadingFallback />}>
          <Skills />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="certifications">
        <Suspense fallback={<LoadingFallback />}>
          <Certifications />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="expériences">
        <Suspense fallback={<LoadingFallback />}>
          <Experience />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="projets">
        <Suspense fallback={<LoadingFallback />}>
          <Projects />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="jeux-vidéo">
        <Suspense fallback={<LoadingFallback />}>
          <GameDev />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="formations">
        <Suspense fallback={<LoadingFallback />}>
          <Education />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="recommandations">
        <Suspense fallback={<LoadingFallback />}>
          <Recommendations />
        </Suspense>
      </SectionTransition>

      <SectionTransition id="contact">
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </SectionTransition>

      {/* Pied de page */}
      <Footer />
    </main>
  )
}
