module.exports = {
  plugins: {
    // Ensure Tailwind reads the unified TS config
    tailwindcss: { config: './tailwind.config.ts' },
    autoprefixer: {},
  },
};
