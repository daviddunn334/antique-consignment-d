/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        eden: {
          "primary": "hsl(211, 25%, 51%)",
          "secondary": "hsl(31, 25%, 51%)",
          "accent": "hsl(203, 93%, 51%)",
          "neutral": "hsl(211, 25%, 30%)",
          "base-100": "hsl(211, 25%, 100%)",
          "base-200": "hsl(211, 25%, 98%)",
          "base-300": "hsl(211, 25%, 96%)",
        },
      },
      "dark",
      "light",
    ],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui"),
  ],
}

