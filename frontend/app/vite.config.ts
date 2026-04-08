import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import path from 'path'

function asyncAssetsPlugin(): Plugin {
  return {
    name: 'async-assets',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const cssFiles = Object.keys(ctx.bundle).filter(file => file.endsWith('.css'));
        const jsFiles = Object.keys(ctx.bundle).filter(file => file.endsWith('.js') && file.includes('index-'));
        
        let modifiedHtml = html;
        
        // Inject JS Preload
        if (jsFiles.length > 0) {
            const mainJs = jsFiles[0];
            modifiedHtml = modifiedHtml.replace(
                '</head>',
                `  <link rel="preload" href="/${mainJs}" as="script">\n  </head>`
            );
        }

        // Defer CSS loading
        for (const cssFile of cssFiles) {
          modifiedHtml = modifiedHtml.replace(
            new RegExp(`<link[^>]*?href="[^"]*?${cssFile}"[^>]*?>`),
            `<link rel="preload" href="/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/${cssFile}"></noscript>`
          );
        }
        return modifiedHtml;
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), ViteImageOptimizer(), asyncAssetsPlugin()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor';
          }
          if (id.includes('/components/ui/')) {
            return 'ui';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@types-app': path.resolve(__dirname, './src/types'),
      '@design-system': path.resolve(__dirname, './src/design-system'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
})
