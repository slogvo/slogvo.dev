import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-notion-blocks/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        rating: 'rgb(var(--rating))',
        primary: {
          50: '#fdf2f7',
          100: '#fce7f1',
          200: '#fad0e4',
          300: '#f8a9cc',
          400: '#f274a9',
          500: '#ec5e95',
          600: '#d82a64',
          700: '#bc1a4c',
          800: '#9b193f',
          900: '#811a38',
          950: '#4f081c',
          DEFAULT: '#ec5e95',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  safelist: ['text-[#ff3946]'],
} satisfies Config;
