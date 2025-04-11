/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "*.{js,ts,jsx,tsx,mdx}"
],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1a5c8a",
          foreground: "#ffffff",
          light: "#2d98da",
          dark: "#154c72",
        },
        secondary: {
          DEFAULT: "#4a90e2",
          foreground: "#ffffff",
          light: "#5d9ee8",
          dark: "#3a7bc9",
        },
        accent: {
          DEFAULT: "#61dafb",
          foreground: "#ffffff",
          light: "#74dffc",
          dark: "#4ed4fa",
        },
        card: {
          DEFAULT: "rgba(26, 92, 138, 0.1)",
          foreground: "#ffffff",
          hover: "rgba(26, 92, 138, 0.2)",
        },
        text: {
          DEFAULT: "#ffffff",
          muted: "rgba(255, 255, 255, 0.7)",
          subtle: "rgba(255, 255, 255, 0.5)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "text-gradient": "linear-gradient(to right, #4a90e2, #63b3ed)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
