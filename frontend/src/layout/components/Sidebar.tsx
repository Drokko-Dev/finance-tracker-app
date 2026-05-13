import type { SidebarProps } from "@/types/Sidebar";
import { Logo } from "./ui/Logo";
import {
  LayoutDashboard,
  ArrowRightLeft,
  RefreshCw,
  Users,
  Trash2,
  X,
  Landmark,
  ChevronDown,
  BookUser,
  Wallet,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Resumen", href: "/", icon: LayoutDashboard },
  { name: "Movimientos", href: "/movimientos", icon: ArrowRightLeft },
  { name: "Mis Ciclos", href: "/ciclos", icon: RefreshCw },
  { name: "Cuentas", href: "/accounts", icon: Landmark },
];

const AMIGOS_SUBNAV = [
  { name: "Directorio", href: "/friends/directory", icon: BookUser },
  { name: "Saldos", href: "/friends/balances", icon: Wallet },
];

const BOTTOM_LINKS = [
  { name: "Eliminados", href: "/eliminados", icon: Trash2 },
];

const normalLinkStyles =
  "flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-text-subtle)] " +
  "hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] " +
  "transition-all duration-200 font-medium hover:scale-[1.02] active:scale-95 group";
const activeLinkStyles =
  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium active";

const NavLink = ({
  link,
  isActive,
  onClose,
}: {
  link: { name: string; href: string; icon: React.ElementType };
  isActive: boolean;
  onClose: () => void;
}) => {
  const Icon = link.icon;
  return (
    <Link
      to={link.href}
      className={isActive ? activeLinkStyles : normalLinkStyles}
      onClick={onClose}
    >
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        <Icon size={20} strokeWidth={2} />
      </div>
      <span className="leading-none pt-0.5 antialiased">{link.name}</span>
    </Link>
  );
};

const AmigosNavGroup = ({
  onClose,
  currentPath,
}: {
  onClose: () => void;
  currentPath: string;
}) => {
  const isAmigosActive = currentPath.startsWith("/friends");
  const [isOpen, setIsOpen] = useState(isAmigosActive);

  // Si navegamos a una ruta de amigos desde fuera, abrir el grupo
  useEffect(() => {
    if (isAmigosActive) setIsOpen(true);
  }, [isAmigosActive]);

  return (
    <div className="flex flex-col gap-0.5">
      {/* Botón padre "Amigos" */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer ${
          isAmigosActive
            ? "active"
            : "text-[var(--color-text-subtle)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]"
        }`}
      >
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <Users size={20} strokeWidth={2} />
        </div>
        <span className="leading-none pt-0.5 antialiased flex-1 text-left">
          Amigos
        </span>
        <ChevronDown
          size={15}
          strokeWidth={2.5}
          className={` text-text-subtle transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isAmigosActive ? "text-white" : ""}`}
        />
      </button>

      {/* Sub-enlaces animados */}
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 pl-3 border-l border-border-subtle flex flex-col gap-0.5 py-2">
          {AMIGOS_SUBNAV.map((sub) => {
            const Icon = sub.icon;
            const isSubActive = currentPath === sub.href;
            return (
              <Link
                key={sub.name}
                to={sub.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isSubActive
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                    : "text-text-subtle hover:text-text-main hover:bg-border-subtle/40"
                }`}
              >
                <Icon size={16} strokeWidth={2} />
                <span className="leading-none pt-0.5">{sub.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Sidebar = ({ isOpen, onClose, onOpenModal }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card-bg border-r border-border-subtle
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:h-full lg:z-0
      `}
      >
        <div className="lg:p-4 px-4 py-2 flex flex-col gap-3">
          <div className="lg:hidden flex items-center justify-between border-b border-border-subtle">
            <Logo onClick={onClose} />
            <button
              onClick={onClose}
              className="cursor-pointer self-end p-2 text-text-subtle hover:text-red-500 transition-all duration-200 hover:scale-[1.02] active:scale-90"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {/* Links normales hasta antes de Amigos */}
            {NAV_LINKS.slice(0, 3).map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={location.pathname === link.href}
                onClose={onClose}
              />
            ))}

            {/* Grupo expandible de Amigos */}
            <AmigosNavGroup onClose={onClose} currentPath={location.pathname} />

            {/* Resto de links (Cuentas) */}
            {NAV_LINKS.slice(3).map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={location.pathname === link.href}
                onClose={onClose}
              />
            ))}

            <div className="border-t border-border-subtle my-1" />

            {BOTTOM_LINKS.map((link) => (
              <NavLink
                key={link.name}
                link={link}
                isActive={location.pathname === link.href}
                onClose={onClose}
              />
            ))}

            <div className="border-t border-border-subtle my-1" />

            <button
              onClick={onOpenModal} // prop que recibís del padre
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-subtle hover:bg-principal/10 hover:text-principal transition-all duration-200 font-medium hover:scale-[1.02] active:scale-95 w-full cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Plus size={20} strokeWidth={2} />
              </div>
              <span className="leading-none pt-0.5">Nueva transacción</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};
