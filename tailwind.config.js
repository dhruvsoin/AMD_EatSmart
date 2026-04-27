/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0F0F14',
          surface: '#1A1A24',
          elevated: '#22222F',
          border: '#2A2A3A',
        },
        accent: {
          DEFAULT: '#7C3AED',
          light: '#9B59F5',
          dim: '#3D1A78',
          cyan: '#06B6D4',
          'cyan-dim': '#0A4F5E',
        },
        health: {
          green: '#22C55E',
          'green-dim': '#14532D',
          yellow: '#EAB308',
          'yellow-dim': '#713F12',
          red: '#EF4444',
          'red-dim': '#7F1D1D',
        },
        text: {
          primary: '#F1F1F8',
          secondary: '#A0A0B8',
          muted: '#5A5A72',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
        glow: '0 0 20px rgba(124,58,237,0.35)',
        'glow-green': '0 0 16px rgba(34,197,94,0.3)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.3)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
        'gradient-card': 'linear-gradient(145deg, #1A1A24 0%, #22222F 100%)',
        'gradient-hero': 'radial-gradient(ellipse at top, #3D1A78 0%, #0F0F14 60%)',
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
