import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { qrcode } from 'vite-plugin-qrcode';


export default defineConfig({
  plugins: [
    solidPlugin(),
    qrcode(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
