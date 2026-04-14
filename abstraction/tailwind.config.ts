import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Iowan Old Style', 'Charter', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          50: '#F8F8F7',
          100: '#F1F1EF',
          200: '#E4E4E1',
          300: '#CFCFCA',
          400: '#9A9A94',
          500: '#6B6B66',
          600: '#4A4A46',
          700: '#2F2F2C',
          800: '#1C1C1A',
          900: '#0F0F0E',
        },
        accent: {
          DEFAULT: '#5B5BD6',
          soft: '#EEEEFD',
        },
        ok: '#178A55',
        warn: '#B26B00',
        err: '#C0392B',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,15,14,0.04), 0 1px 3px rgba(15,15,14,0.06)',
        pop: '0 4px 24px rgba(15,15,14,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
