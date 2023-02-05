import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { qrcode } from 'vite-plugin-qrcode';
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  base: '/clips/',
  plugins: [
    solidPlugin(),
    qrcode(),
    VitePWA(),
    // We use web crypto to generate content hashes for audio.
    // Browsers do not expost window.crypto in insecure contexts.
    // This led to the follwing issue during development:
    // when accessing the dev server from a phone over the local
    // network (e.g. "http://192.168.0.1/clips"), window.crypto
    // was undefined.
    // mkcert enables us to host the dev server with https using
    // a locally trusted certificate.
    mkcert(),
  ],

  server: {
    port: 3000,
    host: true,
  },
  build: {
    target: "esnext",
  },
});
