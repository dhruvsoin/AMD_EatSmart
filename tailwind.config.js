/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#F9FAFB',
          surface: '#FFFFFF',
          elevated: '#F3F4F6',
          border: '#E5E7EB',
        },
        accent: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dim: '#D1FAE5',
          cyan: '#F59E0B',
          'cyan-dim': '#FEF3C7',
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
          primary: '#111827',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.04)',
        glow: '0 0 20px rgba(16,185,129,0.2)',
        'glow-green': '0 0 16px rgba(34,197,94,0.15)',
        'glow-cyan': '0 0 20px rgba(245,158,11,0.15)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top, #D1FAE5 0%, #F9FAFB 60%)',
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
