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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // this is the way of defining colors in tailwindcss
        'custom-red': 'var(--custom-red)',
        'custom-pink': 'var(--custom-pink)',
      },
    },
  },
  plugins: [],
} satisfies Config;
