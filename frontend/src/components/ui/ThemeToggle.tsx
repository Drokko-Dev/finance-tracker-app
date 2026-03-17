import { Sun, Moon } from "lucide-react";
import { useState } from "react";

const iconBtnStyles =
  "cursor-pointer w-10 h-10 rounded-full border border-[var(--color-border-subtle)] flex justify-center items-center transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-white/5";

export const ThemeToggle = ({ className }: { className: string }) => {
  // Leemos directamente del DOM que ya fue procesado por el script de arriba
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button onClick={toggleTheme} className={className}>
      {isDark ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
};
