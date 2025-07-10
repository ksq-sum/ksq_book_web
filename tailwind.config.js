/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--accent)',
        background: 'var(--background)',
        text: 'var(--text)',
        secondary: 'var(--secondary)'
      },
      fontFamily: {
        serif: ['English Font', 'SimHei', '黑体', 'Microsoft YaHei', '微软雅黑', 'sans-serif'],
        sans: ['English Font', 'SimHei', '黑体', 'Microsoft YaHei', '微软雅黑', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        aurora: 'var(--animate-aurora)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: []
} 