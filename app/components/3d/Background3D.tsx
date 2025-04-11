"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

const PARTICLE_COUNT = 5000
const PARTICLE_RADIUS = 2

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  const positions = useRef<Float32Array | null>(null)

  if (positions.current === null) {
    positions.current = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = Math.cbrt(Math.random()) * PARTICLE_RADIUS

      positions.current[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions.current[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions.current[i * 3 + 2] = r * Math.cos(phi)
    }
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30
      ref.current.rotation.y -= delta / 35
    }
  })

  return (
    <Points ref={ref} positions={positions.current} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#4a90e2" size={0.005} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
    </Points>
  )
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  )
}
