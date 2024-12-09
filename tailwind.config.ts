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
        user_primary: "var(--template-user_primary)",
        user_dark: "var(--template-user_dark)",
      },
    },
  },
  plugins: [],
} satisfies Config;
