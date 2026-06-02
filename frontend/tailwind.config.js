/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#090d16",
        darkcard: "#111827",
        darkborder: "#1f2937",
        neonteal: "#06b6d4",
        neonviolet: "#8b5cf6",
        neonpink: "#ec4899",
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon': '0 0 15px rgba(6, 182, 212, 0.4)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
