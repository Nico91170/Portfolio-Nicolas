"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Jean Dupont",
    role: "Chef de projet chez TechCorp",
    content:
      "Nicolas est un développeur exceptionnel. Sa capacité à résoudre des problèmes complexes et à livrer des solutions de haute qualité est impressionnante.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Marie Martin",
    role: "Designer UX chez DesignStudio",
    content:
      "Travailler avec Nicolas a été un vrai plaisir. Il comprend parfaitement les besoins des designers et sait transformer nos maquettes en interfaces fonctionnelles et fluides.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Pierre Lefebvre",
    role: "CTO chez StartupInno",
    content:
      "Nicolas a joué un rôle clé dans le succès de notre projet. Sa polyvalence et sa capacité à apprendre rapidement de nouvelles technologies sont des atouts précieux.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="témoignages" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          Témoignages
        </motion.h2>
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <Quote className="text-4xl text-[#f5cd79] mb-4" />
            <p className="text-gray-700 mb-6">{testimonials[currentIndex].content}</p>
            <div className="flex items-center">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeft className="text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
