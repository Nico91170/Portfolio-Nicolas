// Centraliser les métadonnées dans un fichier séparé
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio - Nicolas Pires De Jesus",
  description: "Portfolio de Nicolas Pires De Jesus - Développeur Full Stack",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.nicolaspiresdejesus.fr",
    siteName: "Portfolio de Nicolas Pires De Jesus",
  },
  twitter: {
    card: "summary_large_image",
    site: "@votre_compte_twitter",
  },
}
