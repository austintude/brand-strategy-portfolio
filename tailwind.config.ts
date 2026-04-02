import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        terracotta: {
          50: "#fdf5f0",
          100: "#fbe8dc",
          200: "#f6cdb8",
          300: "#f0ab8a",
          400: "#e8825a",
          500: "#C2410C",
          600: "#a8370a",
          700: "#8c2e09",
          800: "#712507",
          900: "#5a1e06",
        },
        charcoal: {
          50: "#f5f5f5",
          100: "#e5e5e5",
          200: "#cccccc",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#2d2d2d",
          800: "#1a1a1a",
          900: "#0f0f0f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
