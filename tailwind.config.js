module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'hero-pattern': "url('/images/hero.jpg')",
      }),
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
