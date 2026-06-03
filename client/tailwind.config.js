export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pulse: { 50: '#eef7ff', 500: '#1f8cff', 700: '#075fc2', 950: '#082041' },
        rescue: '#ff4d4f',
      },
      boxShadow: { glow: '0 0 35px rgba(31, 140, 255, 0.25)' },
    },
  },
  plugins: [],
};
