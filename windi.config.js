import { defineConfig } from "windicss/helpers";

export default defineConfig({
  mode: "jit",
  extract: {
    include: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    exclude: ["node_modules/**/*", ".git/**/*"],
  },
  darkMode: "class", // or 'media' or 'false'
  transformCSS: "pre",
  theme: {
    extend: {},
    screens: {
      xsm: "420px",
      // => @media (min-width: 420px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("windicss/plugin/aspect-ratio"),
    require("windicss/plugin/forms"),
    require("windicss/plugin/line-clamp"),
  ],
});
