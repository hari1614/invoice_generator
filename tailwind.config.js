/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        suse: ["Reddit Sans Condensed", "sans-serif"]
      },

      colors: {
        purpleCol: "#615ae6",
        purpleBg: "#d5d4e9",
        sea: '#2fa4e7',
        'hover1': '#1e7bb8',
        'hover2':'#4b5563',
      },
    },
  },
  plugins: [],
}

