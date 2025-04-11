"use client"

import { motion } from "framer-motion"
import { Github, GitBranch, GitCommit, Star, Users } from "lucide-react"
import Image from "next/image"

export function GitHubCard() {
  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Terminal-like header */}
      <div className="bg-[#1a1b26] rounded-t-lg border border-blue-500/20 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center space-x-2 text-gray-400 font-mono text-sm">
          <Github className="w-4 h-4" />
          <span>github.com/Nico91170</span>
        </div>
        <div className="w-16" /> {/* Spacer for symmetry */}
      </div>

      {/* Main content */}
      <motion.div
        className="bg-[#1a1b26]/95 border border-t-0 border-blue-500/20 rounded-b-lg p-6 backdrop-blur-sm"
        whileHover={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.1)" }}
      >
        <div className="flex items-start space-x-6">
          {/* Profile image */}
          <motion.div
            className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-blue-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="https://sjc.microlink.io/7yiuUOLUCK_UxtgbThmUDg1OLURwS5N99lwBhVM34qWNmMkw8C4RwUl_uFksA6pRyuzFdxaDTQPf6TkVc2Ksug.jpeg"
              alt="GitHub Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>

          {/* Profile info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Nicolas Pires De Jesus</h3>
              <motion.a
                href="https://github.com/Nico91170"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-sm">Follow</span>
              </motion.a>
            </div>

            <p className="text-gray-400 font-mono text-sm">@Nico91170</p>

            {/* GitHub stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Followers: 0</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Stars: 0</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitBranch className="w-4 h-4" />
                <span>Repositories: 6</span>
              </div>
            </div>

            {/* Code-like decoration */}
            <div className="font-mono text-sm">
              <div className="text-blue-400">
                class <span className="text-green-400">Developer</span> {`{`}
              </div>
              <div className="pl-4">
                <span className="text-purple-400">const</span> <span className="text-yellow-400">githubProfile</span> ={" "}
                <span className="text-green-400">"Nico91170"</span>;
              </div>
              <div>{`}`}</div>
            </div>
          </div>
        </div>

        {/* Latest activity */}
        <div className="mt-6 border-t border-gray-800 pt-4">
          <div className="flex items-center space-x-2 text-gray-400 font-mono text-sm">
            <GitCommit className="w-4 h-4" />
            <span>Latest activity:</span>
          </div>
          <div className="mt-2 space-y-2">
            <motion.div className="bg-blue-500/5 rounded-lg p-3 border border-blue-500/10" whileHover={{ x: 5 }}>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-300">Working on portfolio projects</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
