/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0f9f9',
          100: '#daf2f2',
          200: '#afe6e6',
          300: '#7cd4d4',
          400: '#4bc2c2',
          500: '#2aa9a9',
          600: '#1d8c8c',
          700: '#166f6f',
          800: '#115757',
          900: '#0c4040',
        },
        // Menambahkan warna sesuai permintaan
        custom: {
          white: '#ffffff',
          gray: '#c8c8c8',
          teal: '#61adad',
        },
      },
    },
  },
  plugins: [],
};
