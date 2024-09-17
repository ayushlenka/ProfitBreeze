/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyblue: '#1a237e', 
        teal: '#009688', 
        offwhite: '#f5f5f5', 
        slategray: '#37474F',
        darkcharcoal: '#333333',
        cornflowerblue: '#6495ED',
        cooltan: '#CCCCCC',
        diffblue:'#3C6481',
        cyanblue: '#F0F8FF',
        primaryblue:'#001F3F',
        secondblue:'#A7C7E7'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        'custom': '1110px',
        'custom-small':'600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
