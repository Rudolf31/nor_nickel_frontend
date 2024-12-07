import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004C97",
        secondary: "#0077C8",
        third: "#E7EAEF", 
        fourth: "#474951",
      },
    },
  },
  plugins: [],
} satisfies Config;
