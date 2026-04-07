import { useState, useRef, useEffect } from "react";
import { ChevronDown, User, Settings, Receipt, LogOut } from "lucide-react";
import profileImg from "@/assets/Profile5.png";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const UserProfileMenu = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useQuery<AuthUser>({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await apiClient.get("/api/v1/me");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/v1/logout");
      queryClient.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const profileBtnStyles =
    "flex items-center gap-3 p-1.5 pr-2 rounded-full hover:bg-white/5 " +
    "transition-colors border border-transparent hover:border-[var(--color-border-subtle)] " +
    "group cursor-pointer focus:outline-none focus:bg-white/5";

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={profileBtnStyles}
      >
        <img
          src={profileImg}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-[var(--color-border-subtle)] object-cover"
        />
        <div className="hidden md:flex flex-col items-start leading-none">
          <span className="text-base font-medium text-[var(--color-text-main)] transition-colors tracking-tight">
            {user?.name || "Cargando..."}
          </span>
          <span className="text-xs text-[var(--color-text-subtle)] opacity-70 font-medium mt-1">
            {user?.role === "admin" ? "Admin" : "Usuario"}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[var(--color-text-subtle)] group-hover:text-[var(--color-text-main)] transition-transform duration-200 ml-1 hidden sm:block ${
            isProfileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] shadow-2xl py-1.5 z-50 transform origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2.5 border-b border-[var(--color-border-subtle)] mb-1.5">
            <p className="text-sm font-semibold text-[var(--color-text-main)]">
              {user?.name || "Usuario"}
            </p>
            <p className="text-xs font-medium text-[var(--color-text-subtle)] truncate mt-0.5">
              {user?.email || "correo@finanz.com"}
            </p>
          </div>

          <a
            href="#"
            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-border-subtle)] transition-colors"
          >
            <User className="w-4 h-4" /> Mi Perfil
          </a>
          <a
            href="#"
            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-border-subtle)] transition-colors"
          >
            <Settings className="w-4 h-4" /> Configuración
          </a>
          <a
            href="#"
            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-border-subtle)] transition-colors"
          >
            <Receipt className="w-4 h-4" /> Facturación
          </a>

          <div className="h-px w-full bg-[var(--color-border-subtle)] my-1.5"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};
