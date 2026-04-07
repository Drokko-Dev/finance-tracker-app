import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProtectedRoute } from "@/hooks/ProtectedRoute";
import { MainLayout } from "@/layout/MainLayout";
import { Signup } from "@/pages/Signup";

// Importaciones dinámicas (Lazy)
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const CashsFlowPage = lazy(() =>
  import("@/pages/CashsFlowPage").then((m) => ({ default: m.CashsFlowPage })),
);
const CiclesPage = lazy(() =>
  import("@/pages/CiclesPage").then((m) => ({ default: m.CiclesPage })),
);
const FriendsPage = lazy(() =>
  import("@/pages/FriendsPage").then((m) => ({ default: m.FriendsPage })),
);
const DeletePage = lazy(() =>
  import("@/pages/DeletePage").then((m) => ({ default: m.DeletePage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/Login").then((m) => ({ default: m.Login })),
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Ruta pública: Login (Sin menú lateral) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* 1er Nivel: Protege las rutas (Verifica la Cookie) */}
        <Route element={<ProtectedRoute />}>
          {/* 2do Nivel: Aplica el diseño (Menú lateral, Navbar) */}
          <Route element={<MainLayout />}>
            {/* 3er Nivel: Las páginas reales */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/movimientos" element={<CashsFlowPage />} />
            <Route path="/ciclos" element={<CiclesPage />} />
            <Route path="/amigos" element={<FriendsPage />} />
            <Route path="/eliminados" element={<DeletePage />} />
          </Route>
        </Route>

        {/* Ruta comodín para 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
