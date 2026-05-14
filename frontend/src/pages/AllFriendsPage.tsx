import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Bell,
  Check,
  X,
  Trash2,
  Clock,
  UserCheck,
  Users,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

// ──────────────────────────────────────────
// Tipos
// ──────────────────────────────────────────
interface Friend {
  id: number;
  name: string;
  reason: string;
  amount: number;
  type: "positive" | "negative" | "neutral";
  avatar?: string;
  initials?: string;
  bgColor?: string;
  status: "online" | "offline";
}

interface PendingRequest {
  request_id: number;
  sender_name: string;
  sender_initials: string;
  sender_email: string;
  bgColor: string;
  type: "incoming" | "outgoing";
}

// ──────────────────────────────────────────
// Datos mock
// ──────────────────────────────────────────
const INITIAL_FRIENDS: Friend[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    reason: 'Te debe por "Cena Viernes"',
    amount: 250.0,
    type: "positive",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "online",
  },
  {
    id: 2,
    name: "Ana Lucía",
    reason: 'Le debes por "Uber al centro"',
    amount: -45.0,
    type: "negative",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "offline",
  },
  {
    id: 3,
    name: "Miguel Ríos",
    reason: 'Te debe por "Boletos de Cine"',
    amount: 200.0,
    type: "positive",
    initials: "MR",
    bgColor: "bg-purple-600",
    status: "online",
  },
  {
    id: 4,
    name: "Sofía Vargas",
    reason: "Están a mano",
    amount: 0.0,
    type: "neutral",
    avatar: "https://i.pravatar.cc/150?img=44",
    status: "offline",
  },
  {
    id: 5,
    name: "Juan Pablo",
    reason: 'Le debes por "Regalo Mamá"',
    amount: -75.0,
    type: "negative",
    initials: "JP",
    bgColor: "bg-orange-800",
    status: "offline",
  },
  {
    id: 6,
    name: "Valentina Cruz",
    reason: 'Te debe por "Almuerzo equipo"',
    amount: 130.0,
    type: "positive",
    avatar: "https://i.pravatar.cc/150?img=20",
    status: "online",
  },
  {
    id: 7,
    name: "Roberto Fuentes",
    reason: "Están a mano",
    amount: 0.0,
    type: "neutral",
    initials: "RF",
    bgColor: "bg-sky-700",
    status: "offline",
  },
];

const INITIAL_REQUESTS: PendingRequest[] = [
  {
    request_id: 101,
    sender_name: "Daniela Ramos",
    sender_initials: "DR",
    sender_email: "daniela.ramos@gmail.com",
    bgColor: "bg-pink-600",
    type: "incoming",
  },
  {
    request_id: 102,
    sender_name: "Felipe Torres",
    sender_initials: "FT",
    sender_email: "ftorres@gmail.com",
    bgColor: "bg-indigo-600",
    type: "incoming",
  },
  {
    request_id: 105,
    sender_name: "Camila Ortegad",
    sender_initials: "CO",
    sender_email: "camila.do@outlook.com",
    bgColor: "bg-teal-600",
    type: "outgoing",
  },
  {
    request_id: 103,
    sender_name: "Camila Ortega",
    sender_initials: "CO",
    sender_email: "camila.o@outlook.com",
    bgColor: "bg-teal-600",
    type: "outgoing",
  },
  {
    request_id: 104,
    sender_name: "Andrés Silva",
    sender_initials: "AS",
    sender_email: "andres.silva@empresa.cl",
    bgColor: "bg-amber-700",
    type: "outgoing",
  },
];

// ──────────────────────────────────────────
// Sub-componentes
// ──────────────────────────────────────────

const Avatar = ({
  friend,
  size = "md",
}: {
  friend:
    | Friend
    | {
        avatar?: string;
        initials?: string;
        bgColor?: string;
        status?: string;
        name: string;
      };
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "w-9 h-9 text-xs" : "w-11 h-11 text-sm";
  return (
    <div className="relative flex-shrink-0">
      {friend.avatar ? (
        <img
          src={friend.avatar}
          alt={friend.name}
          className={`${dim} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${dim} rounded-full flex items-center justify-center font-bold text-white ${friend.bgColor}`}
        >
          {friend.initials}
        </div>
      )}
      {"status" in friend && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#13141A] ${
            (friend as Friend).status === "online"
              ? "bg-emerald-500"
              : "bg-gray-600"
          }`}
        />
      )}
    </div>
  );
};

// ──────────────────────────────────────────
// Página principal
// ──────────────────────────────────────────
export function AllFriendsPage() {
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [requests, setRequests] = useState<PendingRequest[]>(INITIAL_REQUESTS);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"Todos" | "Me deben" | "Debo" | "A mano">(
    "Todos",
  );
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [requestsSection, setRequestsSection] = useState<
    "incoming" | "outgoing"
  >("incoming");

  // Filtrado
  const filteredFriends = friends.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      tab === "Todos" ||
      (tab === "Me deben" && f.type === "positive") ||
      (tab === "Debo" && f.type === "negative") ||
      (tab === "A mano" && f.type === "neutral");
    return matchSearch && matchTab;
  });

  const incomingRequests = requests.filter((r) => r.type === "incoming");
  const outgoingRequests = requests.filter((r) => r.type === "outgoing");

  const handleAccept = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.request_id !== id));
  };

  const handleReject = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.request_id !== id));
  };

  const handleCancelOutgoing = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.request_id !== id));
  };

  const handleDeleteFriend = (id: number) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
    setConfirmDelete(null);
  };

  const tabs = ["Todos", "Me deben", "Debo", "A mano"] as const;

  // Estadísticas rápidas
  const totalDeben = friends
    .filter((f) => f.type === "positive")
    .reduce((acc, f) => acc + f.amount, 0);
  const totalDebo = friends
    .filter((f) => f.type === "negative")
    .reduce((acc, f) => acc + Math.abs(f.amount), 0);
  const balance = totalDeben - totalDebo;

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/amigos"
            className="w-9 h-9 rounded-xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-subtle hover:text-text-main hover:border-border-subtle/80 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-text-main">
              Todos los Amigos
            </h1>
            <p className="text-sm text-text-subtle">
              {friends.length} amigos · {incomingRequests.length} solicitudes
              pendientes
            </p>
          </div>
        </div>
      </header>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Me deben"
          value={`$${totalDeben.toFixed(2)}`}
          color="text-emerald-400"
          bg="bg-emerald-500/10"
          border="border-emerald-500/20"
          icon={<UserCheck className="w-5 h-5 text-emerald-400" />}
        />
        <SummaryCard
          label="Debo"
          value={`$${totalDebo.toFixed(2)}`}
          color="text-rose-400"
          bg="bg-rose-500/10"
          border="border-rose-500/20"
          icon={<Clock className="w-5 h-5 text-rose-400" />}
        />
        <SummaryCard
          label="Balance neto"
          value={`${balance >= 0 ? "+" : ""}$${balance.toFixed(2)}`}
          color={balance >= 0 ? "text-emerald-400" : "text-rose-400"}
          bg={balance >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10"}
          border={balance >= 0 ? "border-emerald-500/20" : "border-rose-500/20"}
          icon={<Users className="w-5 h-5 text-text-subtle" />}
        />
      </div>

      {/* Sección de Solicitudes Pendientes */}
      {requests.length > 0 && (
        <section className="bg-card-bg border border-border-subtle rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border-subtle flex justify-between items-center">
            <h2 className="text-base font-bold text-text-main flex items-center gap-2">
              Solicitudes pendientes
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-principal/15 text-principal">
                {requests.length}
              </span>
            </h2>
            <div className="flex gap-1 bg-background rounded-lg p-1">
              <button
                onClick={() => setRequestsSection("incoming")}
                className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                  requestsSection === "incoming"
                    ? "bg-card-bg text-text-main shadow-sm"
                    : "text-text-subtle hover:text-text-main"
                }`}
              >
                Recibidas ({incomingRequests.length})
              </button>
              <button
                onClick={() => setRequestsSection("outgoing")}
                className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                  requestsSection === "outgoing"
                    ? "bg-card-bg text-text-main shadow-sm"
                    : "text-text-subtle hover:text-text-main"
                }`}
              >
                Enviadas ({outgoingRequests.length})
              </button>
            </div>
          </div>

          <div className="divide-y divide-border-subtle/50">
            {requestsSection === "incoming" ? (
              incomingRequests.length === 0 ? (
                <EmptyState
                  text="No tienes solicitudes recibidas"
                  icon={<Check className="w-5 h-5 text-text-subtle" />}
                />
              ) : (
                incomingRequests.map((req) => (
                  <div
                    key={req.request_id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${req.bgColor}`}
                      >
                        {req.sender_initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-main">
                          {req.sender_name}
                        </p>
                        <p className="text-xs text-text-subtle">
                          {req.sender_email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:block text-[11px] text-text-subtle bg-background px-2 py-1 rounded-md border border-border-subtle/50">
                        Quiere añadirte
                      </span>
                      <button
                        onClick={() => handleReject(req.request_id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                        title="Rechazar"
                      >
                        <X size={15} />
                      </button>
                      <button
                        onClick={() => handleAccept(req.request_id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                        title="Aceptar"
                      >
                        <Check size={15} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))
              )
            ) : outgoingRequests.length === 0 ? (
              <EmptyState
                text="No tienes solicitudes enviadas"
                icon={<Clock className="w-5 h-5 text-text-subtle" />}
              />
            ) : (
              outgoingRequests.map((req) => (
                <div
                  key={req.request_id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${req.bgColor}`}
                    >
                      {req.sender_initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-main">
                        {req.sender_name}
                      </p>
                      <p className="text-xs text-text-subtle">
                        {req.sender_email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Pendiente
                    </span>
                    <button
                      onClick={() => handleCancelOutgoing(req.request_id)}
                      className="text-xs text-text-subtle hover:text-rose-400 px-2.5 py-1.5 rounded-lg border border-border-subtle hover:border-rose-500/30 transition-all"
                      title="Cancelar solicitud"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* Directorio de Amigos */}
      <section className="bg-[#1A1C23] border border-white/5 rounded-2xl overflow-hidden">
        {/* Cabecera con buscador y tabs */}
        <div className="p-5 border-b border-white/5">
          <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
            <h2 className="text-base font-bold text-white">
              Directorio de amigos
            </h2>
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar amigo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#252830] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  tab === t
                    ? "bg-[#2D313D] text-white"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="divide-y divide-white/5">
          {filteredFriends.length === 0 ? (
            <EmptyState
              text="No hay amigos en esta categoría"
              icon={<Users className="w-5 h-5 text-gray-600" />}
              dark
            />
          ) : (
            filteredFriends.map((friend) => (
              <div key={friend.id} className="relative">
                <div className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
                  {/* Avatar + info */}
                  <div className="flex items-center gap-4">
                    <Avatar friend={friend} />
                    <div>
                      <p className="text-sm font-semibold text-gray-200">
                        {friend.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {friend.reason}
                      </p>
                    </div>
                  </div>

                  {/* Monto + acciones */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-bold ${
                        friend.type === "positive"
                          ? "text-emerald-400"
                          : friend.type === "negative"
                            ? "text-rose-400"
                            : "text-gray-600"
                      }`}
                    >
                      {friend.type === "positive" ? "+" : ""}
                      {friend.type === "negative" ? "-" : ""}$
                      {Math.abs(friend.amount).toFixed(2)}
                    </span>

                    {/* Acciones contextuales */}
                    <div className="flex items-center gap-1.5">
                      {friend.type === "positive" && (
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252830] hover:bg-[#2D313D] text-gray-400 hover:text-white transition-colors"
                          title="Recordar pago"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                      )}
                      {friend.type === "negative" && (
                        <button className="px-3 py-1.5 bg-[#252830] hover:bg-[#2D313D] rounded-lg text-xs font-semibold text-gray-300 hover:text-white transition-colors">
                          Liquidar
                        </button>
                      )}
                      {/* Botón eliminar */}
                      <button
                        onClick={() =>
                          setConfirmDelete(
                            confirmDelete === friend.id ? null : friend.id,
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#252830] hover:bg-rose-500/15 text-gray-500 hover:text-rose-400 transition-all"
                        title="Eliminar amigo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirmación de eliminación (inline) */}
                {confirmDelete === friend.id && (
                  <div className="mx-5 mb-4 px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-150">
                    <p className="text-xs text-rose-300">
                      ¿Eliminar a{" "}
                      <span className="font-bold">{friend.name}</span> de tus
                      amigos?
                      {friend.amount !== 0 && (
                        <span className="block text-rose-400/70 mt-0.5">
                          Tienes saldo pendiente con esta persona.
                        </span>
                      )}
                    </p>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleDeleteFriend(friend.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
                      >
                        Sí, eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

// ──────────────────────────────────────────
// Componentes auxiliares
// ──────────────────────────────────────────

function SummaryCard({
  label,
  value,
  color,
  bg,
  border,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`${bg} border ${border} rounded-2xl p-4 flex items-center gap-3`}
    >
      <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-text-subtle font-medium">{label}</p>
        <p className={`text-lg font-bold ${color} leading-tight`}>{value}</p>
      </div>
    </div>
  );
}

function EmptyState({
  text,
  icon,
  dark,
}: {
  text: string;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? "bg-white/5" : "bg-border-subtle/30"}`}
      >
        {icon}
      </div>
      <p
        className={`text-sm ${dark ? "text-gray-600" : "text-text-subtle"} text-center`}
      >
        {text}
      </p>
    </div>
  );
}
