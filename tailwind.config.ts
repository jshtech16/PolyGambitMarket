import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'background-2nd': 'var(--background-2nd)!important',
        'background-button': 'var(--background-button)!important',
        'background-button-2nd': 'var(--background-button-2nd)!important',
        R0: '#FF0000',
        G0: '#BFF816',
        G1: '#008800',
        G2: '#1D8800',
        G3: 'rgba(54,178,8,0.2)',
        success: '#36B208',
        red: '#FF0000',
        purple: '#6C3DB8'
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3200px',
        '6xl': '3840px',
        '7xl': '4480px',
        '8xl': '5120px'
      },
      keyframes: {
        'mobile-nav-menu-show-anim': {
          '0%': { left: '-100%' },
          '100%': { left: '0px' },
        },
        'mobile-nav-menu-hide-anim': {
          '0%': { left: '0px' },
          '100%': { left: '-100%' },
        }
      },
      animation: {
        'mobile-nav-show': 'mobile-nav-menu-show-anim 0.1s ease-out forwards',
        'mobile-nav-hide': 'mobile-nav-menu-hide-anim 0.1s ease-out forwards'
      },
      backgroundImage: {
        'bg-gradient': 'linear-gradient(107.7deg, rgba(0,0,0,0.5) 37.9%, rgba(96,4,213,0.1) 113.22%), linear-gradient(248.12deg, rgba(24,20,32,0) 35.67%, #292929 101.76%)',
        'gradient-border': 'linear-gradient(360deg, #A763FF -50.92%, rgba(0, 0, 0, 0) 77.54%)',
        'avatar-gradient': 'linear-gradient(135deg, #7D69F6 0%, #FF0000 60%, #FFFF00 100%)'
      }
    },
  },
  plugins: [],
};
export default config;
