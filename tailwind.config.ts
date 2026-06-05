import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marinho: "#010238",
        "marinho-2": "#0a0c4a",
        papoula: "#ff0000",
        branco: "#ffffff",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        tech: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
