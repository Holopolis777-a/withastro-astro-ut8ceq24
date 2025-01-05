/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2ff',
          100: '#fae6ff',
          200: '#f5ccff',
          300: '#f099ff',
          400: '#e613d5', // Main brand color
          500: '#d610c0',
          600: '#c00eac',
          700: '#a00c8f',
          800: '#800a72',
          900: '#600855',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}