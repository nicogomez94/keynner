import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'KeyNest - Local Verificado',
        short_name: 'KeyNest',
        description: 'Sistema de intercambio de llaves para locales verificados',
        theme_color: '#ffffff',
        icons: [
          // En producción, estos iconos deberían reemplazarse con imágenes reales
          {
            src: 'pwa-192x192.png', // Placeholder - crear este icono
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Placeholder - crear este icono
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
