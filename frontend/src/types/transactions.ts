import type { Account } from "./Accounts";
import type { OptionItem } from "./Category";

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: "expense" | "income" | "saving";
  category: OptionItem;
  account: Account;
  created_at: string;
}

export interface dataTransaction {
  items: Transaction[];
  page: number;
  pages: number | null;
  size: number;
  total: number; 
}

export interface TransactionCreate {
  //quitamos el id y created_at porque se generan automáticamente en el backend
  amount: number;
  description: string;
  type: "expense" | "income" | "saving";
  category_id: number;
  account_id: number;
}

export interface YearMonth {
  id: string;
  name: string;
}

export interface DashboardResponse {
  total_income: number;
  total_expense: number;
  total_balance: number;
  transactions: Transaction[];
}

export interface EvolutionPoint {
  month: string; // Este campo contiene la etiqueta: "15 Abr" o "Ene 2023"
  amount: number; // El valor numérico para el gráfico
}
