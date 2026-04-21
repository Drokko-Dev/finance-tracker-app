import apiClient from "./apiClient";
import type {
  DashboardResponse,
  Transaction,
  TransactionCreate,
} from "../types/transactions";

// Ya no pedimos userId como parámetro
export const getTransactions = async (): Promise<Transaction[]> => {
  // Ojo aquí: asegúrate de usar la ruta exacta (agregué el "/" final por si acaso)
  const response = await apiClient.get<Transaction[]>("/api/v1/transactions/");
  return response.data;
};

export const getSummarizedTransactions = async (
  account_id?: number,
  month_id?: string,
): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>(
    `/api/v1/transactions/summarized/`,
    {
      params: { account_id, month_id },
    },
  );
  return response.data;
};

export const getYearMonthsTransactions = async (): Promise<
  [year: number, month: number][]
> => {
  const response = await apiClient.get<[number, number][]>(
    "/api/v1/transactions/year-months/",
  );
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
