/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1120",
          50: "#F4F6FB",
          100: "#E7ECF5",
          200: "#C7D2E3",
          300: "#96A7C6",
          400: "#5A6D93",
          500: "#31435F",
          600: "#1C2A42",
          700: "#131D2F",
          800: "#0E1626",
          900: "#0B1120",
          950: "#070B14",
        },
        signal: {
          DEFAULT: "#F2A93B",
          50: "#FEF6E9",
          100: "#FCEAC7",
          200: "#F9D68C",
          300: "#F6C158",
          400: "#F2A93B",
          500: "#DB8F1F",
          600: "#B36F16",
          700: "#8A5411",
        },
        wire: {
          cyan: "#4FD1C5",
          amber: "#F2A93B",
          rose: "#E8794F",
          violet: "#9C8CF2",
          lime: "#A3D65C",
          steel: "#7C93B8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(199,210,227,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(199,210,227,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
    },
  },
  plugins: [],
};
