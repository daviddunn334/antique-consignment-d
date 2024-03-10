/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          '50': '#f4f7f9',
          '100': '#eaf2f5',
          '200': '#d9e5ec',
          '300': '#c1d4e0',
          '400': '#a8bdd1',
          '500': '#91a8c3',
          'DEFAULT': '#91a8c3',
          '600': '#7289ad',
          '700': '#677a9b',
          '800': '#55647e',
          '900': '#495566',
          '950': '#2b313b',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

