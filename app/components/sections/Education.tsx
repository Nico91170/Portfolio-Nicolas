"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Building2, BookOpen, Award } from "lucide-react"
import { SectionTitle } from "../SectionTitle"
import { CodeElement } from "../CodeElement"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const education = [
  {
    degree: "2ème année BTS SIO Option SLAM",
    school: "Groupe Aurlom Éducation",
    date: "2024 - 2025",
    type: "Apprentissage",
    description: "Approfondissement des compétences en développement logiciel et applications mobiles.",
    skills: ["Java", "C#", "React Native", "DevOps"],
    color: "from-blue-500 to-cyan-500",
    icon: BookOpen,
  },
  {
    degree: "BTS SIO Option SLAM",
    school: "Lycée Parc de Vilgénis",
    date: "2022 - 2024",
    description: "Formation en Solutions Logicielles et Applications Métiers.",
    skills: ["PHP", "JavaScript", "SQL", "UML"],
    color: "from-purple-500 to-pink-500",
    icon: GraduationCap,
  },
  {
    degree: "Formation Développeur Web",
    school: "Doranco Ecole Sup' des Tech Créatives",
    date: "Avril 2022 - Juillet 2022",
    description: "Formation intensive en développement web front-end et back-end.",
    skills: ["HTML/CSS", "JavaScript", "Node.js", "MongoDB"],
    color: "from-green-500 to-teal-500",
    icon: Award,
  },
  {
    degree: "Baccalauréat technologique STI2D",
    school: "Lycée Gaspard Monge",
    date: "2019 - 2021",
    description: "Spécialité Systèmes d'Information et Numérique.",
    skills: ["Électronique", "Programmation", "Réseaux", "Développement durable"],
    color: "from-yellow-500 to-orange-500",
    icon: Award,
  },
]

const EducationCard = ({ edu, index }) => {
  const cardRef = useRef(null)
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-center justify-between"
    >
      <motion.div
        className={`absolute left-1/2 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2 ${
          index % 2 === 0 ? "-translate-y-1/2" : "translate-y-1/2"
        }`}
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      />
      <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "ml-auto pl-8"}`}>
        <motion.div
          className={`p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 ${
            index % 2 === 0 ? "hover:translate-x-2" : "hover:-translate-x-2"
          }`}
          whileHover={{ scale: 1.05 }}
        >
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${edu.color} opacity-10`} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <edu.icon className="w-6 h-6 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{edu.date}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
            <div className="flex items-center text-gray-400 mb-2">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{edu.school}</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{edu.description}</p>
            <div className="flex flex-wrap gap-2">
              {edu.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Education() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="formations" className="relative py-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/circuit-board.svg')",
          backgroundSize: "cover",
          opacity: 0.05,
          y,
        }}
      />
      <CodeElement code="const knowledge = []" x="5%" y="5%" rotate={-5} />
      <CodeElement code="for (const course of education) {" x="85%" y="15%" rotate={10} />
      <CodeElement code="knowledge.push(course.skills)" x="10%" y="85%" rotate={5} />
      <CodeElement code="}" x="90%" y="90%" rotate={-8} />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <SectionTitle title="Parcours de Formation" />
        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 transform -translate-x-1/2" />
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
