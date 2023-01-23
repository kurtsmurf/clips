import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { qrcode } from 'vite-plugin-qrcode';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/clips/',
  plugins: [
    solidPlugin(),
    qrcode(),
    VitePWA(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
