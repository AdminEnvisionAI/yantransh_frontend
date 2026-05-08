import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    loader: "tsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    // Allows Nginx to "see" the Vite dev server internally
    host: "0.0.0.0", 
    // Set this to match the "App Port" in CloudPanel (usually 5173)
    port: 5173,      
    strictPort: true,
    allowedHosts: [
      "yantranshvt.com",
      "www.yantranshvt.com",
      "2654-2405-201-5c16-80db-3dea-7f92-d31-353f.ngrok-free.app", // Keeping your ngrok
    ],
  },
});