import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import JSDOMRenderer from '@prerenderer/renderer-jsdom'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    prerender({
      routes: [
        '/',
        '/about',
        '/contact-us',
        '/terms-and-conditions',
        '/refunds-and-cancellations',
        '/privacy-policy',
        '/cbse-question-bank',
        '/bihar-board-question-bank',
        '/class-10-question-bank',
        '/class-12-question-bank',
        '/blog/bihar-board-class-12-previous-year-questions',
        '/blog/cbse-class-10-most-repeated-questions',
        '/choose-plan'
      ],
      renderer: new JSDOMRenderer({
        renderAfterTime: 1000,
        maxConcurrentRoutes: 4
      }),
      server: {
        port: 5173
      }
    }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: true, // listen on LAN so phone / Wi‑Fi can open the site
    port: Number(process.env.VITE_DEV_PORT || process.env.PORT) || 5173,
    strictPort: false,
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
