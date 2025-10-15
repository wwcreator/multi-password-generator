import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#142850"
        }
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
};

export default config;