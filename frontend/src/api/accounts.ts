import apiClient from "./apiClient";
import type { Account } from "../types/Accounts";

// Ya no pedimos userId como parámetro
export const getAccounts = async (): Promise<Account[]> => {
  // Ojo aquí: asegúrate de usar la ruta exacta (agregué el "/" final por si acaso)
  const response = await apiClient.get<Account[]>("/api/v1/accounts");
  return response.data;
};
