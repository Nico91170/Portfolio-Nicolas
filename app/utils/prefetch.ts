export function prefetchResources() {
  const resources = [
    "/api/projects",
    "/api/skills",
    // Ajoutez d'autres ressources à précharger
  ]

  resources.forEach((resource) => {
    fetch(resource)
  })
}
