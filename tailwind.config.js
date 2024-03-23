/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        darkseed: {
          primary: "hsl(97, 18%, 25%)",
          secondary: "hsl(41, 45%, 45%)",
          accent: "hsl(89, 36%, 50%)",
          neutral: "hsl(94, 29%, 7%)",
          "base-100": "hsl(53, 20%, 15%)",
          "base-200": "hsl(53, 20%, 12.5%)",
          "base-300": "hsl(53, 20%, 10%)",
        },
        seed: {
          primary: "hsl(97, 21%, 70%)",
          secondary: "hsl(41, 45%, 65%)",
          accent: "hsl(89, 32%, 33%)",
          neutral: "hsl(94, 29%, 17%)",
          "base-100": "hsl(53, 74%, 100%)",
          "base-200": "hsl(53, 74%, 97.5%)",
          "base-300": "hsl(53, 74%, 95%)",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "ui-sans-serif", "system-ui"],
        button: ["Lato", "ui-serif"],
        body: ["Open Sans", "ui-monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-3d"),
  ],
};
