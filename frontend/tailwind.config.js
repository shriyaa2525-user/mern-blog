module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      colors: {
        plum: '#593D4A',
        chocolate: '#745155',
        olive: '#9E937A',
        tan: '#DBAA8C',
      }
    },
  },
  plugins: [],
}