// constants.ts
import type { SortKeys } from "./tableTypes";

export const CABECERA_TABLA: { key: SortKeys; label: string }[] = [
  { key: "amount", label: "Monto" },
  { key: "type", label: "Tipo" },
  {key: 'account_id', label:'Cuenta'},
  { key: "category_id", label: "Categoría" },
  { key: "created_at", label: "Fecha" },
  { key: "description", label: "Descripción" },
];