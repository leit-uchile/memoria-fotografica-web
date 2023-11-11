/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainmf: {
          50: "#111827",
          100: "#2b1f2d",
          200: "#462734",
          300: "#602e3a",
          400: "#7b3540",
          500: "#953d47",
          600: "#b0444d",
          700: "#ca4b53",
          800: "#e5535a",
          900: "#ff5a60",
        },
      },
    },
    transitionProperty: {
      "max-height": "max-height",
      width: "width",
    },
    
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },

  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
