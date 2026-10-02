import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        dark: "#1a1a1a",
        dark2: "#242424",
        bar: "#2b2b2b",
        red: { DEFAULT: "#ff0f10", text: "#ff5c5d" },
        stroke: "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tightest2: "-0.03em",
      },
      maxWidth: {
        container: "1800px",
      },
    },
  },
  plugins: [],
};
export default config;
