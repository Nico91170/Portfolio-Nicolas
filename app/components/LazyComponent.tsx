"use client"

import { Suspense, lazy, type ComponentType } from "react"
import type React from "react" // Added import for React

interface LazyComponentProps {
  component: () => Promise<{ default: ComponentType<any> }>
  fallback?: React.ReactNode
}

export function LazyComponent({ component, fallback = null }: LazyComponentProps) {
  const LazyComp = lazy(component)

  return (
    <Suspense fallback={fallback}>
      <LazyComp />
    </Suspense>
  )
}
