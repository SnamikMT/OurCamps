/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-white': '#F9F7F7',
        'primary-black': '#111111',
        'primary-blue': '#0D70DF',
        'primary-red': '#E63637',
        'primary-gray': '#F4F5F7',
      },
      fontFamily: {
        'bounded': ['Bounded', 'sans-serif'],
        'mont': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 15px 50px rgba(0, 0, 0, 0.1)',
        'button': '0 10px 25px -5px rgba(13, 112, 223, 0.3)',
        'button-hover': '0 20px 30px -10px rgba(13, 112, 223, 0.4)',
      }
    },
  },
  plugins: [],
} 