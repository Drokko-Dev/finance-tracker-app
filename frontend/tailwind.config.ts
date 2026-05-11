import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-purple-600",
    "bg-orange-600",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-amber-600",
  ] as string[],
  theme: {
    extend: {
      // Aquí podrás añadir tus colores personalizados de "Finanzas" más adelante
    },
  },
  plugins: [],
} satisfies Config;
