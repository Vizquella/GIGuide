import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0c0f17",
        foreground: "#f1f5f9",
        genshin: {
          dark: "#0b0e14",
          card: "#131822",
          cardHover: "#1a2232",
          border: "#242e42",
          pyro: "#FF5640",
          hydro: "#20B2F2",
          anemo: "#4AD4AE",
          electro: "#B266FF",
          dendro: "#80CC33",
          cryo: "#80E6EB",
          geo: "#DE9F35",
          star5: "#FFB03A",
          star4: "#AF78FF",
        },
      },
      boxShadow: {
        "glow-pyro": "0 0 20px rgba(255, 86, 64, 0.35)",
        "glow-hydro": "0 0 20px rgba(32, 178, 242, 0.35)",
        "glow-anemo": "0 0 20px rgba(74, 212, 174, 0.35)",
        "glow-electro": "0 0 20px rgba(178, 102, 255, 0.35)",
        "glow-dendro": "0 0 20px rgba(128, 204, 51, 0.35)",
        "glow-cryo": "0 0 20px rgba(128, 230, 235, 0.35)",
        "glow-geo": "0 0 20px rgba(222, 159, 53, 0.35)",
        "glow-gold": "0 0 20px rgba(255, 176, 58, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
