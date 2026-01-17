export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "lux-ink": "#111111",
        "lux-gold": "#b49b5a",
        "lux-mist": "#f5f5f4",
        "lux-sand": "#e7e2da",
      },
      fontFamily: {
        display: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
