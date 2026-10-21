/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        arabic: ['var(--font-arabic-body)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        'arabic-display': ['var(--font-arabic-display)', 'var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // AL MASSAR brand tokens. Light mode = ivory surfaces / navy ink.
        // Dark mode = navy surfaces / ivory ink. The brand pairing doubles
        // as the light/dark theme, so both modes read as premium, not as
        // a generic toggle.
        paper: '#F5F1E8', // Warm Ivory — light-mode surface / dark-mode text
        ink: '#071C2C', // Deep Navy — text on light / dark-mode surface
        'ink-raised': '#0D2638', // dark-mode raised surfaces (cards, inputs)
        charcoal: '#172126',
        teal: {
          DEFAULT: '#0E6B70',
          strong: '#0A4F53',
        },
        accent: {
          DEFAULT: '#D6B77C', // Champagne Gold — restrained accent only
          strong: '#C2A066',
        },
        live: '#0E6B70',
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
