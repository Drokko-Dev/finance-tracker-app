import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '@/pages/DashboardPage';
import { NotFound } from '@/pages/NotFoundPage';
import { FriendsPage } from '@/pages/FriendsPage';
import { CashsFlowPage } from '@/pages/CashsFlowPage';
import { CiclesPage } from '@/pages/CiclesPage';
import { DelatePage } from '@/pages/DeletePage';
export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/" element={<DashboardPage />} />      
      {/* Ruta comodín para 404 */}
      <Route path="/movimientos" element={<CashsFlowPage />} />
      <Route path="/ciclos" element={<CiclesPage />} />
      <Route path="/amigos" element={<FriendsPage />} />
      <Route path="/eliminados" element={<DelatePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};