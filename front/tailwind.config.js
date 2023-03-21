/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'xs': '475px' ,
      'sm': '650px',
      'md': '950px',
      'lg': '1150px',
      'xl': '1250px'
    },
    colors: {
      'white':'#FFFFFF',
      'black': '#000000',
      'saffron':'#EAC435',
      'mnblue': '#345995',
      'rtaz': '#E40066',
      'mint':'#03ECA4',
      'mint-light':'#92FCE0',
      'tomato':'#FB4D3D'
    },
  
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
