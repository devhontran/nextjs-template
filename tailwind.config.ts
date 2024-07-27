import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/interactive/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
      },
      gridTemplateColumns: {
        '3': 'repeat(3, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
    screens: {
      xs: '0px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1600px',
      xxl: '1920px',
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      darkgrey: '#121212',
      darkgrey2: '#2e2e2e',
      red: '#FF6542',
      gray: '#999896',
      silver: 'rgba(18, 18, 18, 0.2)',
      cornflower: '#4F4A3B',
    },
  },
  plugins: [],
};
export default config;
