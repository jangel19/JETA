export default {
  plugins: {
    // Point Tailwind to the TS config to ensure theme/content are picked up
    tailwindcss: { config: './tailwind.config.ts' },
    autoprefixer: {},
  },
}
