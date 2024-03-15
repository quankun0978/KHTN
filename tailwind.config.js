/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cs_blue: '#316AFF',
        cs_lightGray: '#F1F5F9',
        cs_gray: '#334155',
        cs_textGray: '#64748B',
        cs_tabGray: '#94A3B8',
        cs_red: '#FF5635',
        cs_border: '#B9B9B9',
      },
    },
  },
  plugins: [],
};
