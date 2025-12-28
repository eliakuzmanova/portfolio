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
        forest: {
          50: "#f0f7f0",
          100: "#d9ead9",
          200: "#b3d5b3",
          300: "#9dd09d",
          400: "#7ab87a",
          500: "#5a9f5a",
          600: "#4a7c4a",
          700: "#3d5f3d",
          800: "#2d4a2d",
          900: "#1e331e",
          950: "#0f1a0f",
        },
        moss: {
          50: "#f4f6f0",
          100: "#e8ebd9",
          200: "#d1d7b3",
          300: "#bac38d",
          400: "#a3af67",
          500: "#6b8e23",
          600: "#556b2f",
          700: "#3f4f23",
          800: "#293317",
          900: "#14170b",
        },
        sage: {
          50: "#f5f7f5",
          100: "#e8ede8",
          200: "#d1dbd1",
          300: "#bac9ba",
          400: "#a3b7a3",
          500: "#87a087",
          600: "#6b806b",
          700: "#4f604f",
          800: "#334033",
          900: "#172017",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

