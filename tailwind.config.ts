import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hopeful Twilight Design System
        primary: {
          DEFAULT: "#4A6FA5",
          50: "#EEF2F7",
          100: "#D4DEE9",
          200: "#A9BDD3",
          300: "#7E9CBD",
          400: "#5A7FB1",
          500: "#4A6FA5",
          600: "#3B5984",
          700: "#2C4363",
          800: "#1E2D42",
          900: "#0F1721",
        },
        slate: {
          DEFAULT: "#2E3B4E",
        },
        teal: {
          DEFAULT: "#3EABA8",
          50: "#E8F6F6",
          100: "#C5EAEA",
          200: "#8DD5D3",
          300: "#56C0BD",
          400: "#3EABA8",
          500: "#328A87",
          600: "#276A68",
          700: "#1C4B4A",
          800: "#112D2C",
          900: "#071515",
        },
        sage: {
          DEFAULT: "#7AB87A",
          50: "#F0F7F0",
          100: "#D9ECD9",
          200: "#B5DAB5",
          300: "#91C891",
          400: "#7AB87A",
          500: "#5F9D5F",
          600: "#4B7D4B",
          700: "#385E38",
          800: "#253E25",
          900: "#131F13",
        },
        orange: {
          DEFAULT: "#E8956F",
          50: "#FDF2ED",
          100: "#F9DDD0",
          200: "#F3BBA1",
          300: "#EDA872",
          400: "#E8956F",
          500: "#D97A4F",
          600: "#C0633A",
          700: "#924B2C",
          800: "#64331E",
          900: "#361B10",
        },
        background: "#F8FAFB",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
      fontSize: {
        body: ["1.125rem", { lineHeight: "1.6" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
