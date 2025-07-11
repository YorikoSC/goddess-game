import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'My Dear Lina',
        short_name: 'MDL',
        description: 'A visual novel game featuring Lina and her adventures.',
        theme_color: '#4d5ce4',
        background_color: '#282631',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'img/icons/MDL-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/icons/MDL-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,webp}', 'chapters/**/*.js'],
        globDirectory: 'dist/',
        runtimeCaching: [
          {
            urlPattern: /\/chapters\/arc\d+\/.*\.js/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'chapters-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
      // Обеспечиваем копирование папки chapters в dist
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.startsWith('chapters/')) {
            return '[name][extname]'; // Сохраняем структуру папки chapters
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Копируем папку chapters в dist
    assetsInclude: ['chapters/**/*.js'],
  },
  server: {
    mimeTypes: {
      'application/javascript': ['js'], // Указываем MIME-тип для .js
    },
  },
  preview: {
    mimeTypes: {
      'application/javascript': ['js'], // MIME-тип для preview-режима
    },
  },
});