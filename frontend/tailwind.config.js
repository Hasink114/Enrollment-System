/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1565C0",
        primaryDark: "#0D47A1",
        secondary: "#1976D2",
        background: "#F5F7FA",
        surface: "#FFFFFF",
        textPrimary: "#1F2937",
        textSecondary: "#6B7280",
        border: "#E5E7EB",
        success: "#2E7D32",
        warning: "#ED6C02",
        error: "#D32F2F",
      },
      spacing: {
        page: "32px",
        section: "24px",
        card: "20px",
      },
    },
  },
  plugins: [],
}
