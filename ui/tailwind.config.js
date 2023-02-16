const defaultTheme = require('tailwindcss/defaultTheme')
const production = process.env.NODE_ENV === 'production'
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.svelte"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
        serif: 'serif'
      },
      borderRadius: {
        large: '3rem',
      },
      colors: {
        'success': colors.emerald,
        'warning': colors.amber,
        'danger': colors.red,
        'primary': colors.blue,
        'brand': colors.amber
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
