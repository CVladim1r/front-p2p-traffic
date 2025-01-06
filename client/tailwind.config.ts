import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        loading: `url(./src/shared/assets/images/loading-bg.png)`,
      },
      keyframes: {
        appear: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        disappear: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' },
        },
      },
      animation: {
        appear: 'appear 0.5s forwards',
        disappear: 'disappear 0.5s forwards',
        shake: 'shake 0.2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
