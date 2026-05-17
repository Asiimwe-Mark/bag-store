module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { serif: ['Playfair Display', 'serif'], sans: ['Inter', 'sans-serif'] },
      colors: {
        beige: { 50: '#FDF8F3', 100: '#F5EDE3', 200: '#EBD9C4' },
        champagne: { 100: '#F5EDE0', 200: '#E8D5B0', 300: '#D4AF37' },
        rose: { 100: '#FBE4E8', 200: '#F5C6CC', 400: '#B76E79' },
        matte: { 900: '#1A1A1A', 800: '#2D2D2D', 700: '#3D3D3D' },
        brand: { red: '#D42030' }
      }
    }
  },
  plugins: []
}