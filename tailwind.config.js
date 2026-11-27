/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#070B18",
          900: "#0B1124",
          800: "#111A36",
        },
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
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass: "0 20px 60px -15px rgba(2, 6, 23, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)",
        glow: "0 0 40px -10px rgba(99, 102, 241, 0.45)",
        "glow-lg": "0 0 80px -15px rgba(139, 92, 246, 0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99, 102, 241, 0.22), transparent), radial-gradient(ellipse 60% 45% at 85% 20%, rgba(139, 92, 246, 0.16), transparent), radial-gradient(ellipse 50% 40% at 15% 35%, rgba(59, 130, 246, 0.12), transparent)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

