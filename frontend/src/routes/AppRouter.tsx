import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

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

export const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* Ruta comodín para 404 */}
        <Route path="/movimientos" element={<CashsFlowPage />} />
        <Route path="/ciclos" element={<CiclesPage />} />
        <Route path="/amigos" element={<FriendsPage />} />
        <Route path="/eliminados" element={<DeletePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
