/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#7c4fe6', 
        'accent-blue': '#2563EB',
        'dark-navy': '#0F172A',
        'soft-white': '#F8FAFC',
      }
    },
  },
  plugins: [],
}