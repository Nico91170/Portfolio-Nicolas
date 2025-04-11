"use client"

import { Link } from "react-scroll"
import type { ReactNode } from "react"

interface ScrollLinkProps {
  to: string
  children: ReactNode
  className?: string
  activeClass?: string
  spy?: boolean
  smooth?: boolean
  offset?: number
  duration?: number
  onClick?: () => void
}

/**
 * Composant wrapper pour react-scroll Link
 * Permet de naviguer en douceur vers les sections de la page
 */
export default function ScrollLink({
  to,
  children,
  className,
  activeClass,
  spy = true,
  smooth = true,
  offset = -70,
  duration = 500,
  onClick,
}: ScrollLinkProps) {
  return (
    <Link
      to={to}
      className={className}
      activeClass={activeClass}
      spy={spy}
      smooth={smooth}
      offset={offset}
      duration={duration}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
