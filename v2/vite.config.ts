import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        glsl()
    ]
});