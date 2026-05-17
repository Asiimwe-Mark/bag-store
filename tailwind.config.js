module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { serif: ['Playfair Display', 'serif'], sans: ['Inter', 'sans-serif'] },
      colors: {
        beige: { 50: '#FDF8F3', 100: '#F5EDE3', 200: '#EBD9C4' },
        champagne: { 100: '#F5EDE0', 200: '#E8D5B0', 300: '#D4AF37' },
        gold: { 50: '#FFF9E6', 100: '#FFF0C2', 200: '#F5E6C8', 300: '#D4AF37', 400: '#C49B2E', 500: '#B8860B' },
        rose: { 100: '#FBE4E8', 200: '#F5C6CC', 400: '#B76E79' },
        matte: { 900: '#1A1A1A', 800: '#2D2D2D', 700: '#3D3D3D' },
        brand: { red: '#D42030' }
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.12)',
        'premium': '0 8px 40px rgba(212,175,55,0.15)',
        'glow': '0 0 40px rgba(212,175,55,0.2)',
        'button': '0 4px 20px rgba(212,32,48,0.25)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shrink: {
          from: { width: '100%' },
          to: { width: '0%' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.4s ease forwards',
        shrink: 'shrink 3s linear forwards',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
    }
  },
  plugins: []
}