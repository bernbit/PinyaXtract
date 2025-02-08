/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // main: "#4c6e71",
        main: "#EEF7FF",
        // main: "#FFF",
        primary: "#30F353",
        secondary: "#2B2B2B",
        background: "#1F4A4E",
        "background-alt": "#355C60",
        "light-text": "#FFFFFF",
        "dark-text": "#2B2B2B",
        danger: "#FF0000",
        notification: "#c1fbcb",
        // notification: "#acfaba",
      },
      fontFamily: {
        satoshi: ["Satoshi", ""],
        "satoshi-italic": ["Satoshi-Italic", "sans-serif"],

        "cabinetGrotesk-black": ["CabinetGrotesk-Black", "sans-serif"],
        "cabinetGrotesk-bold": ["CabinetGrotesk-Bold", "sans-serif"],
        "cabinetGrotesk-extrabold": ["CabinetGrotesk-Extrabold", "sans-serif"],
        "cabinetGrotesk-extralight": [
          "CabinetGrotesk-Extralight",
          "sans-serif",
        ],
        "cabinetGrotesk-light": ["CabinetGrotesk-Light", "sans-serif"],
        "cabinetGrotesk-medium": ["CabinetGrotesk-Medium", "sans-serif"],
        "cabinetGrotesk-regular": ["CabinetGrotesk-Regular", "sans-serif"],
        "cabinetGrotesk-thin": ["CabinetGrotesk-Thin", "sans-serif"],

        "satoshi-black": ["Satoshi-Black", "sans-serif"],
        "satoshi-blackItalic": ["Satoshi-BlackItalic", "sans-serif"],
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
        "satoshi-boldItalic": ["Satoshi-BoldItalic", "sans-serif"],
        "satoshi-italic": ["Satoshi-Italic", "sans-serif"],
        "satoshi-light": ["Satoshi-Light", "sans-serif"],
        "satoshi-lightItalic": ["Satoshi-LightItalic", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
        "satoshi-mediumItalic": ["Satoshi-MediumItalic", "sans-serif"],
        "satoshi-regular": ["Satoshi-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
