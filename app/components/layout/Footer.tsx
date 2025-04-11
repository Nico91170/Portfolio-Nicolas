"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Terminal, Code2, Cpu, Globe, ChevronRight } from "lucide-react"
import Link from "next/link"
import type React from "react"

// Définition des liens sociaux
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Nico91170",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/nicolas-pires-de-jesus",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:contact@nicolaspiresdejesus.fr",
    icon: Mail,
  },
]

// Définition des sections du footer
const sections = [
  {
    title: "Navigation",
    links: [
      { name: "À propos", href: "#à-propos" },
      { name: "Compétences", href: "#compétences" },
      { name: "Projets", href: "#projets" },
      { name: "Contact", href: "#contact" },
      { name: "Certifications", href: "#certifications" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { name: "CV", href: "/cv.pdf" },
      { name: "Portfolio", href: "#" },
      { name: "Blog", href: "#blog" },
    ],
  },
]

/**
 * Composant pour les liens du footer
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.href - L'URL du lien
 * @param {React.ReactNode} props.children - Le contenu du lien
 */
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="group flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
    {children}
  </Link>
)

/**
 * Composant pour les commentaires de code dans le footer
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Le contenu du commentaire
 */
const CodeComment = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-500 font-mono text-sm">
    <span className="text-blue-500">//</span> {children}
  </div>
)

/**
 * Composant Footer
 * Affiche le pied de page du site avec des liens de navigation, des ressources et des liens sociaux
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-32 border-t border-gray-800">
      {/* Fond avec effet de code */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 py-12 relative">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo et description */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center space-x-2 text-xl font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Terminal className="w-5 h-5 text-blue-500" />
              <span className="text-white">npj.dev</span>
            </motion.div>
            <CodeComment>Développeur Full Stack passionné</CodeComment>
            <p className="text-gray-400 text-sm">
              Création d'applications web modernes et performantes avec les dernières technologies.
            </p>
          </div>

          {/* Sections de navigation */}
          {sections.map((section) => (
            <div key={section.title}>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-white">
                  <Code2 className="w-4 h-4 text-blue-500" />
                  <h3 className="font-mono">{section.title}</h3>
                </div>
                <div className="space-y-2">
                  {section.links.map((link) => (
                    <FooterLink key={link.name} href={link.href}>
                      {link.name}
                    </FooterLink>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}

          {/* Section technologique */}
          <div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-white">
                <Cpu className="w-4 h-4 text-blue-500" />
                <h3 className="font-mono">Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Globe className="w-4 h-4" />
              <span>© {currentYear} Nicolas Pires De Jesus. Tous droits réservés.</span>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                  <motion.span
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                    initial={false}
                  >
                    {social.name}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Easter egg */}
        <div className="absolute bottom-4 right-4 opacity-30 font-mono text-xs text-gray-600">
          <pre className="hidden md:block">
            {`if (enjoyedPortfolio) {
  contact();
}`}
          </pre>
        </div>
      </div>
    </footer>
  )
}
