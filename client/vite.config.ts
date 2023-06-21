import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      includeAssets: ["assets/favicon.ico", "assets/apple-touch-icon.png"],
      manifest: {
        name: "Stockpile",
        short_name: "Stockpile",
        theme_color: "#ffffff",
        icons: [
          {
            src: "assets/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
  build: {
    outDir: "../server/dist",
  },
});
