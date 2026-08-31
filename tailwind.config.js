/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          50: '#f0f7f1',
          100: '#dcebe0',
          200: '#bbd7c3',
          300: '#8fb89d',
          400: '#5d9270',
          500: '#3e7651',
          600: '#2e5d40',
          700: '#264b34',
          800: '#1f3d2c',
          900: '#1a3225',
        },
        cream: {
          50: '#fefcf9',
          100: '#fdf8f0',
          200: '#f9efe0',
          300: '#f3e2c9',
        },
        accent: {
          500: '#c8a96a',
          600: '#b8945a',
        },
      },
    },
  },
  plugins: [],
};
