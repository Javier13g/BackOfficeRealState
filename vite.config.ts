import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          antd: ['antd'], // Divide Ant Design en un chunk separado
          react: ['react', 'react-dom'], // Divide React y ReactDOM
        },
      },
    },
  },
})