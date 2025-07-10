/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'action': '#9D615C',
        'onboarding': '#A1B55C',
        'meeting': '#C7A865',
        'outdated': '#808FA3',
      },
    },
  },
  plugins: [],
} 