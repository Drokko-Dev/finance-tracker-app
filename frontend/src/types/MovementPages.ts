import type { Transaction } from "./transactions";

export interface FinanceTableProps {
  data: Transaction[]; 
  onSort: (key: string) => void; 
  sortConfig: { key: string; direction: "asc" | "desc" | null }; 
}