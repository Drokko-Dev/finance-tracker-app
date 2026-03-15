import apiClient from "./apiClient";
import type { Transaction, TransactionCreate } from "../types/transactions";

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get<Transaction[]>("/api/v1/transactions");
  return response.data;
};

export const createTransaction = async (
  data: TransactionCreate,
): Promise<Transaction> => {
  const response = await apiClient.post<Transaction>(
    "/api/v1/transactions",
    data,
  );
  return response.data;
};
