"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D } from "@react-three/drei"
import type * as THREE from "three"

const ProgrammingIcon = ({ position, icon, color, rotation = [0, 0, 0] }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <Text3D
      ref={meshRef}
      font="/fonts/Geist_Regular.json"
      size={0.5}
      height={0.1}
      position={position}
      rotation={rotation}
    >
      {icon}
      <meshPhongMaterial color={color} />
    </Text3D>
  )
}

export default function ParticleField() {
  const particlesRef = useRef<THREE.Group>(null)

  const particleCount = 50

  const particles = useMemo(() => {
    const icons = [
      { text: "JS", color: "#f7df1e" },
      { text: "TS", color: "#007acc" },
      { text: "Py", color: "#3776ab" },
      { text: "React", color: "#61dafb" },
      { text: "</>", color: "#e44d26" },
      { text: "{ }", color: "#ff79c6" },
      { text: "&&", color: "#50fa7b" },
      { text: "=>", color: "#bd93f9" },
      { text: "[]", color: "#8be9fd" },
      { text: "()", color: "#f1fa8c" },
    ]

    const temp = []
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      const iconData = icons[Math.floor(Math.random() * icons.length)]
      temp.push({
        position: [x, y, z],
        icon: iconData.text,
        color: iconData.color,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.075

      particlesRef.current.children.forEach((child, i) => {
        const t = state.clock.getElapsedTime() + i * 100
        child.position.y = particles[i].position[1] + Math.sin(t * 0.2) * 0.5
        child.rotation.x = t * 0.2
        child.rotation.y = t * 0.1
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((props, i) => (
        <ProgrammingIcon key={i} {...props} />
      ))}
    </group>
  )
}
