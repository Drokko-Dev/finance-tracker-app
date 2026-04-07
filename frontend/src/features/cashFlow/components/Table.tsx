import { useState, type ChangeEvent } from "react";
import { MoveDown, MoveUp } from "lucide-react";

interface Transaccion {
  id: number;
  monto: number;
  categoria: string;
  fecha: string;
  descripcion: string;
}

interface Data {
  data: Transaccion[];
}
type SortKeys = keyof Transaccion;

const cabecera: { key: SortKeys; label: string }[] = [
  { key: "monto", label: "Monto" },
  { key: "categoria", label: "Categoría" },
  { key: "fecha", label: "Fecha" },
  { key: "descripcion", label: "Descripción" },
];
const TablaFinanzas = ({ data }: Data) => {
  // 1. Datos ficticios iniciales
  const [datos, setDatos] = useState<Transaccion[]>(data);

  // 2. Estado para el control de ordenamiento
  const [sortConfig, setSortConfig] = useState<{
    key: SortKeys | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  // 3. Función de Ordenamiento
  const handleSort = (columna: SortKeys) => {
    let direccion: "asc" | "desc" = "asc";

    // Si clickeamos la misma columna, invertimos la dirección
    if (sortConfig.key === columna && sortConfig.direction === "asc") {
      direccion = "desc";
    }

    setSortConfig({ key: columna, direction: direccion });

    const datosOrdenados = [...datos].sort((a, b) => {
      let valA: string | number | Date = a[columna];
      let valB: string | number | Date = b[columna];

      // Manejo especial para fechas para que ordene cronológicamente
      if (columna === "fecha") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return direccion === "asc" ? -1 : 1;
      if (valA > valB) return direccion === "asc" ? 1 : -1;
      return 0;
    });

    setDatos(datosOrdenados);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-transparent text-text-main rounded-lg shadow-xl">
      {/* --- CONTROLES MÓVILES (Solo visible en celulares) --- */}
      <div className="md:hidden w-full flex justify-end items-center mb-4 px-2 gap-2">
        <label className="text-text-subtle text-sm font-bold">Ordenar por:</label>
        <select
          className="bg-slate-800 text-text-main text-sm rounded-md px-3 py-1.5 border border-gray-600 outline-none focus:border-blue-400 transition-colors"
          value={sortConfig.key || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            handleSort(e.target.value as keyof Transaccion)
          }
        >
          <option value="" disabled className="text-text-main">
            Seleccionar...
          </option>
          {cabecera.map((col) => (
            <option key={col.key} value={col.key}>
              {col.label}
            </option>
          ))}
        </select>

        {/* Botón para alternar la dirección (Ascendente/Descendente) */}
        <button
          onClick={() => sortConfig.key && handleSort(sortConfig.key)}
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

      {/* --- ENCABEZADO PC (Oculto en móviles) --- */}
      <div className="hidden md:flex w-full flex-row bg-transparent px-8 py-4 justify-between items-center border-b-2 border-gray-600 font-bold uppercase text-sm tracking-wider">
        {cabecera.map((col) => (
          <div
            key={col.key}
            onClick={() => handleSort(col.key)}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-all duration-200 select-none flex-1 justify-center first:justify-start last:justify-end"
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
        {datos.map((item) => (
          <div
            key={item.id}
            className="w-full flex flex-col md:flex-row px-6 py-4 md:px-8 justify-between items-start border border-gray-800 md:border-0 md:border-b hover:bg-slate-800 transition-colors rounded-lg md:rounded-none gap-2 md:gap-4"
          >
            {/* Monto */}
            <span className="flex-1 min-w-0 w-full text-center md:text-left font-mono text-green-400 text-lg md:text-base block md:inline">
              ${item.monto.toFixed(2)}
            </span>

            {/* Categoría */}
            <span className="flex-1 min-w-0 w-full text-center md:text-left text-gray-300 text-sm md:text-base block md:inline">
              <span className="md:hidden font-bold text-gray-500 mr-2">
                Cat:
              </span>
              {item.categoria}
            </span>

            {/* Fecha */}
            <span className="flex-1 min-w-0 w-full text-center md:text-left text-gray-400 text-sm block md:inline">
              <span className="md:hidden font-bold text-gray-500 mr-2">
                Fecha:
              </span>
              {item.fecha}
            </span>

            {/* Descripción */}
            <span className="flex-1 min-w-0 w-full text-center md:text-left text-gray-300 leading-relaxed break-all md:wrap-break-word italic md:not-italic block md:inline">
              {item.descripcion}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TablaFinanzas;
