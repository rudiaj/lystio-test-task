import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        aBeeZee: ["ABeeZee", "serif"],
        abel: ["Abel", "serif"],
      },
      boxShadow: {
        popover: "0px 14px 32px 0px #0000001A",
      },
      fontSize: {
        lg: [
          "18px",
          {
            lineHeight: "21.6px",
            fontWeight: "600",
          },
        ],
        base: [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        sm: [
          "14px",
          {
            lineHeight: "22.4px",
            fontWeight: "500",
          },
        ],
      },
      colors: {
        primary: "#A540F3",
        gray: "#787878",
      },
    },
  },
  plugins: [],
} satisfies Config;
