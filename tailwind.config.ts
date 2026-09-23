import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0a2444",
          900: "#0f3060",
          800: "#153e79",
          700: "#1c4c92",
          600: "#28619f",
        },
        gold: {
          500: "#e8912a",
          400: "#f0a53f",
          300: "#f6bd6c",
          100: "#fdecd4",
        },
        paper: "#f7f8fa",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
