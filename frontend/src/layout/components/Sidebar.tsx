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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Resumen", href: "/", icon: LayoutDashboard },
  { name: "Movimientos", href: "/movimientos", icon: ArrowRightLeft },
  { name: "Mis Ciclos", href: "/ciclos", icon: RefreshCw },
  { name: "Amigos", href: "/amigos", icon: Users },
  { name: "Cuentas", href: "/cuentas", icon: Landmark },
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
  link: (typeof NAV_LINKS)[0];
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

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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

          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
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
          </nav>
        </div>
      </aside>
    </>
  );
};
