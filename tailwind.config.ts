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
    extend: {},
    fontFamily: {
      manrope: ['var(--manrope-sanl)'],
    },
    screens: {
      xs: '0px',
      sm: '768px',
      md: '1024px',
      lg: '1200px',
      xl: '1920px',
    },
    colors: {
      black: '#000000',
      white: '#ffffff',
      secondary: '#949494',
      'secondary-60': 'rgba(#949494, 0.6)',
    },
  },
  plugins: [],
};
export default config;
