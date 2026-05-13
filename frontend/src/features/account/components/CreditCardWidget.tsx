import { Pencil, Trash2 } from "lucide-react";
import type { CardRead } from "@/types/Accounts";

interface Props {
  card: CardRead;
  colorClass: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const CreditCardWidget = ({
  card,
  colorClass,
  onEdit,
  onDelete,
}: Props) => {
  const used = 0; // vendrá del backend cuando calculés desde transacciones
  const limit = card.credit_limit ?? 0;
  const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;

  return (
    <div
      className={`min-w-[200px] flex-shrink-0 rounded-2xl bg-gradient-to-br ${colorClass} p-4 relative group`}
    >
      {/* Acciones hover */}
      <div className="absolute top-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors cursor-pointer"
          aria-label="Editar tarjeta"
        >
          <Pencil size={11} />
        </button>
        <button
          onClick={onDelete}
          className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-red-500/60 transition-colors cursor-pointer"
          aria-label="Eliminar tarjeta"
        >
          <Trash2 size={11} />
        </button>
      </div>

      {/* Chip */}
      <div className="w-7 h-5 bg-yellow-400/80 rounded mb-3" />

      {/* Número */}
      <p className="text-white/70 text-xs tracking-widest font-mono mb-3">
        •••• •••• •••• {card.last_four ?? "????"}
      </p>

      {/* Nombre */}
      <p className="text-white/60 text-[10px] uppercase tracking-wider">
        {card.name}
      </p>

      {/* Barra límite */}
      {limit > 0 && (
        <div className="mt-2">
          <div className="h-0.5 bg-white/20 rounded-full">
            <div
              className="h-0.5 bg-white/70 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-white/50">
              Usado: ${used.toLocaleString("es-CL")}
            </span>
            <span className="text-[10px] text-white/50">
              Límite: ${limit.toLocaleString("es-CL")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
