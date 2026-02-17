#!/usr/bin/env node

/**
 * Script d'audit de performance
 * Analyse le bundle et génère un rapport
 */

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

function analyzeBuild() {
  const distPath = join(projectRoot, 'dist')

  if (!existsSync(distPath)) {
    console.log('❌ Dossier dist/ introuvable. Exécutez "npm run build" d\'abord.')
    return null
  }

  const statsPath = join(distPath, 'stats.html')
  const hasStats = existsSync(statsPath)

  console.log('\n📊 AUDIT DE PERFORMANCE\n')
  console.log('='.repeat(60))

  if (hasStats) {
    console.log('✅ Analyse du bundle disponible dans dist/stats.html')
    console.log('   Ouvrez ce fichier dans votre navigateur pour voir la visualisation.\n')
  }

  // Analyse des fichiers principaux
  const indexHtmlPath = join(distPath, 'index.html')
  if (existsSync(indexHtmlPath)) {
    const indexHtml = readFileSync(indexHtmlPath, 'utf-8')
    const scriptTags = indexHtml.match(/<script[^>]*src="([^"]+)"[^>]*>/g) || []
    const linkTags = indexHtml.match(/<link[^>]*href="([^"]+)"[^>]*>/g) || []

    console.log('📄 Fichiers référencés dans index.html:')
    console.log(`   - ${scriptTags.length} scripts`)
    console.log(`   - ${linkTags.length} feuilles de style\n`)
  }

  // Vérification des assets
  const assetsPath = join(distPath, 'assets')
  if (existsSync(assetsPath)) {
    console.log('📦 Structure des assets:')
    console.log('   Vérifiez dist/assets/ pour les fichiers générés\n')
  }

  return {
    hasStats,
    distPath,
  }
}

function checkConfig() {
  console.log('⚙️  Configuration Vite:')

  const viteConfigPath = join(projectRoot, 'vite.config.ts')
  if (existsSync(viteConfigPath)) {
    const config = readFileSync(viteConfigPath, 'utf-8')

    const checks = {
      'Minification activée': config.includes('minify'),
      'Code splitting configuré': config.includes('manualChunks'),
      'CSS minifié': config.includes('cssMinify'),
      'Sourcemaps désactivés en prod': config.includes('sourcemap: false'),
    }

    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`)
    })
  }

  console.log('')
}

function checkVercelConfig() {
  console.log('🚀 Configuration Vercel:')

  const vercelConfigPath = join(projectRoot, 'vercel.json')
  if (existsSync(vercelConfigPath)) {
    const config = readFileSync(vercelConfigPath, 'utf-8')

    const checks = {
      'Cache headers pour assets': config.includes('max-age=31536000'),
      'Cache immutable activé': config.includes('immutable'),
      'Headers sécurité configurés': config.includes('X-Content-Type-Options'),
    }

    Object.entries(checks).forEach(([check, passed]) => {
      console.log(`   ${passed ? '✅' : '❌'} ${check}`)
    })
  }

  console.log('')
}

function generateRecommendations() {
  console.log('💡 Recommandations Core Web Vitals:\n')

  const recommendations = [
    {
      metric: 'LCP (Largest Contentful Paint)',
      target: '< 2.5s',
      tips: [
        '✅ Image hero avec fetchpriority="high" et loading="eager"',
        '✅ Précharger les ressources critiques',
        '⚠️  Optimiser les images (WebP, dimensions adaptées)',
        '⚠️  Minimiser le CSS/JS bloquant',
      ],
    },
    {
      metric: 'INP (Interaction to Next Paint)',
      target: '< 200ms',
      tips: [
        '✅ Code splitting pour réduire le JS initial',
        '✅ Lazy loading des composants non critiques',
        '⚠️  Éviter les event listeners lourds',
        '⚠️  Optimiser les animations',
      ],
    },
    {
      metric: 'CLS (Cumulative Layout Shift)',
      target: '< 0.1',
      tips: [
        '✅ Dimensions explicites sur les images (width/height ou aspect-ratio)',
        "✅ Réserver l'espace pour les contenus dynamiques",
        '✅ Éviter les polices qui causent FOIT/FOUT',
        '⚠️  Précharger les fonts critiques',
      ],
    },
  ]

  recommendations.forEach(({ metric, target, tips }) => {
    console.log(`📈 ${metric} - Cible: ${target}`)
    tips.forEach(tip => console.log(`   ${tip}`))
    console.log('')
  })
}

// Exécution
console.log('\n🔍 Audit de Performance - Global Work Hub\n')

checkConfig()
checkVercelConfig()
const buildInfo = analyzeBuild()
generateRecommendations()

console.log('='.repeat(60))
console.log('\n📝 Prochaines étapes:')
console.log('   1. Exécutez "npm run build" pour générer le bundle')
console.log('   2. Exécutez "npm run build -- --analyze" pour visualiser le bundle')
console.log('   3. Testez avec Lighthouse (Chrome DevTools)')
console.log('   4. Vérifiez les headers de cache dans Network tab')
console.log('   5. Surveillez les Core Web Vitals en production\n')

if (buildInfo && buildInfo.hasStats) {
  console.log('✨ Analyse détaillée disponible dans dist/stats.html\n')
}
