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
        NSky: "#B9E5FF",
        NSkyLight: "#DCF8FF",
        NPurple: "#E2D9FF",
        NPurpleLight: "#F0EBFF",
        NOrange: "#FFCAAB",
        NYellow: "#FFE5AE",
        NYellowLight: "#FEEFD0",
        NGreen: "#D9FFD9",
      },
    },
  },
  plugins: [],
};
export default config;
