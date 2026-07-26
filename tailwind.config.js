/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          coral: '#FF6F61',
          lavender: '#6B5B95',
          rose: '#F7CAC9',
          olive: '#88B04B',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          text: '#ffffff',
          muted: '#a0a0a0',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          text: '#1a1a1a',
          muted: '#6c757d',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#374151',
        },
        ring: {
          DEFAULT: '#FF6F61',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial display scale — fluid, clamps between mobile and desktop
        'display-xl': [
          'clamp(2.75rem, 8vw, 6rem)',
          { lineHeight: '0.95', letterSpacing: '-0.03em' },
        ],
        'display-lg': [
          'clamp(2.25rem, 5.5vw, 4rem)',
          { lineHeight: '1.0', letterSpacing: '-0.025em' },
        ],
        'display-md': [
          'clamp(1.75rem, 3.5vw, 2.75rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em' },
        ],
        eyebrow: [
          '0.75rem',
          { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' },
        ],
      },
      borderRadius: {
        bento: '1.25rem',
        'bento-lg': '1.75rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  // Optimize for production
  future: {
    hoverOnlyWhenSupported: true,
  },
};
