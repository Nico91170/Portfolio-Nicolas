import Link from "next/link"

/**
 * Page 404 personnalisée
 * Affichée lorsqu'une route n'est pas trouvée
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Page non trouvée</h2>
        <p className="text-gray-300 mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
        <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
