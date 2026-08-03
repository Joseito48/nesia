console.log('🌈 ¡TAILWIND HA LEÍDO EL ARCHIVO DE NESIA!');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'nesia-dark': '#050505',
        'nesia-light': '#f7f7f3',
        'nesia-card': '#ffffff',
        'nesia-muted': '#6f6f6f',
        'nesia-surface': '#efefeb',
        'nesia-border': '#d9d9d2',
        'nesia-blue': '#4f6df5',
        'nesia-blue-hover': '#3753c7',
      },
      boxShadow: {
        nesia: '0 26px 70px -32px rgba(5, 5, 5, 0.35)',
        'nesia-soft': '0 12px 32px -18px rgba(5, 5, 5, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};