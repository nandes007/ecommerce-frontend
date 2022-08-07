/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6',
        secondary: '#64748b',
        cloudy: '#e2e8f0',
        danger: '#db2777',
        semidark: '#64748b',
        dark: '#1e293b',
        warning: '#f59e0b',
        success: '#22c55e'
      },
      boxShadow: {
        '3xl': '0 -1px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
