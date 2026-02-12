import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maroon: {
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#f9cece',
          300: '#f3a8a8',
          400: '#e97272',
          500: '#d94545',
          600: '#b52828',
          700: '#8b2020',
          800: '#6b1e1e',
          900: '#5c1e1e',
          950: '#320c0c',
        },
        gold: {
          50: '#fdfaf0',
          100: '#fbf2d4',
          200: '#f6e3a8',
          300: '#f0cd6e',
          400: '#e8b43b',
          500: '#d4961d',
          600: '#b87415',
          700: '#965514',
          800: '#7c4418',
          900: '#683919',
          950: '#3c1c09',
        },
        ivory: {
          50: '#faf8f5',
          100: '#f5f0ea',
          200: '#ede5da',
        },
      },
      fontFamily: {
        serif: ['var(--font-source-serif)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
