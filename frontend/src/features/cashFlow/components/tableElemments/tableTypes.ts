import type { Transaction } from "../../../../types/transactions.ts";

// Renombramos 'Data' a 'TablaFinanzasProps' por convención
export interface TablaFinanzasProps {
  data: Transaction[];
}

export type SortKeys = keyof Transaction;

// Exportamos esta interfaz en caso de que Transaction no incluya todo
export interface TransaccionLocal {
  id: number;
  amount: number;
  type?: "expense" | "income" | "saving";
  category_id: string;
  account_id?: number;
  created_at: string;
  description: string;
}

export interface SortConfig {
  key: SortKeys | null;
  direction: "asc" | "desc";
}