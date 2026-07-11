import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base ('./') beim Build macht die App subpfad-sicher,
// sodass sie auch unter https://<user>.github.io/<repo>/ ohne Anpassung läuft.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "./" : "/",
  plugins: [react()],
  server: { host: true, port: 5173 },
}));
