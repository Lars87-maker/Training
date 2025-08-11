/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter','ui-sans-serif','system-ui','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol']
    },
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        bg: 'hsl(220 18% 97%)',
        surface: 'hsl(0 0% 100%)',
        surfaceDark: 'hsl(222 47% 11%)',
        text: 'hsl(222 47% 11%)',
        textMuted: 'hsl(215 16% 47%)',
        primary: { DEFAULT: 'hsl(221 83% 53%)', 600: 'hsl(221 83% 48%)', 700: 'hsl(221 83% 44%)' },
        ring: 'hsl(221 83% 53%)'
      },
      boxShadow: {
        soft: '0 1px 3px rgba(16,24,40,.10), 0 1px 2px rgba(16,24,40,.06)',
        lift: '0 8px 20px rgba(16,24,40,.12)'
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' }
    }
  },
  plugins: []
}
