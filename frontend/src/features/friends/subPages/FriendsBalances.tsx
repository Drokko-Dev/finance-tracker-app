import { Search, Bell, UserCheck, Clock, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { useFriendStats } from "@/features/friends/hooks/useFriendStatus";

// ── Tipos locales (ajusta al tuyo real) ──────────────────────────────────────
type BalanceType = "positive" | "negative" | "neutral";

interface FriendBalance {
  id: number;
  name: string;
  reason: string;
  amount: number;
  type: BalanceType;
  avatar?: string;
  initials?: string;
  bgColor?: string;
  status: "online" | "offline";
}

// Mock data — reemplaza con tu hook/query real
const MOCK_BALANCES: FriendBalance[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    reason: 'Te debe por "Cena Viernes"',
    amount: 250,
    type: "positive",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "online",
  },
  {
    id: 2,
    name: "Ana Lucía",
    reason: 'Le debes por "Uber al centro"',
    amount: -45,
    type: "negative",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "offline",
  },
  {
    id: 3,
    name: "Miguel Ríos",
    reason: 'Te debe por "Boletos de Cine"',
    amount: 200,
    type: "positive",
    initials: "MR",
    bgColor: "bg-purple-600",
    status: "online",
  },
  {
    id: 4,
    name: "Sofía Vargas",
    reason: "Están a mano",
    amount: 0,
    type: "neutral",
    avatar: "https://i.pravatar.cc/150?img=44",
    status: "offline",
  },
  {
    id: 5,
    name: "Juan Pablo",
    reason: 'Le debes por "Regalo Mamá"',
    amount: -75,
    type: "negative",
    initials: "JP",
    bgColor: "bg-orange-800",
    status: "offline",
  },
  {
    id: 6,
    name: "Valentina Cruz",
    reason: 'Te debe por "Almuerzo equipo"',
    amount: 130,
    type: "positive",
    avatar: "https://i.pravatar.cc/150?img=20",
    status: "online",
  },
];

// ── Sub-componentes ───────────────────────────────────────────────────────────

const AvatarBubble = ({ friend }: { friend: FriendBalance }) => (
  <div className="relative flex-shrink-0">
    {friend.avatar ? (
      <img
        src={friend.avatar}
        alt={friend.name}
        className="w-10 h-10 rounded-full object-cover"
      />
    ) : (
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white ${friend.bgColor}`}
      >
        {friend.initials}
      </div>
    )}
    <span
      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card-bg ${friend.status === "online" ? "bg-emerald-500" : "bg-gray-500"}`}
    />
  </div>
);

const SummaryCard = ({
  label,
  value,
  sub,
  colorClass,
  bgClass,
  borderClass,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: React.ReactNode;
}) => (
  <div
    className={`${bgClass} border ${borderClass} rounded-2xl p-4 flex items-center gap-3`}
  >
    <div className="w-10 h-10 rounded-xl bg-background/60 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-text-subtle font-medium">{label}</p>
      <p className={`text-lg font-bold leading-tight ${colorClass}`}>{value}</p>
      <p className="text-[11px] text-text-subtle mt-0.5">{sub}</p>
    </div>
  </div>
);

// ── Página principal ──────────────────────────────────────────────────────────

type Tab = "Todos" | "Me deben" | "Debo" | "A mano";
const TABS: Tab[] = ["Todos", "Me deben", "Debo", "A mano"];

export function FriendsBalances() {
  const [tab, setTab] = useState<Tab>("Todos");
  const [search, setSearch] = useState("");

  // Estadísticas
  const totalDeben = MOCK_BALANCES.filter((f) => f.type === "positive").reduce(
    (a, f) => a + f.amount,
    0,
  );
  const totalDebo = MOCK_BALANCES.filter((f) => f.type === "negative").reduce(
    (a, f) => a + Math.abs(f.amount),
    0,
  );
  const balance = totalDeben - totalDebo;

  // Filtrado
  const filtered = MOCK_BALANCES.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      tab === "Todos" ||
      (tab === "Me deben" && f.type === "positive") ||
      (tab === "Debo" && f.type === "negative") ||
      (tab === "A mano" && f.type === "neutral");
    return matchSearch && matchTab;
  });

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-text-main">
          Saldos
        </h1>
        <p className="text-sm text-text-subtle">
          Resumen de lo que debes y te deben tus amigos.
        </p>
      </header>

      <main className="flex flex-col gap-6">
        {/* ── Tarjetas resumen ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            label="Me deben"
            value={`$${totalDeben.toFixed(2)}`}
            sub={`${MOCK_BALANCES.filter((f) => f.type === "positive").length} personas`}
            colorClass="text-emerald-500"
            bgClass="bg-emerald-500/10"
            borderClass="border-emerald-500/20"
            icon={<UserCheck className="w-5 h-5 text-emerald-500" />}
          />
          <SummaryCard
            label="Debo"
            value={`$${totalDebo.toFixed(2)}`}
            sub={`${MOCK_BALANCES.filter((f) => f.type === "negative").length} personas`}
            colorClass="text-rose-500"
            bgClass="bg-rose-500/10"
            borderClass="border-rose-500/20"
            icon={<Clock className="w-5 h-5 text-rose-500" />}
          />
          <SummaryCard
            label="Balance neto"
            value={`${balance >= 0 ? "+" : ""}$${balance.toFixed(2)}`}
            sub={balance >= 0 ? "Estás a favor" : "Estás en deuda"}
            colorClass={balance >= 0 ? "text-emerald-500" : "text-rose-500"}
            bgClass={balance >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10"}
            borderClass={
              balance >= 0 ? "border-emerald-500/20" : "border-rose-500/20"
            }
            icon={<Wallet className="w-5 h-5 text-text-subtle" />}
          />
        </div>

        {/* ── Directorio de saldos ── */}
        <div className="bg-card-bg border border-border-subtle rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-border-subtle flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <h2 className="text-base font-bold text-text-main flex items-center gap-2">
                <Users className="w-4 h-4 text-text-subtle" />
                Directorio y Saldos
              </h2>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-subtle" />
                <input
                  type="text"
                  placeholder="Buscar amigo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-background border border-border-subtle rounded-lg pl-9 pr-4 py-2 text-sm text-text-main placeholder-text-subtle/50 focus:outline-none focus:border-principal transition-colors"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    tab === t
                      ? "bg-principal/10 text-principal border-principal/30"
                      : "text-text-subtle border-transparent hover:text-text-main hover:bg-border-subtle/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div className="divide-y divide-border-subtle/50">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12">
                <div className="w-10 h-10 rounded-full bg-border-subtle/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-text-subtle" />
                </div>
                <p className="text-sm text-text-subtle">
                  No hay amigos en esta categoría
                </p>
              </div>
            ) : (
              filtered.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-border-subtle/10 transition-colors"
                >
                  {/* Avatar + info */}
                  <div className="flex items-center gap-4">
                    <AvatarBubble friend={friend} />
                    <div>
                      <p className="text-sm font-semibold text-text-main">
                        {friend.name}
                      </p>
                      <p className="text-xs text-text-subtle mt-0.5">
                        {friend.reason}
                      </p>
                    </div>
                  </div>

                  {/* Monto + acciones */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold ${
                        friend.type === "positive"
                          ? "text-emerald-500"
                          : friend.type === "negative"
                            ? "text-rose-500"
                            : "text-text-subtle"
                      }`}
                    >
                      {friend.type === "positive"
                        ? "+"
                        : friend.type === "negative"
                          ? "-"
                          : ""}
                      ${Math.abs(friend.amount).toFixed(2)}
                    </span>

                    <div className="w-20 flex justify-end">
                      {friend.type === "positive" && (
                        <button className="p-1.5 bg-border-subtle/30 hover:bg-border-subtle/60 rounded-lg text-text-subtle hover:text-text-main transition-colors cursor-pointer">
                          <Bell className="w-4 h-4" />
                        </button>
                      )}
                      {friend.type === "negative" && (
                        <button className="px-3 py-1.5 bg-principal/10 hover:bg-principal/20 border border-principal/20 rounded-lg text-xs font-semibold text-principal transition-colors cursor-pointer">
                          Liquidar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
