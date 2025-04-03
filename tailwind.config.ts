
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif'],
      },
      colors: {
        // Enhanced contrast color palette
        primary: {
          DEFAULT: "#6E59A5",     // Vivid Purple
          foreground: "#FFFFFF",
          light: "#D6BCFA",       // Light Purple
          dark: "#1A1F2C"         // Dark Purple
        },
        secondary: {
          DEFAULT: "#0EA5E9",     // Ocean Blue
          foreground: "#FFFFFF",
          light: "#1EAEDB",       // Bright Blue
          dark: "#0A74A3"         // Darker Blue
        },
        background: {
          DEFAULT: "#F4F4F6",     // Light Gray
          dark: "#221F26"         // Dark Charcoal
        },
        foreground: {
          DEFAULT: "#000000e6",   // Black with opacity
          dark: "#FFFFFF"         // White
        },
        accent: {
          DEFAULT: "#F97316",     // Bright Orange
          foreground: "#FFFFFF"
        },
        destructive: {
          DEFAULT: "#ea384c",     // Red
          foreground: "#FFFFFF"
        }
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'lg': '0.75rem',   // 12px
        'xl': '1rem',       // 16px
        '2xl': '1.5rem'     // 24px
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1A1F2C',
            a: {
              color: '#6E59A5',
              textDecoration: 'none',
              '&:hover': {
                color: '#9b87f5'
              }
            }
          }
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography')
  ],
} satisfies Config;
