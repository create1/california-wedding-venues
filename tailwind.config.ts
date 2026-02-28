import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f6f4",
          100: "#e4e9e3",
          200: "#cad4c8",
          300: "#a5b5a2",
          400: "#7d9279",
          500: "#5f755b",
          600: "#4b5e48",
          700: "#3e4d3b",
          800: "#343f32",
          900: "#2d352c",
        },
        blush: {
          50: "#fdf4f3",
          100: "#fce8e6",
          200: "#f9d5d1",
          300: "#f4b5ae",
          400: "#ec8a7f",
          500: "#e06657",
          600: "#cc4a3b",
          700: "#ac3c2f",
          800: "#8f352b",
          900: "#78322a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
