import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" debe coincidir con el nombre del repositorio en GitHub para que
// los recursos se carguen bien en https://<usuario>.github.io/<repo>/
export default defineConfig({
  plugins: [react()],
  base: '/finanzas-personales/',
});
