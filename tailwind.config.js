/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Arabic Fonts
        'cairo': ['Cairo', 'sans-serif'],
        'ibm-arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
        // Latin Fonts
        'sora': ['Sora', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
         'roboto': ['Roboto', 'sans-serif'],
      },
      colors: { 

       
        // Primary Colors
        'navy': '#0A1F2E',
        'navy-dark': '#061121',
        // Accent Gradient
        'accent-start': '#FF7A00',
        'accent-end': '#FF3D7F',
        // Neutral Colors
        'gray-text': '#A7B1BC',
        'gray-light': '#E4E8EC',
        'gray-border': 'rgba(255, 255, 255, 0.3)',
      },
      fontSize: {
        // Heading Sizes
        'h1': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1-lg': ['72px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.1', fontWeight: '600' }],
        'h2-lg': ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        // Body Sizes
        'body': ['16px', { lineHeight: '1.5' }],
        'body-lg': ['18px', { lineHeight: '1.5' }],
        // Component Sizes
        'button': ['14px', { lineHeight: '1.2', fontWeight: '500' }],
        'button-lg': ['16px', { lineHeight: '1.2', fontWeight: '500' }],
      },
      spacing: {
        // 8px Grid System
        '2.5': '10px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
        '32': '128px',
      },
      borderRadius: {
        'button': '16px',
        'card': '16px',
        'icon': '12px',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'button': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'focus': '0 0 0 2px #FF7A00',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #FF7A00 0%, #FF3D7F 100%)',
        'overlay-gradient': 'linear-gradient(180deg, rgba(6,17,31,0.65) 0%, rgba(6,17,31,0.85) 60%)',
      },
    },
  },
  plugins: [],
}