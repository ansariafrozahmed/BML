import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5762E",
        dark: "#262626",
        selectedCOLOR: '#F26B0F',
        lightColor: "#fdba74",
        textColor: "#fff",
        textSecondary: "#c2411c",
      },
    },
  },
  plugins: [],
} satisfies Config;
