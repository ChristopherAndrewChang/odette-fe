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
      }
    }
  }
}

export default config
