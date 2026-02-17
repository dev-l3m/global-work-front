import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    // Visualizer pour analyser le bundle (optionnel, activé avec --analyze)
    process.env.ANALYZE === 'true' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Minification activée par défaut en production
    minify: 'esbuild', // Plus rapide que terser
    cssMinify: true,
    // Sourcemaps uniquement en dev (pas en prod pour sécurité)
    sourcemap: false,
    // Target moderne pour réduire la taille du bundle
    target: 'esnext',
    // Optimisations de rollup
    rollupOptions: {
      output: {
        // Code splitting manuel pour optimiser le cache
        manualChunks: id => {
          // Vendor chunks séparés pour meilleur cache
          if (id.includes('node_modules')) {
            // Vuetify dans son propre chunk (gros)
            if (id.includes('vuetify')) {
              return 'vuetify'
            }
            // Vue core dans son propre chunk
            if (id.includes('vue') && !id.includes('node_modules/vue-router')) {
              return 'vue-core'
            }
            // Vue Router séparé
            if (id.includes('vue-router')) {
              return 'vue-router'
            }
            // Autres vendors
            return 'vendor'
          }
        },
        // Noms de fichiers avec hash pour cache optimal
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.name || '')) {
            return `assets/img/[name]-[hash].${ext}`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
            return `assets/fonts/[name]-[hash].${ext}`
          }
          return `assets/[ext]/[name]-[hash].${ext}`
        },
      },
    },
    // Limite de taille pour avertir sur les gros chunks
    chunkSizeWarningLimit: 1000,
    // Optimisations CSS
    cssCodeSplit: true,
  },
  // Optimisations pour le dev server
  server: {
    // Options du serveur de développement
  },
  // Préchargement des modules critiques
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'vuetify'],
  },
})
