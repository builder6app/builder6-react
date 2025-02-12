import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import createExternal from 'vite-plugin-external';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createExternal({
      interop: 'auto',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        '@builder6/react': 'Builder6React',
      }
    }),
  ],
  // external react
  build: {
    minify: false,
    rollupOptions: {
      output: {
        format: 'iife',
      }
    },
  },
});
