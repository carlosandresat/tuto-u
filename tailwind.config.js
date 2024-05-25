/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        stripes: "linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 50%, hsl(var(--secondary)) 50%, hsl(var(--secondary)) 75%, transparent 75%, transparent)",
        dots: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
        'zigzag': "linear-gradient(135deg, #3b82f6 25%, transparent 25%) -50px 0/ calc(100px + 10px) calc(100px + 10px), linear-gradient(225deg, #3b82f6 25%, transparent 25%) -50px 0/ calc(100px + 10px) calc(100px + 10px), linear-gradient(315deg, #3b82f6 25%, transparent 25%) 0 0/ calc(100px + 10px) calc(100px + 10px), linear-gradient(45deg, #3b82f6 25%, transparent 25%) 0 0/ calc(100px + 10px) calc(100px + 10px)",
        'waves': "radial-gradient(circle, #3b82f6 20%, transparent 20%), radial-gradient(circle, #3b82f6 20%, transparent 20%) 10px 10px",
        'circles': "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
        'checkerboard': "linear-gradient(90deg, #3b82f6 50%, transparent 50%), linear-gradient(90deg, transparent 50%, #3b82f6 50%), linear-gradient(0deg, #3b82f6 50%, transparent 50%), linear-gradient(0deg, transparent 50%, #3b82f6 50%)",
        'chevron': "linear-gradient(45deg, hsl(var(--primary)) 20%, transparent 20%, transparent 40%, hsl(var(--primary)) 40%, hsl(var(--primary)) 60%, transparent 60%, transparent 80%, hsl(var(--primary)) 80%, hsl(var(--primary)), linear-gradient(135deg, hsl(var(--primary)) 25%, transparent 25%, transparent 50%, hsl(var(--primary)) 50%, hsl(var(--primary)) 75%, transparent 75%, transparent)",
        'hexagons': "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px), linear-gradient(30deg, #e5e7eb 1px, transparent 1px), linear-gradient(-30deg, #e5e7eb 1px, transparent 1px)",
        'grid': "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, hsl(var(--background)) 1px)",




        // Add more patterns here
      },
      backgroundSize: {
        'stripes': '18.28px 18.28px',
        'dots': '10px 10px',
        'circles': '10px 10px',
        'checkerboard': '2px 2px',
        'waves': '20px 20px',
        'grid': '8px 8px',

      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}