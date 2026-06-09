/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#030712',
          lighter: '#0F172A',
          card: '#111827',
        },
        accent: {
          cyan: '#06B6D4',
          blue: '#3B82F6',
          purple: '#8B5CF6',
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(to right, #06B6D4, #3B82F6, #8B5CF6)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
