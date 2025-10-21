import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--fg)",
        muted: "var(--muted)",
        card: "var(--card)",
        border: "var(--border)",
        subtle: "var(--subtle)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [],
} satisfies Config;