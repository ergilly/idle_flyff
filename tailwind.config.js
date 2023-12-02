/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  important: true,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        128: '32rem',
        160: '40rem',
        192: '48rem',
        224: '56rem',
        256: '64rem',
      },
      width: {
        128: '32rem',
        160: '40rem',
        192: '48rem',
        224: '56rem',
        256: '64rem',
      },
      spacing: {
        128: '32rem',
        160: '40rem',
        192: '48rem',
        224: '56rem',
        256: '64rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: { ...colors.sky, DEFAULT: colors.sky[600] },
      },
    },
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
  },
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [require('@tailwindcss/forms')],
}
