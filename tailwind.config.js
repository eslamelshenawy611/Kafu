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
        
        // New Primary Colors for smooth transitions
        primary: {
          orange: '#FF883E',
          'orange-hover': '#FF7A28',
        },
        
        // Section Background Colors
        section: {
          'bg-1': '#4A505A',
          'bg-2': '#030303',
        },
        
        // Accent Gradient (Updated to match new theme)
        'accent-start': '#FF883E',
        'accent-end': '#FF7A28',
        
        // Neutral Colors
        'gray-text': '#A7B1BC',
        'gray-light': '#E4E8EC',
        'gray-border': 'rgba(255, 255, 255, 0.3)',
        
        // Additional colors for smooth transitions
        transition: {
          'dark-1': '#4A505A',
          'dark-2': '#3A404A',
          'dark-3': '#2A303A',
          'dark-4': '#1A202A',
          'dark-5': '#0A101A',
        }
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
        // Additional spacing for sections
        '34': '136px',
        '36': '144px',
        '40': '160px',
      },
      borderRadius: {
        'button': '16px',
        'card': '16px',
        'icon': '12px',
        // Additional border radius
        'planet': '50%',
        'smooth': '24px',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'button': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'focus': '0 0 0 2px #FF883E',
        
        // Enhanced shadows for new design
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow': '0 0 20px rgba(255, 136, 62, 0.3)',
        'glow-lg': '0 0 30px rgba(255, 136, 62, 0.6)',
        'planet': '0 20px 40px rgba(0, 0, 0, 0.3)',
        'planet-hover': '0 30px 60px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #FF883E 0%, #FF7A28 100%)',
        'overlay-gradient': 'linear-gradient(180deg, rgba(6,17,31,0.65) 0%, rgba(6,17,31,0.85) 60%)',
        
        // New gradients for seamless transitions
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        'services-gradient': 'linear-gradient(180deg, #4A505A 0%, #030303 100%)',
        
        // Smooth transition gradients
        'section-transition-1': `linear-gradient(to bottom, 
          rgba(0,0,0,0.1) 0%, 
          rgba(10,10,15,0.3) 30%, 
          rgba(30,35,40,0.5) 60%, 
          rgba(60,65,70,0.85) 90%, 
          #4A505A 100%
        )`,
        'section-transition-2': `linear-gradient(to bottom, 
          #4A505A 0%, 
          rgba(74,80,90,0.9) 10%,
          rgba(74,80,90,0.4) 50%,
          rgba(74,80,90,0.9) 90%,
          #4A505A 100%
        )`,
        'section-transition-3': `linear-gradient(to bottom, 
          transparent 0%, 
          rgba(3,3,3,0.3) 50%,
          rgba(3,3,3,0.85) 90%,
          #030303 100%
        )`,
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 6s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}