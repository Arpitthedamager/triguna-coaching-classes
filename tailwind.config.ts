import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "night",
      {
        mytheme: {
          primary: "#2A2A2A", 
          secondary: "#9333EA",
          accent: "#F43F5E",
          neutral: "#2A2A2A",
          "base-100": "#F9FAFB",
        },
      },
    ],
  },
  darkMode: "class",
  plugins: [require('daisyui')],
};

export default config;
