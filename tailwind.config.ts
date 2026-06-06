import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // tokens temáticos (claro/escuro) via CSS vars
        marinho: "rgb(var(--c-bg) / <alpha-value>)",        // fundo
        "marinho-2": "rgb(var(--c-surface) / <alpha-value>)", // superfícies/cards
        ink: "rgb(var(--c-ink) / <alpha-value>)",           // texto
        line: "rgb(var(--c-line) / <alpha-value>)",         // bordas/divisores
        // cores fixas da marca
        papoula: "#ff0000",
        branco: "#ffffff",
        // tons escuros fixos (cromos que permanecem escuros nos dois temas)
        navy: "#010238",
        "navy-2": "#0a0c4a",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        tech: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
