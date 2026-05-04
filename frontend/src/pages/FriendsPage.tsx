import { FriendsDirectory } from "@/features/friends/components/FriendsDirectory";
import { RecentActivity } from "@/features/friends/components/RecentActivity";
import { QuickAccess } from "@/features/friends/components/QuickAccess";
import { Pen } from "lucide-react";
import { PendingRequestsWidget } from "@/features/friends/components/PendingRequestsWidget";

export function FriendsPage() {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-text-main)]">
            Amigos y Saldos
          </h1>
          <p className="text-sm text-text-subtle">
            Gestiona los balances compartidos y cuentas pendientes.
          </p>
        </div>
      </header>
      <main className="flex flex-col gap-6">
        <QuickAccess />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Nuevo componente arriba */}
            <PendingRequestsWidget />

            {/* Actividad Reciente abajo */}
            <RecentActivity />
          </div>
          <div className="lg:col-span-2">
            <FriendsDirectory />
          </div>
        </div>
      </main>
    </div>
  );
}
