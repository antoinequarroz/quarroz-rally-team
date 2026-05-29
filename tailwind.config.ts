import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,ts,tsx}',
    './components/**/*.{vue,ts,tsx}',
    './pages/**/*.{vue,ts,tsx}',
    './layouts/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        rally: {
          ink: '#0b0d10',
          asphalt: '#15181d',
          graphite: '#242932',
          red: '#e11d2e',
          yellow: '#f4c430',
          ice: '#eef4f8',
          mist: '#f6f7f9',
        },
      },
      boxShadow: {
        panel: '0 18px 55px rgba(9, 12, 18, 0.14)',
        'panel-dark': '0 22px 70px rgba(0, 0, 0, 0.34)',
      },
    },
  },
  plugins: [],
} satisfies Config
