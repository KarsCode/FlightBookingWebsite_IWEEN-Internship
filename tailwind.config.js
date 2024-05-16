/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './src/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero': "url('/background.png')",
      }
    },
  },
  plugins: [],
}

