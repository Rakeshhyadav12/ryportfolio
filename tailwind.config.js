/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: "#030014",
        lightBg: "#f8fafc",
        neonCyan: "#00f0ff",
        neonPurple: "#bd00ff",
        cardDark: "rgba(10, 5, 30, 0.6)",
        cardLight: "rgba(255, 255, 255, 0.7)",
        mutedText: "rgba(255, 255, 255, 0.6)",
        mutedTextLight: "rgba(15, 23, 42, 0.6)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        neonCyan: '0 0 15px rgba(0, 240, 255, 0.5)',
        neonPurple: '0 0 15px rgba(189, 0, 255, 0.5)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glassLight: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
