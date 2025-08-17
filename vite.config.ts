import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@presentation': path.resolve(__dirname, './src/presentation'),
      '@application': path.resolve(__dirname, './src/application'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production to reduce bundle size
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
          utils: ['axios'],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk'
          return `js/${facadeModuleId}-[hash].js`
        },
        // Enhanced cache busting with version and hash
        assetFileNames: (assetInfo) => {
          // @ts-ignore - name is deprecated but still functional
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1] || 'unknown'
          // @ts-ignore - name is deprecated but still functional
          if (/\.(css|js)$/.test(assetInfo.name || '')) {
            return `assets/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].[ext]`
        },
        // Add version to entry file names for better cache busting
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit
    assetsInlineLimit: 4096, // Inline small assets
  },
}) 