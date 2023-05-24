import glsl from 'vite-plugin-glsl';
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [glsl()],
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                relativeUrls: true,
                javascriptEnabled: true,
            },
        },
    }
})