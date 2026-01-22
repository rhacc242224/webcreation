import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/webcreation/',

    server: {
        host: true,
        port: 5173,
    },

    plugins: [
        tailwindcss(),
    ],
});
