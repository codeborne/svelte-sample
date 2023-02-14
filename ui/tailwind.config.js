const defaultTheme = require('tailwindcss/defaultTheme')
const production = process.env.NODE_ENV === 'production'
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.svelte"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
        serif: 'serif'
      },
      borderRadius: {
        large: '3rem',
      },
      colors: {
        primary: colors.emerald,
        secondary: colors.orange,
        success: {
          "50": "#E0FFE0",
          "100": "#C2FFC2",
          "200": "#85FF85",
          "300": "#47FF47",
          "400": "#0AFF0A",
          "500": "#00CD00",
          "600": "#00A300",
          "700": "#007A00",
          "800": "#005200",
          "900": "#002900"
        },
        warning: colors.amber,
        danger: colors.red
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
