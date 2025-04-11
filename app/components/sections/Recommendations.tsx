"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Quote } from "lucide-react"
import { SectionTitle } from "../SectionTitle"

const recommendations = [
  {
    text: "J'ai eu l'opportunité d'accueillir Nicolas dans notre équipe pendant son BTS. Nicolas a su s'intégrer rapidement et faire preuve d'autonomie pour réaliser les tâches demandés. C'est quelqu'un d'investi et qui sait s'appliquer.",
    author: "Baptiste Polvé",
    title: "Co-fondateur & CTO chez Snowpack | Expert Cybersécurité (ESSI)",
    email: "baptiste.polve@snowpack.eu",
  },
  {
    text: "J'ai été impressionné par les compétences techniques de Nicolas...",
    author: "Jean-Baptiste LY",
    title: "Chef de Projet Informatique chez Mutuaide Assistance",
    email: "jean-baptiste.ly@mutuaide.fr",
  },
]

export function Recommendations() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="relative py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <SectionTitle title="Recommandations" />

        <div className="max-w-4xl mx-auto">
          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mb-8">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === index ? "bg-blue-400" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Voir recommandation ${index + 1}`}
              />
            ))}
          </div>

          {/* Recommendations carousel */}
          <div className="relative">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: current === index ? 1 : 0,
                  x: current === index ? 0 : 100,
                  position: current === index ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="bg-[#232b3b] rounded-xl p-8 shadow-xl">
                  <Quote className="text-blue-400 w-8 h-8 mb-6" />
                  <p className="text-white text-xl mb-8">{rec.text}</p>
                  <div className="space-y-2">
                    <p className="text-blue-400 font-medium">{rec.author}</p>
                    <p className="text-gray-400 text-sm">{rec.title}</p>
                    <a
                      href={`mailto:${rec.email}`}
                      className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-300"
                    >
                      {rec.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
