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
        "regular-fit-slogan": "url('/../images/RegularFitSlogan.png')",
        "regular-fit-color-black": "url('/../images/RegularFitColorBlack.png')",
        "regular-fit-black-slogan":
          "url('/../images/RegularFitBlackSlogan.png')",
        "regular-fit-pink": "url('/../images/RegularFitPink.png')",
        "regular-fit-polo": "url('/../images/RegularFitPolo.png')",
        "regular-fit-v-neck": "url('/../images/RegularFitVNeck.png')",
      },
      fontFamily: {
        inter: ["inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
