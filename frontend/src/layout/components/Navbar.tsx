import { Bell, ChevronDown, Menu } from "lucide-react";
import { LogoSVG } from "@/assets/svg";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import profileImg from "@/assets/Profile5.png";
import type { NavbarProps } from "@/types/Navbar";

export const Navbar = ({ onOpenMenu }: NavbarProps) => {
  // Botones de acción (Sol, Campana) con tus variables
  const actionBtnStyles =
    "p-2.5 rounded-full border border-[var(--color-border-subtle)] " +
    "text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] " +
    "hover:bg-white/5 transition-all cursor-pointer";

  // Perfil "Píldora" con tus variables
  const profileBtnStyles =
    "flex items-center gap-3 p-1.5 pr-2 rounded-full hover:bg-white/5 " +
    "transition-colors border border-transparent hover:border-[var(--color-border-subtle)] " +
    "group cursor-pointer";

  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] relative z-20">
      {/* Left: Mobile Menu & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMenu}
          className="md:hidden p-2 -ml-2 text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <a href="/" className="flex items-center group cursor-pointer">
          {/* Usamos tu LogoSVG con el color de acento de tu tema */}
          <LogoSVG className="w-6 h-6 text-[var(--color-accent)] group-hover:opacity-80 transition-opacity" />
          <span className="text-2xl font-semibold tracking-tight text-[var(--color-text-main)]">
            Finanz
          </span>
        </a>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* ThemeToggle usando el estilo de botón de acción circular */}
        <ThemeToggle className={actionBtnStyles} />

        <button className={`${actionBtnStyles} relative`}>
          <Bell className="w-[18px] h-[18px]" />
        </button>

        {/* Separator usando tu variable de borde */}
        <div className="hidden sm:block h-8 w-px bg-[var(--color-border-subtle)] mx-1"></div>

        {/* Profile Section */}
        <button className={profileBtnStyles}>
          <img
            src={profileImg}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-[var(--color-border-subtle)] object-cover"
          />
          <div className="hidden md:flex flex-col items-start leading-none">
            <span className="text-base font-medium text-[var(--color-text-subtle)] group-hover:text-[var(--color-text-main)] transition-colors tracking-tight">
              Jaime Vega
            </span>
            <span className="text-xs text-[var(--color-text-subtle)] opacity-70 font-medium mt-1">
              Admin
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-[var(--color-text-subtle)] group-hover:text-[var(--color-text-main)] transition-colors ml-1 hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
