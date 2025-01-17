import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        Npink : "#FFC7EE",
        NSky: "#B9D2FF",
        NSkyLight: "#D3F6FF",
        NPurple: "#E2D9FF",
        NPurpleLight: "#EEE9FF",
        NOrange: "#FFCAAB",
        NYellow: "#FFE5AE",
        NGreen: "#D9FFD9",
      },
    },
  },
  plugins: [],
};
export default config;
