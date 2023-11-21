/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        easy: "#FF9100",
        medium: "#FF7900",
        hard: "#FF6000",
        extrem: "#FF4800",
        dark: "#2A2A2A",
        light: "#EFEFEF"
      },
    },
  },
  plugins: [],
}

