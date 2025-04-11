"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionTitle } from "../SectionTitle"
import { Award, Calendar, ExternalLink, ChevronLeft, ChevronRight, Check } from "lucide-react"
import Image from "next/image"
import { MacWindow } from "../MacWindow"

// Données des certifications
const certifications = [
  {
    id: 1,
    title: "Meta Front-End Developer",
    organization: "Meta",
    date: "2024",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["React", "JavaScript", "UX/UI", "Testing", "Version Control"],
    description:
      "Certification professionnelle complète couvrant le développement front-end moderne avec React et les meilleures pratiques de l'industrie.",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/123456",
    color: "from-[#50FA7B] to-[#8BE9FD]",
  },
  {
    id: 2,
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    date: "2023",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["Cloud Computing", "AWS Services", "Security", "Architecture"],
    description:
      "Certification validant les connaissances fondamentales des services cloud AWS et de l'architecture cloud.",
    verificationUrl: "https://aws.amazon.com/verification/123456",
    color: "from-[#FF79C6] to-[#BD93F9]",
  },
  {
    id: 3,
    title: "Professional Scrum Master I",
    organization: "Scrum.org",
    date: "2023",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["Agile", "Scrum", "Project Management", "Team Leadership"],
    description:
      "Certification attestant de la maîtrise des principes Scrum et des compétences en gestion de projet agile.",
    verificationUrl: "https://www.scrum.org/verify/123456",
    color: "from-[#FFB86C] to-[#FF5555]",
  },
]

export function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + certifications.length) % certifications.length)
  }

  return (
    <section id="certifications" className="relative py-32 overflow-hidden">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 bg-[#282A36]/50" />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 20% 20%, rgba(80, 250, 123, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 80%, rgba(139, 233, 253, 0.1) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Certifications" />

        <motion.p
          className="text-center text-gray-300 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Découvrez mes certifications professionnelles qui valident mes compétences et mon expertise dans différents
          domaines du développement web et de la gestion de projet.
        </motion.p>

        <MacWindow title="certifications.tsx">
          <div className="relative p-6 bg-[#282A36]" ref={containerRef}>
            {/* Boutons de navigation */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#44475A]/80 text-[#F8F8F2] backdrop-blur-sm hover:bg-[#6272A4] transition-colors"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#44475A]/80 text-[#F8F8F2] backdrop-blur-sm hover:bg-[#6272A4] transition-colors"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Carrousel des certifications */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
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
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image de la certification */}
                  <motion.div
                    className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${certifications[currentIndex].color} opacity-20`}
                    />
                    <Image
                      src={certifications[currentIndex].image || "/placeholder.svg"}
                      alt={certifications[currentIndex].title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                    />
                  </motion.div>

                  {/* Détails de la certification */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Award className="w-6 h-6 text-[#50FA7B]" />
                        <h3 className="text-2xl font-bold text-[#F8F8F2]">{certifications[currentIndex].title}</h3>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-2 text-[#6272A4]"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{certifications[currentIndex].date}</span>
                      </motion.div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-[#F8F8F2]"
                    >
                      {certifications[currentIndex].description}
                    </motion.p>

                    {/* Compétences validées */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <h4 className="text-[#FF79C6] font-semibold">Compétences validées</h4>
                      <div className="flex flex-wrap gap-2">
                        {certifications[currentIndex].skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[#44475A] text-[#8BE9FD]"
                          >
                            <Check className="w-3 h-3" />
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Lien de vérification */}
                    <motion.a
                      href={certifications[currentIndex].verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#44475A] text-[#F8F8F2] hover:bg-[#6272A4] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Vérifier la certification
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicateurs de navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {certifications.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#50FA7B] scale-110"
                      : "bg-[#44475A] hover:bg-[#6272A4] hover:scale-110"
                  }`}
                  aria-label={`Voir certification ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </MacWindow>
      </div>
    </section>
  )
}
