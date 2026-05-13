import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type {
  AccountResponse,
  AccountCreate,
  AccountUpdate,
  Bank,
} from "@/types/Accounts";

const ACCOUNT_TYPES = [
  { value: "corriente", label: "Cuenta corriente" },
  { value: "vista", label: "Cuenta vista" },
  { value: "ahorro", label: "Cuenta de ahorro" },
];

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  editing: AccountResponse | null;
  banks: Bank[];
  onSave: (data: AccountCreate | AccountUpdate) => void;
  onDelete: (accountId: number) => void;
}

export const AccountModal = ({
  isOpen,
  onClose,
  editing,
  banks,
  onSave,
  onDelete,
}: AccountModalProps) => {
  const [bankId, setBankId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("corriente");

  useEffect(() => {
    if (editing) {
      setBankId(String(editing.bank.id));
      setName(editing.name);
      setType(editing.type);
    } else {
      setBankId("");
      setName("");
      setType("corriente");
    }
  }, [editing, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editing ? { name, type } : { bank_id: Number(bankId), name, type });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-card-bg border border-border-subtle w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <p className="font-semibold text-text-main">
            {editing ? "Editar cuenta" : "Nueva cuenta"}
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-text-subtle hover:text-red-500 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {!editing && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-subtle">
                Banco
              </label>
              <select
                value={bankId}
                onChange={(e) => setBankId(e.target.value)}
                required
                className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal transition-all"
              >
                <option value="">Seleccionar banco</option>
                {banks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-subtle">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Cuenta Corriente Personal"
              required
              className="bg-background border border-border-subtle rounded-xl px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-principal focus:ring-1 focus:ring-principal transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-subtle">
              Tipo
            </label>
            <div className="flex gap-2">
              {ACCOUNT_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    type === t.value
                      ? "bg-background border-border-subtle text-text-main"
                      : "border-border-subtle/50 text-text-subtle"
                  }`}
                >
                  {t.label}
                </button>
              ))}
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
              {editing ? "Guardar cambios" : "Crear cuenta"}
            </button>
          </div>
          {editing && (
            <button
              type="button"
              onClick={() => {
                onDelete(editing.id);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              Eliminar cuenta
            </button>
          )}
        </form>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
