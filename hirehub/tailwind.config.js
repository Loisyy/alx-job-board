/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#5b5fff',
          600: '#4845ff',
          700: '#3632d8',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
