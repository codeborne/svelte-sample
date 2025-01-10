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
        success: {
          ...colors.emerald,
          DEFAULT: colors.emerald[500],
        },
        warning: {
          ...colors.amber,
          DEFAULT: colors.amber[500],
        },
        danger: {
          ...colors.red,
          DEFAULT: colors.red[500],
        },
        primary: {
          ...colors.blue,
          DEFAULT: colors.blue[500],
        },
        secondary: {
          ...colors.gray,
          DEFAULT: colors.gray[500],
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
