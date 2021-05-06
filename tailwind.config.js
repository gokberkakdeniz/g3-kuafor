module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ["Merriweather", "serif"],
        heading: ["Merriweather", "serif"],
        sans: ["Merriweather Sans", "sans-serif"]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
