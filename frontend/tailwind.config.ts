import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Aquí podrás añadir tus colores personalizados de "Finanzas" más adelante
    },
  },
  plugins: [],
} satisfies Config;
