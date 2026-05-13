import { useState, useEffect } from "react";
import {
  X,
  Users,
  TrendingDown,
  TrendingUp,
  PiggyBank,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

type TransactionType =
  | "expense"
  | "income"
  | "saving"
  | "reimbursement_sent"
  | "reimbursement_received";
type PaymentMethod = "cash" | "debit" | "credit";

const TYPES = [
  {
    value: "expense",
    label: "Gasto",
    icon: TrendingDown,
    color: "text-red-500",
  },
  {
    value: "income",
    label: "Ingreso",
    icon: TrendingUp,
    color: "text-green-500",
  },
  { value: "saving", label: "Ahorro", icon: PiggyBank, color: "text-blue-500" },
] as const;

const BUTTON_LABEL: Record<TransactionType, string> = {
  expense: "Guardar gasto",
  income: "Guardar ingreso",
  saving: "Guardar ahorro",
  reimbursement_sent: "Guardar pago",
  reimbursement_received: "Guardar cobro",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Card {
  id: number;
  name: string;
  last_four: string | null;
}

export const CreateTransactionModal = ({ isOpen, onClose }: Props) => {
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [isSplit, setIsSplit] = useState(false);
  const [splitFriend, setSplitFriend] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [cardId, setCardId] = useState<number | null>(null);

  useEffect(() => {
    if (method !== "credit") setCardId(null);
  }, [method]);

  if (!isOpen) return null;

  if (!isOpen) return null;

  const handleClose = () => {
    setAmount("");
    setTitle("");
    setDescription("");
    setIsSplit(false);
    setSplitFriend("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // tu lógica de envío aquí
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-card-bg border border-border-subtle w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-text-main" />
            </div>
            <div>
              <p className="font-semibold text-text-main">Nueva transacción</p>
              <p className="text-xs text-text-subtle">Registra un movimiento</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-text-subtle hover:text-red-500 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Selector de tipo */}
        <div className="px-6 py-3 border-b border-border-subtle">
          <div className="grid grid-cols-3 gap-1.5">
            {TYPES.map(({ value, label, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setType(value)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  type === value
                    ? "bg-background border-border-subtle text-text-main"
                    : "border-transparent text-text-subtle hover:border-border-subtle"
                }`}
              >
                <Icon size={16} className={type === value ? color : ""} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="px-6 py-4 flex flex-col gap-4 max-h-[50vh] overflow-y-auto
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-border-subtle
            hover:[&::-webkit-scrollbar-thumb]:bg-principal/40"
          >
            {/* Monto */}
            <div className="flex items-center gap-2 bg-background border border-border-subtle rounded-xl px-4">
              <span className="text-text-subtle font-semibold text-lg">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent py-3 text-xl font-semibold text-text-main focus:outline-none placeholder:text-text-subtle/40"
                required
              />
            </div>

            {/* Título + Fecha */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-subtle">
                  Título
                </label>
                <input
                  type="text"
                  placeholder="Ej: Supermercado"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-subtle">
                  Fecha
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
                />
              </div>
            </div>

            {/* Categoría + Cuenta */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-subtle">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal transition-all"
                >
                  <option value="">Seleccionar</option>
                  {/* tus categorías desde la API */}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-subtle">
                  Cuenta
                </label>
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal transition-all"
                >
                  <option value="">Seleccionar</option>
                  {/* tus cuentas desde la API */}
                </select>
              </div>
            </div>

            {/* Método de pago */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-subtle">
                Método de pago
              </label>
              <div className="flex gap-2">
                {(["cash", "debit", "credit"] as PaymentMethod[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      method === m
                        ? "bg-background border-border-subtle text-text-main"
                        : "border-border-subtle/50 text-text-subtle hover:text-text-main"
                    }`}
                  >
                    {
                      { cash: "Efectivo", debit: "Débito", credit: "Crédito" }[
                        m
                      ]
                    }
                  </button>
                ))}
              </div>

              {/* Selector de tarjeta — solo si eligió crédito */}
              {method === "credit" && (
                <div className="animate-in slide-in-from-top-1 duration-150">
                  {cards.length === 0 ? (
                    <p className="text-xs text-text-subtle px-1 py-2">
                      Esta cuenta no tiene tarjetas registradas.
                    </p>
                  ) : (
                    <select
                      value={cardId ?? ""}
                      onChange={(e) => setCardId(Number(e.target.value))}
                      required
                      className="w-full bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal transition-all"
                    >
                      <option value="">Seleccionar tarjeta</option>
                      {cards.map((card) => (
                        <option key={card.id} value={card.id}>
                          {card.name} •••• {card.last_four}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </div>

            {/* Tag + Descripción */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-subtle">
                  Tag{" "}
                  <span className="font-normal text-text-subtle/60">
                    (opcional)
                  </span>
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal transition-all"
                >
                  <option value="">Sin tag</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-subtle">
                  Descripción{" "}
                  <span className="font-normal text-text-subtle/60">
                    (opcional)
                  </span>
                </label>
                <textarea
                  placeholder="Nota..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background border border-border-subtle rounded-xl px-3 py-2 text-sm text-text-main focus:outline-none focus:border-principal transition-all resize-none h-[38px]"
                />
              </div>
            </div>

            {/* Dividir gasto */}
            <div className="bg-background border border-border-subtle rounded-xl p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-card-bg rounded-lg border border-border-subtle flex items-center justify-center">
                    <Users size={15} className="text-text-subtle" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-main">
                      Dividir gasto
                    </p>
                    <p className="text-xs text-text-subtle">Con un amigo</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSplit((p) => !p)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${isSplit ? "bg-principal" : "bg-border-subtle"}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${isSplit ? "left-5" : "left-0.5"}`}
                  />
                </button>
              </div>
              {isSplit && (
                <select
                  value={splitFriend}
                  onChange={(e) => setSplitFriend(e.target.value)}
                  className="bg-card-bg border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal transition-all animate-in slide-in-from-top-1 duration-150"
                >
                  <option value="">Seleccionar amigo</option>
                  {/* tus amigos desde la API */}
                </select>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border-subtle flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl border border-border-subtle text-sm font-semibold text-text-subtle hover:text-text-main transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-[2] py-3 rounded-xl bg-principal hover:bg-principal/90 text-white text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer"
            >
              {BUTTON_LABEL[type]}
            </button>
          </div>
        </form>
      </div>
      <div className="absolute inset-0 -z-10" onClick={handleClose} />
    </div>
  );
};
