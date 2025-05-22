import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this covers all relevant directories
  ],
  theme: {
    extend: {
      // You can extend your theme here if needed
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin
  ],
};
export default config;
