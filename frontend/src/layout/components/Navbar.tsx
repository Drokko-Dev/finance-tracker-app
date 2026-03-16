import { Bell, ChevronDown } from "lucide-react";
/* import { ThemeToggle } from "@/components/ui/ThemeToggle"; */
import { CoinsSVG } from "@/assets/svg";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const iconBtnStyles =
  "cursor-pointer w-10 h-10 rounded-xl border border-[var(--color-border-subtle)] flex justify-center items-center transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-white/5";
const profileBtnstyles =
  "cursor-pointer px-4 py-2 rounded-2xl border border-[var(--color-border-subtle)] flex items-center gap-3 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-white/5";
const textGradient =
  "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-end)] bg-clip-text text-transparent";
export const Navbar = () => {
  return (
    <header className="h-20 w-full flex justify-between items-center px-4 border border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] transition-colors duration-300">
      <h1 className={`ml-5 flex justify-center items-center`}>
        <CoinsSVG className={`w-8 h-8 text-[var(--color-accent)]`} />
        <span className={`text-3xl font-bold ${textGradient}`}>Finanz</span>
      </h1>
      <div className="flex gap-3 items-center">
        <ThemeToggle />
        <button className={iconBtnStyles}>
          <Bell />
        </button>
        <div className={profileBtnstyles}>
          <div className="w-10 h-10 flex-shrink-0">
            <img
              src="./src/assets/Profile5.png"
              alt="Perfil"
              className="rounded-full w-full h-full object-cover shadow-sm shadow-white/40"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold">Jaime Vega</span>
            <span className="text-sm text-gray-500 font-bold">Admin</span>
          </div>
          <ChevronDown />
        </div>
      </div>
    </header>
  );
};
