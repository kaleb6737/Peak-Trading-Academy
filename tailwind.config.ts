// tailwind.config.js

const colors = require('./src/config/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundBlack: colors.backgroundBlack,
        accentWarmYellow: colors.accentWarmYellow,
        softWhite: colors.softWhite,
        lightGray: colors.lightGray,
      },
    },
  },
  plugins: [],
};
