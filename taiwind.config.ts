import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        canvas: '#FAFAFA',
        neutral: {
          100: '#F2F2F0',
          200: '#E6E6E3',
          300: '#D3D3CF',
          400: '#A9A9A4',
          500: '#7C7C77',
          600: '#585853',
          700: '#3A3A36',
          800: '#242422',
          900: '#151513',
          950: '#0B0B0A',
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '2px',
        md: '4px',
        lg: '4px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        auth: '380px',
      },
    },
  },
  plugins: [],
} satisfies Config
