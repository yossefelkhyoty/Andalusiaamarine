/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "brand-orange": "#e67300",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
