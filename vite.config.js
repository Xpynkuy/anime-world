import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild', // Минимизирует с использованием esbuild
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react'; // Выделение React в отдельный chunk
            }
            if (id.includes('axios')) {
              return 'axios'; // Выделение axios
            }
          }
        },
      },
    },
  },
});
