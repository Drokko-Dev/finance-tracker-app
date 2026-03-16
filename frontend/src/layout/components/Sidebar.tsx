import {
  LayoutDashboard,
  ArrowRightLeft,
  RefreshCw,
  Users,
  Trash2,
} from "lucide-react";
import React from "react";

const NAV_LINKS = [
  { name: "Resumen", href: "/", icon: LayoutDashboard }, // Solo el nombre del componente
  { name: "Movimientos", href: "/movimientos", icon: ArrowRightLeft },
  { name: "Mis Ciclos", href: "/ciclos", icon: RefreshCw },
  { name: "Amigos", href: "/amigos", icon: Users },
  { name: "Eliminados", href: "/eliminados", icon: Trash2 },
];

const normalLinkStyles =
  "flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-subtle)] hover:bg-[var(--color-text-subtle)]/15  transition-all font-medium hover:scale-[1.02] active:scale-95";
const activeLinkStyles =
  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium active";

export const Sidebar = () => (
  <aside className="w-64 h-full border-r border-[var(--color-border-subtle)] bg-[var(--color-card-bg)] transition-colors duration-300">
    <nav className="p-4 flex flex-col gap-3">
      <a className={activeLinkStyles} href="/">
        <LayoutDashboard /> Activo
      </a>
      {NAV_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <a key={link.name} href={link.href} className={normalLinkStyles}>
            {/* 1. Contenedor de icono con tamaño fijo y centrado perfecto */}
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <Icon size={20} strokeWidth={2} />
            </div>

            {/* 2. El SPAN del texto con leading-none y un pequeño ajuste de padding */}
            <span className="leading-none pt-[2px] antialiased">
              {link.name}
            </span>
          </a>
        );
      })}
    </nav>
  </aside>
);
