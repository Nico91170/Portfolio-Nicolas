import "./globals.css"
import "./styles/syntax-highlighting.css"
import { ThemeProvider } from "./components/theme-provider"
import { ScrollProgress } from "./components/ui/ScrollProgress"
import { IDENotification } from "./components/IDENotification"
// import { FloatingMenu } from "./components/FloatingMenu" // Removed import
import ErrorBoundary from "./components/ErrorBoundary"
import type { Metadata } from "next"
import type React from "react"
import { Inter } from "next/font/google"

// Configuration de la police Inter pour une utilisation optimisée
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

// Métadonnées de la page pour le SEO
export const metadata: Metadata = {
  title: "Portfolio - Nicolas Pires De Jesus",
  description: "Portfolio de Nicolas Pires De Jesus - Développeur Full Stack",
  // Ajout de métadonnées supplémentaires pour améliorer le SEO
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.nicolaspiresdejesus.fr",
    siteName: "Portfolio de Nicolas Pires De Jesus",
  },
  twitter: {
    card: "summary_large_image",
    site: "@votre_compte_twitter", // Remplacez par votre compte Twitter si vous en avez un
  },
    generator: 'v0.dev'
}

/**
 * Composant de mise en page racine
 * Définit la structure globale de l'application
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.className} dark`}>
      <head>
        <link rel="preload" href="/fonts/SuperMarioBros-ov7d.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        {/* Ajout de balises meta pour améliorer le SEO et l'expérience utilisateur */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-[#0f172a] text-white">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <ScrollProgress />
            <IDENotification />
            {/* <FloatingMenu /> */} {/* Removed FloatingMenu component */}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}


import './globals.css'