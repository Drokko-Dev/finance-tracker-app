import { LogoSVG } from "@/assets/svg";

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[var(--color-main-bg)] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Anillo de progreso minimalista usando tus variables */}
        <div className="w-16 h-16 border-2 border-[var(--color-border-subtle)] rounded-full"></div>

        {/* El arco que gira con tu color de acento principal */}
        <div className="w-16 h-16 border-2 border-t-[var(--color-accent)] border-transparent rounded-full animate-spin absolute top-0"></div>

        {/* Tu Logo en el centro pulsando suavemente */}
        <div className="absolute animate-pulse">
          <LogoSVG className="w-6 h-6 text-[var(--color-accent)]" />
        </div>
      </div>

      {/* Texto con tu tipografía y color sutil */}
      <span className="mt-6 text-[var(--color-text-subtle)] font-medium tracking-tight animate-pulse">
        Preparando tu panel...
      </span>
    </div>
  );
};
