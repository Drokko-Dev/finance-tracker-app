import { RecentActivity } from "@/features/friends/components/RecentActivity";
import { QuickAccess } from "@/features/friends/components/QuickAccess";
import { Pen } from "lucide-react";
import { PendingRequestsWidget } from "@/features/friends/components/PendingRequestsWidget";

export function FriendsDirectory() {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-text-main)]">
            Amigos y Solicitudes
          </h1>
          <p className="text-sm text-text-subtle">
            Gestiona tus amigos y solicitudes de amistad.
          </p>
        </div>
      </header>
      <main className="flex flex-col gap-6">
        <QuickAccess />
        <div className="flex flex-col lg:flex-row gap-6">
          <PendingRequestsWidget />
          <RecentActivity />
        </div>
      </main>
    </div>
  );
}
