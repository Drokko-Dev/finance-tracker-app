// TablaFinanzas.tsx
import { type ChangeEvent } from "react";
import { MoveDown, MoveUp } from "lucide-react";
import { DateFormatter } from "@/constants/date_formatter";
import { CABECERA_TABLA } from "./constants";
import type { SortKeys } from "./tableTypes";
import type { Transaction } from "@/types/transactions";

// Definimos lo que el componente necesita recibir ahora
interface FinanceTableProps {
  data: Transaction[]; // La data que ya viene filtrada y ordenada del backend
  onSort: (key: string) => void; // Función para cambiar el sortBy/order en el padre
  sortConfig: { key: string; direction: "asc" | "desc" | null }; // Estado visual
}

const formatter = (rawDate: string) => {
  const dateObj = new Date(rawDate);
  const formatted = DateFormatter.format(dateObj).replace(/\//g, "-");
  return formatted;
};

const FinanceTable = ({ data, onSort, sortConfig }: FinanceTableProps) => {
  // Nota: Ya no usamos useSortableData(data) aquí dentro.
  // La lógica reside en el componente donde se llama a useTransactions.

  return (
    <div className="w-full max-w-4xl mx-auto bg-transparent text-text-main rounded-lg shadow-xl">
      {/* --- CONTROLES MÓVILES --- */}
      <div className="md:hidden w-full flex justify-end items-center mb-4 px-2 gap-2">
        <label className="text-text-subtle text-sm font-bold">
          Ordenar por:
        </label>
        <select
          className="bg-slate-800 text-text-main text-sm rounded-md px-3 py-1.5 border border-gray-600 outline-none focus:border-blue-400 transition-colors"
          value={sortConfig.key || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onSort(e.target.value as SortKeys)
          }
        >
          <option value="" disabled className="text-text-main">
            Seleccionar...
          </option>
          {CABECERA_TABLA.map((col) => (
            <option key={col.key} value={col.key}>
              {col.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => sortConfig.key && onSort(sortConfig.key)}
          disabled={!sortConfig.key}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-gray-600 rounded-md text-blue-400 transition-colors disabled:opacity-50"
        >
          {sortConfig.direction === "asc" ? (
            <MoveUp size={16} />
          ) : (
            <MoveDown size={16} />
          )}
        </button>
      </div>

      {/* --- ENCABEZADO PC --- */}
      <div className="hidden md:flex w-full flex-row bg-transparent px-8 py-4 items-center border-b-2 border-gray-600 font-bold uppercase text-sm tracking-wider gap-4">
        {CABECERA_TABLA.map((col) => (
          <div
            key={col.key}
            onClick={() => onSort(col.key)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-all duration-200 select-none flex-1 justify-start"
          >
            {col.label}
            <span className="w-4 h-4 text-blue-400">
              {sortConfig.key === col.key &&
                (sortConfig.direction === "asc" ? (
                  <MoveUp size={16} />
                ) : (
                  <MoveDown size={16} />
                ))}
            </span>
          </div>
        ))}
      </div>

      {/* --- CUERPO DE LA TABLA --- */}
      <div className="w-full mt-2 flex flex-col gap-4 md:gap-0">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-full flex flex-col md:flex-row px-6 py-4 md:px-8 items-start border border-gray-800 md:border-0 md:border-b hover:bg-slate-800 transition-colors rounded-lg md:rounded-none gap-2 md:gap-4"
          >
            <span className="flex-1 min-w-0 w-full text-center md:text-left font-mono text-green-400 text-lg md:text-base block md:inline">
              ${item.amount}
            </span>
            <span className="flex-1 min-w-0 w-full text-center md:text-left font-mono text-green-400 text-lg md:text-base block md:inline">
              {item.type}
            </span>
            <span className="flex-1 min-w-0 w-full text-center md:text-left font-mono text-green-400 text-lg md:text-base block md:inline">
              {item.account.name}
            </span>

            <span className="flex-1 min-w-0 w-full text-center md:text-left text-text-main text-sm md:text-base block md:inline">
              {item.category.name}
            </span>

            <span className="flex-1 min-w-0 w-full text-center md:text-left text-text-main text-sm block md:inline">
              <span className="md:hidden font-bold text-gray-500 mr-2">
                Fecha:
              </span>
              {formatter(item.created_at)}
            </span>

            <span className="flex-1 min-w-0 w-full text-center md:text-left text-text-main leading-relaxed break-all md:break-words italic md:not-italic block md:inline">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceTable;