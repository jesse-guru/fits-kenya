/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fits: {
          black: "#F8FAFC",  // Off-white light background
          dark: "#FFFFFF",   // Crisp white container
          card: "#FFFFFF",   // Card surface
          hover: "#F1F5F9",  // Subtle light hover
          border: "#E2E8F0", // Slate light border
          accent: "#C5A059", // Rich Fits Kenya Gold
          accentHover: "#966C05",
          accentLight: "#FEF9C3",
          red: "#E11D48",
          gray: "#64748B"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      }
    },
  },
  plugins: [],
}
