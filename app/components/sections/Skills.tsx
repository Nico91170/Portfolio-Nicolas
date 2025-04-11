"use client"

import React, { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { SectionTitle } from "../SectionTitle"
import Image from "next/image"
import { CodeElement } from "../CodeElement"
import { Code2, Database, Server, Wrench, Zap, GitMerge } from "lucide-react"
import { MacWindow } from "../MacWindow"

// Custom Workflow icon component
const Workflow = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
    </svg>
  )
}

const skills = [
  {
    category: "Front-end",
    icon: Code2,
    items: [
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      {
        name: "Tailwind CSS",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tailwind%20CSS%20Icon-6OW8YZseQZGw3jeO24DM2hGKKY4kqS.svg",
      },
      {
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    category: "Back-end",
    icon: Server,
    items: [
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      {
        name: "Laravel",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pngegg-0LdcRQ7ch2uasZoL9RBOs8eXwcGMnF.png",
      },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    category: "Bases de données",
    icon: Database,
    items: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    category: "Outils",
    icon: Wrench,
    items: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Webpack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
      { name: "NPM", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    category: "Méthodologies",
    icon: Workflow,
    items: [
      {
        name: "Agile",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/agile/agile-original.svg",
        customLogo: true,
      },
      {
        name: "Scrum",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scrum/scrum-original.svg",
        customLogo: true,
      },
      {
        name: "Kanban",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kanban/kanban-original.svg",
        customLogo: true,
      },
      {
        name: "TDD",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tdd/tdd-original.svg",
        customLogo: true,
      },
      {
        name: "MCD/MLD/UML",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/uml/uml-original.svg",
        customLogo: true,
      },
      {
        name: "DevOps",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devops/devops-original.svg",
        customLogo: true,
      },
    ],
    color: "from-indigo-500 to-blue-500",
  },
]

const SkillItem = React.memo(({ name, logo, customLogo }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
    >
      <div className="relative w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110">
        {customLogo ? (
          <div className="w-full h-full flex items-center justify-center text-blue-400">
            {name === "Agile" && <GitMerge className="w-10 h-10" />}
            {name === "Scrum" && <div className="text-3xl font-bold">S</div>}
            {name === "Kanban" && <div className="text-3xl">K</div>}
            {name === "TDD" && <div className="text-3xl">TDD</div>}
            {name === "MCD/MLD/UML" && <div className="text-xl">UML</div>}
            {name === "DevOps" && <Workflow className="w-10 h-10" />}
          </div>
        ) : (
          <Image
            src={logo || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="filter drop-shadow-lg"
            loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}
      </div>
      <p className="text-sm text-gray-300 font-medium group-hover:text-blue-400 transition-colors duration-300">
        {name}
      </p>
    </motion.div>
  )
})

SkillItem.displayName = "SkillItem"

const SkillCategory = React.memo(({ category, items, icon: Icon, color }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className={`p-3 rounded-full bg-gradient-to-br ${color} mr-4 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{category}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {items.map((skill) => (
          <SkillItem key={skill.name} {...skill} />
        ))}
      </div>
    </motion.div>
  )
})

SkillCategory.displayName = "SkillCategory"

export function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  const renderedCategories = useMemo(
    () => skills.map((skillCategory) => <SkillCategory key={skillCategory.category} {...skillCategory} />),
    [],
  )

  return (
    <section id="compétences" ref={ref} className="relative py-32 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

      <CodeElement code="const skills = developer.getSkills()" x="5%" y="5%" rotate={-10} />
      <CodeElement code="skills.forEach(skill => learn(skill))" x="85%" y="15%" rotate={10} />
      <CodeElement code="if (coffee.isEmpty()) refill()" x="10%" y="85%" rotate={5} />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="Compétences" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explorez mon arsenal technologique, forgé à travers des projets variés et une passion constante pour
            l'apprentissage.
          </p>
        </motion.div>

        <MacWindow title="skills.js">
          <div className="p-6 bg-gray-900/95">
            <div className="grid gap-8 mb-8">{renderedCategories}</div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-lg text-gray-400 mb-4">
                Et bien plus encore ! Je suis toujours en train d'apprendre et d'explorer de nouvelles technologies.
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full">
                <Zap className="w-5 h-5 mr-2" />
                <span>Constamment en évolution</span>
              </div>
            </motion.div>
          </div>
        </MacWindow>
      </div>
    </section>
  )
}
