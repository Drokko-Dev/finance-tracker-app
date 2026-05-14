import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CardRead, CardCreate, CardUpdate } from "@/types/Accounts";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  editing: CardRead | null;
  accountId: number;
  onSave: (data: CardCreate | CardUpdate) => void;
}

export const CardModal = ({
  isOpen,
  onClose,
  editing,
  onSave,
}: CardModalProps) => {
  const [name, setName] = useState("");
  const [lastFour, setLastFour] = useState("");
  const [billingDay, setBillingDay] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setLastFour(editing.last_four ?? "");
      setBillingDay(String(editing.billing_day ?? ""));
      setLimit(String(editing.credit_limit ?? ""));
    } else {
      setName("");
      setLastFour("");
      setBillingDay("");
      setLimit("");
    }
  }, [editing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      last_four: lastFour || undefined,
      billing_day: billingDay ? Number(billingDay) : undefined,
      credit_limit: limit ? Number(limit) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-card-bg border border-border-subtle w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <p className="font-semibold text-text-main">
            {editing ? "Editar tarjeta" : "Nueva tarjeta"}
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-text-subtle hover:text-red-500 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-subtle">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Visa Signature"
              required
              className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-subtle">
                Últimos 4 dígitos
              </label>
              <input
                type="text"
                value={lastFour}
                onChange={(e) => setLastFour(e.target.value)}
                placeholder="4521"
                maxLength={4}
                className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-subtle">
                Día de facturación
              </label>
              <input
                type="number"
                value={billingDay}
                onChange={(e) => setBillingDay(e.target.value)}
                placeholder="15"
                min={1}
                max={31}
                className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-subtle">
              Límite de crédito
            </label>
            <div className="flex items-center gap-2 bg-background border border-border-subtle rounded-xl px-3">
              <span className="text-text-subtle font-semibold">$</span>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="1.000.000"
                className="w-full bg-transparent py-2.5 text-sm text-text-main focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-border-subtle text-sm font-semibold text-text-subtle cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-[2] py-3 rounded-xl bg-principal text-white text-sm font-semibold hover:bg-principal/90 transition-all cursor-pointer"
            >
              {editing ? "Guardar cambios" : "Agregar tarjeta"}
            </button>
          </div>
        </form>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
