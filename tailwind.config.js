/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#FCFBF8',
          surface: '#FFFFFF',
          elevated: '#F5F2EA',
          border: '#E8E3D9',
        },
        accent: {
          DEFAULT: '#D95D39',
          light: '#F27A59',
          dim: '#FCECE8',
          cyan: '#D4AF37',
          'cyan-dim': '#FBF6E9',
        },
        health: {
          green: '#22C55E',
          'green-dim': '#DCFCE7',
          yellow: '#EAB308',
          'yellow-dim': '#FEF08A',
          red: '#EF4444',
          'red-dim': '#FEE2E2',
        },
        text: {
          primary: '#2C2421',
          secondary: '#5C514D',
          muted: '#968C88',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 8px 24px rgba(44, 36, 33, 0.04)',
        glow: '0 0 24px rgba(217, 93, 57, 0.25)',
        'glow-green': '0 0 16px rgba(34,197,94,0.15)',
        'glow-cyan': '0 0 20px rgba(212, 175, 55, 0.2)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #D95D39 0%, #C2411C 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFFFFF 0%, #FCFBF8 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top, #FCECE8 0%, #FCFBF8 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
        'fade-up': 'fadeUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.92)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
