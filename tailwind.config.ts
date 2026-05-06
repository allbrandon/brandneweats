import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F9DD6A",
          bg: "#FFFFF8",
          black: "#1A1A1A",
          primary: "#604900",
          terracotta: "#9f4122",
          muted: "#4e4635",
        },
      },
      fontFamily: {
        mono: ['"Courier Prime"', '"Courier New"', "monospace"],
        display: ["Epilogue", "sans-serif"],
        editorial: ['"Space Grotesk"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
