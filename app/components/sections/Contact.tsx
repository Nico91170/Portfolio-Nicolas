"use client"
import { motion, useAnimation } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { SectionTitle } from "../SectionTitle"
import { useEffect } from "react"
import { Terminal, Send } from "lucide-react"

const schema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(1, "Le message est requis"),
})

type FormData = z.infer<typeof schema>

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
  }

  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    })
  }, [controls])

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Contact" />

        {/* Effet de terminal */}
        <motion.div
          className="w-full max-w-lg mx-auto bg-gray-800 rounded-t-lg mb-4 flex items-center px-4 py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <Terminal className="ml-auto text-gray-400" size={16} />
        </motion.div>

        {/* Effet de code tapé */}
        <motion.div
          className="mb-8 font-mono text-blue-400 text-sm max-w-lg mx-auto"
          initial="initial"
          animate={controls}
        >
          {`const contactMe = async () => {`.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-gray-800 p-6 rounded-b-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-400 font-mono mb-2">
              name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-400 font-mono mb-2">
              email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-blue-400 font-mono mb-2">
              message:
            </label>
            <textarea
              id="message"
              {...register("message")}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
          >
            <Send className="mr-2" size={16} />
            Envoyer
          </button>
        </motion.form>

        <motion.div
          className="mt-8 font-mono text-blue-400 text-sm max-w-lg mx-auto"
          initial="initial"
          animate={controls}
        >
          {`};`.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
