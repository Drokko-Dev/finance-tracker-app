import { useFriendStats } from "@/features/friends/hooks/useFriendStatus";
import { MyCards } from "@/components/MyCards";

export function FriendsPage() {
  const { cards, isLoading } = useFriendStats();
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
        <MyCards cards={cards} />
      </main>
    </div>
  );
}
