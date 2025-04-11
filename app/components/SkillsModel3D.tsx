"use client"

import { useRef, Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PresentationControls } from "@react-three/drei"
import type { Mesh as CustomMesh } from "@/utils/three"

function FallbackModel() {
  const meshRef = useRef<CustomMesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.2
      meshRef.current.rotation.y = Math.cos(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={hovered ? "#f5cd79" : "#f0c064"} />
    </mesh>
  )
}

export function SkillsModel3D() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a202c]/90 to-[#2d3748]/90">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <FallbackModel />
          </PresentationControls>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
