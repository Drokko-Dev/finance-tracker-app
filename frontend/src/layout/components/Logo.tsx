import { LogoSVG } from "@/assets/svg";
/* const textGradient =
  "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-end)] bg-clip-text text-transparent"; */

export const Logo = () => {
  return (
    <a href="/" className="flex items-center group cursor-pointer">
      {/* Usamos tu LogoSVG con el color de acento de tu tema */}
      <LogoSVG className="w-6 h-6 text-[var(--color-accent)] group-hover:opacity-80 transition-opacity" />
      <span className="text-2xl font-semibold tracking-tight text-[var(--color-text-main)]">
        Finanz
      </span>
    </a>
  );
};
