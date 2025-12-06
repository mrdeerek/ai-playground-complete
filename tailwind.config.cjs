/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          soft: '#DBEAFE',
          dark: '#1D4ED8',
        },
      },
      boxShadow: {
        soft: '0 10px 25px rgba(15,23,42,0.12)',
      },
    },
  },
  plugins: [],
}
