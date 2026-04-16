export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: "expense" | "income" | "saving";
  category_id: number;
  account_id: number;
  created_at: string;
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
