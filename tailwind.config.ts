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
      // "light",
      // "night",
      {
        mytheme: {
          primary: "#570df8", // Light blue
          secondary: "#9333ea", // Purple
          accent: "#f59e0b", // Amber
          neutral: "#1f2937", // Dark gray
          "base-100": "#f9fafb", // Very light gray
          "base-200": "#e5e7eb", // Light gray
          "base-300": "#d1d5db", // Light gray
          "base-content": "#111827", // Very dark gray
          info: "#3b82f6", // Light blue
          success: "#10b981", // Green
          warning: "#f59e0b", // Amber
          error: "#ef4444", // Red

          // Dark theme colors
          "color-primary-a0": "#570df8", // Dark theme primary a0
          "color-primary-a10": "#7435fa", // Dark theme primary a10
          "color-primary-a20": "#8b50fc", // Dark theme primary a20
          "color-primary-a30": "#a06afd", // Dark theme primary a30
          "color-primary-a40": "#b282fe", // Dark theme primary a40
          "color-primary-a50": "#c49bff", // Dark theme primary a50

          "color-surface-a0": "#000000", // Dark theme surface a0
          "color-surface-a10": "#1e1e1e", // Dark theme surface a10
          "color-surface-a20": "#353535", // Dark theme surface a20
          "color-surface-a30": "#4e4e4e", // Dark theme surface a30
          "color-surface-a40": "#696969", // Dark theme surface a40
          "color-surface-a50": "#858585", // Dark theme surface a50

          "color-surface-mixed-a0": "#241146", // Dark theme mixed surface a0
          "color-surface-mixed-a10": "#3b2759", // Dark theme mixed surface a10
          "color-surface-mixed-a20": "#523f6c", // Dark theme mixed surface a20
          "color-surface-mixed-a30": "#695880", // Dark theme mixed surface a30
          "color-surface-mixed-a40": "#817194", // Dark theme mixed surface a40
          "color-surface-mixed-a50": "#998ca9", // Dark theme mixed surface a50
        },
      },
    ],
  },
  darkMode: "class",
  plugins: [require('daisyui')],
};

export default config;
