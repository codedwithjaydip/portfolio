/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#050505',
          raised: '#0D0D0F',
          sunken: '#08080A',
          line: 'rgba(255,255,255,0.08)',
        },
        violet: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        electric: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        raised: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 18px 40px -24px rgba(0,0,0,0.9)',
        glow: '0 0 0 1px rgba(139,92,246,0.25), 0 12px 48px -12px rgba(139,92,246,0.35)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
        sweep: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        sweep: 'sweep 8s linear infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
