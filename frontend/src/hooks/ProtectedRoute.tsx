import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// La función para preguntar si estamos logueados
const checkAuth = async () => {
  const response = await apiClient.get("/api/v1/me");
  return response.data;
};

export const ProtectedRoute = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: checkAuth,
    retry: false, // ¡Clave! Si falla (401), no queremos que reintente, queremos que lo expulse de inmediato
  });

  // Mientras le preguntamos al backend, mostramos tu spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <LoadingSpinner />
      </div>
    );
  }

  // Si hubo error (ej. el backend nos devolvió 401 porque no hay cookie), lo pateamos al Login
  if (isError || !user) {
    return <Navigate to="/login" replace />; // replace evita que pueda volver atrás con el botón del navegador
  }

  // Si todo está bien, <Outlet /> renderiza la página que el usuario quería ver (Dashboard, Ciclos, etc.)
  return <Outlet />;
};
