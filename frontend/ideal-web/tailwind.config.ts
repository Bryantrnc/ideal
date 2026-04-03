import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#020617",
        panel: "#081225",
        panelSoft: "#0d1830",
        stroke: "#1b2a4a",
        neon: "#5eead4",
        neonSoft: "#7dd3fc",
        accent: "#22d3ee",
        textMain: "#f8fafc",
        textSoft: "#94a3b8",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(94,234,212,0.12), 0 0 40px rgba(34,211,238,0.12)",
      },
      backgroundImage: {
        heroGlow:
          "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.18), transparent 35%), radial-gradient(circle at 80% 30%, rgba(94,234,212,0.12), transparent 30%), linear-gradient(135deg, #071224 0%, #081225 45%, #020617 100%)",
      },
      animation: {
        floatSlow: "floatSlow 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        spinSlow: "spinSlow 18s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;