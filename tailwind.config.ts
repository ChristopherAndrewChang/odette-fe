import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [
    require('tailwindcss-logical'),
    require('./src/@core/tailwind/plugin'),
    require('tailwind-scrollbar-hide')
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.1)' // Redup
          },
          '50%': {
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.6)' // Terang
          },
        }
      },
      animation: {
        'glow-shadow': 'glow 3s ease-in-out infinite',
      }
    }
  }
}

export default config
