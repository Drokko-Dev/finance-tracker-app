import apiClient from "./apiClient";
import type { Transaction, TransactionCreate } from "../types/transactions";

// Ya no pedimos userId como parámetro
export const getTransactionsMovements = async (): Promise<Transaction[]> => {
  // Ojo aquí: asegúrate de usar la ruta exacta (agregué el "/" final por si acaso)
  const response = await apiClient.get<Transaction[]>("/api/v1/transactions/movimientos");
  return response.data;
};

export const createTransaction = async (
  data: TransactionCreate,
): Promise<Transaction> => {
  const response = await apiClient.post<Transaction>(
    "/api/v1/transactions/",
    data,
  );
  return response.data;
};
