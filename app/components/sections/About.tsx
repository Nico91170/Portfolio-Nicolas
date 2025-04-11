"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LinkedinIcon, Download } from "lucide-react"
import { CodeElement } from "../CodeElement"
import { AnimatedProfilePhoto } from "../AnimatedProfilePhoto"
import { useLazyLoad } from "../../hooks/useLazyLoad"
import { GitHubCard } from "../GitHubCard"
// Supprimer l'import du TerminalSection
// import { TerminalSection } from "../TerminalSection"
import { SectionTitle } from "../SectionTitle"
import { CodeWindow } from "../CodeWindow"

interface AboutProps {
  id?: string
}

export function About({ id = "à-propos" }: AboutProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useLazyLoad(sectionRef)

  const developerInfo = {
    name: "Nicolas",
    lastName: "Pires De Jesus",
    age: 20,
    contact: {
      email: "contact@nicolaspiresdejesus.fr",
      phone: "+33 6 51 87 62 51",
    },
    passions: ["Développement web", "Développement de jeux", "Nouvelles technologies"],
  }

  return (
    <section ref={sectionRef} id={id} className="relative min-h-screen py-32 overflow-hidden">
      {isVisible && (
        <>
          {/* Éléments de code flottants avec couleurs améliorées */}
          <CodeElement code="const developer = {" x="-5%" y="10%" rotate={-15} color="text-emerald-400" />
          <CodeElement code="skills: ['React', 'Next.js']," x="85%" y="30%" rotate={10} color="text-purple-400" />
          <CodeElement code="passion: 'Creating awesome UIs'" x="5%" y="70%" rotate={5} color="text-cyan-400" />
          <CodeElement code="}" x="80%" y="85%" rotate={-5} color="text-pink-400" />

          {/* Arrière-plan amélioré avec dégradé plus coloré */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900/90" />
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, rgba(192, 132, 252, 0.15) 50%, rgba(34, 211, 238, 0.15) 100%)",
                backgroundSize: "100% 100%",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Titre amélioré */}
            <SectionTitle title="À propos de moi" />

            {/* Description avec texte coloré */}
            <motion.p
              className="text-center mb-12 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gray-300">Je suis un </span>
              <span className="text-cyan-400 font-semibold">développeur passionné</span>
              <span className="text-gray-300"> spécialisé dans la création d'</span>
              <span className="text-purple-400 font-semibold">expériences web innovantes</span>
              <span className="text-gray-300"> et le </span>
              <span className="text-emerald-400 font-semibold">développement de jeux</span>
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <AnimatedProfilePhoto />
              <CodeWindow title="about.ts" content={developerInfo} />
            </div>

            {/* Section GitHub avec couleurs améliorées */}
            <div className="mt-32 mb-32">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Mon GitHub
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  />
                </h3>
                <motion.p
                  className="text-gray-400 mt-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Découvrez mes <span className="text-cyan-400">projets open source</span> et suivez mon évolution en
                  tant que développeur
                </motion.p>
              </motion.div>
              <GitHubCard />
            </div>

            {/* Terminal Section */}
            {/* Supprimer la référence au TerminalSection dans le composant About */}
            {/* <div className="mt-32 mb-32">
              <TerminalSection />
            </div> */}

            {/* Boutons d'action avec effets de survol améliorés */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/nicolas-pires-de-jesus"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0077b5] to-[#006396] text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visiter mon profil LinkedIn"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0077b5] to-[#006396] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: "brightness(1.2)" }}
                />
                <LinkedinIcon className="w-5 h-5 relative z-10" />
                <span className="relative z-10 font-semibold">LinkedIn</span>
              </motion.a>

              <motion.a
                href="/cv.pdf"
                download
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-white rounded-xl overflow-hidden border border-purple-500/20 hover:border-pink-500/40 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Télécharger mon CV"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <Download className="w-5 h-5 relative z-10 text-purple-400 group-hover:text-pink-400 transition-colors" />
                <span className="relative z-10 font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Télécharger CV
                </span>
              </motion.a>
            </motion.div>
          </div>
        </>
      )}
    </section>
  )
}

export default About
