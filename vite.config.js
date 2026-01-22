import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/websitedesignandcreation/',

    server: {
        host: true,
        port: 5173,
    },

    plugins: [
        tailwindcss(),
    ],
});
