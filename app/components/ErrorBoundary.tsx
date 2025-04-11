"use client"

import React, { type ErrorInfo } from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Composant ErrorBoundary
 * Capture les erreurs dans ses composants enfants et affiche une UI de repli
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Mettre à jour l'état pour que le prochain rendu affiche l'UI de repli
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Vous pouvez également logger l'erreur dans un service de reporting
    console.error("Erreur capturée par ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez rendre n'importe quelle UI de repli
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
            <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Quelque chose s'est mal passé.</h1>
            <p className="text-gray-300 mb-8">Nous sommes désolés, une erreur inattendue s'est produite.</p>

            {this.state.error && (
              <div className="mb-4 p-4 bg-gray-900 rounded text-left overflow-auto max-h-[200px] text-sm">
                <p className="text-red-400 font-mono">{this.state.error.toString()}</p>
              </div>
            )}

            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
