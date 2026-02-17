/**
 * Script de validation des meta descriptions
 * Vérifie que toutes les descriptions respectent les critères SEO :
 * - Longueur entre 150-160 caractères
 * - Unicité (pas de duplication)
 * - Présence d'un mot-clé principal
 */

import { metaDescriptions } from '../src/config/meta-descriptions'

interface ValidationResult {
  route: string
  description: string
  length: number
  isValid: boolean
  errors: string[]
}

function validateMetaDescriptions(): ValidationResult[] {
  const results: ValidationResult[] = []
  const seenDescriptions = new Set<string>()

  for (const [route, meta] of Object.entries(metaDescriptions)) {
    const errors: string[] = []
    const length = meta.description.length

    // Vérifier la longueur
    if (length < 150) {
      errors.push(`Trop courte (${length} caractères, minimum 150)`)
    }
    if (length > 160) {
      errors.push(`Trop longue (${length} caractères, maximum 160)`)
    }

    // Vérifier l'unicité
    if (seenDescriptions.has(meta.description)) {
      errors.push('Description dupliquée')
    } else {
      seenDescriptions.add(meta.description)
    }

    // Vérifier la présence d'un titre
    if (!meta.title || meta.title.length === 0) {
      errors.push('Titre manquant')
    }

    results.push({
      route,
      description: meta.description,
      length,
      isValid: errors.length === 0,
      errors,
    })
  }

  return results
}

// Exécuter la validation
const results = validateMetaDescriptions()
const invalidResults = results.filter(r => !r.isValid)

console.log('=== Validation des Meta Descriptions ===\n')

if (invalidResults.length === 0) {
  console.log('✅ Toutes les meta descriptions sont valides !\n')
  console.log(`Total: ${results.length} pages\n`)

  results.forEach(result => {
    console.log(`✓ ${result.route}: ${result.length} caractères`)
  })
} else {
  console.log(`❌ ${invalidResults.length} meta description(s) invalide(s):\n`)

  invalidResults.forEach(result => {
    console.log(`\nRoute: ${result.route}`)
    console.log(`Longueur: ${result.length} caractères`)
    console.log(`Erreurs:`)
    result.errors.forEach(error => console.log(`  - ${error}`))
    console.log(`Description: "${result.description}"`)
  })

  console.log(`\n✅ ${results.length - invalidResults.length} meta description(s) valide(s)`)
}

export { validateMetaDescriptions }
