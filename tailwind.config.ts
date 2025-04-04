
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#3B82F6",     // Soft Blue
          foreground: "#FFFFFF",
          light: "#93C5FD",       // Light Blue
          dark: "#1E40AF"         // Dark Blue
        },
        secondary: {
          DEFAULT: "#000000",     // Black
          foreground: "#FFFFFF",
          light: "#4B5563",       // Dark Gray
          dark: "#111827"         // Very Dark Gray
        },
        accent: {
          DEFAULT: "#10B981",     // Soft Green
          foreground: "#FFFFFF"
        },
        destructive: {
          DEFAULT: "#EF4444",     // Soft Red
          foreground: "#FFFFFF"
        },
        muted: {
          DEFAULT: "#F3F4F6",     // Very Light Gray
          foreground: "#6B7280"   // Gray
        },
        background: {
          DEFAULT: "#FFFFFF",     // White
          dark: "#0F172A"         // Very Dark Blue-Gray
        },
        foreground: {
          DEFAULT: "#000000",     // Black
          dark: "#FFFFFF"         // White
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
            color: '#000000',
            a: {
              color: '#3B82F6',
              textDecoration: 'none',
              '&:hover': {
                color: '#1E40AF'
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
