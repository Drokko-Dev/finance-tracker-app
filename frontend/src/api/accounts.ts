import apiClient from "./apiClient";
import type {
  AccountResponse,
  AccountCreate,
  AccountUpdate,
  CardRead,
  CardCreate,
  CardUpdate,
  Bank,
} from "../types/Accounts";

export const getAccounts = async (): Promise<AccountResponse[]> => {
  const response = await apiClient.get<AccountResponse[]>("/api/v1/accounts/");
  return response.data;
};

export const createAccount = async (
  data: AccountCreate,
): Promise<AccountResponse> => {
  const response = await apiClient.post<AccountResponse>(
    "/api/v1/accounts/",
    data,
  );
  return response.data;
};

export const updateAccount = async (
  accountId: number,
  data: AccountUpdate,
): Promise<AccountResponse> => {
  const response = await apiClient.put<AccountResponse>(
    `/api/v1/accounts/${accountId}`,
    data,
  );
  return response.data;
};

export const deleteAccount = async (accountId: number): Promise<void> => {
  await apiClient.delete(`/api/v1/accounts/${accountId}`);
};

export const createCard = async (
  accountId: number,
  data: CardCreate,
): Promise<CardRead> => {
  const response = await apiClient.post<CardRead>(
    `/api/v1/accounts/${accountId}/cards`,
    data,
  );
  return response.data;
};

export const updateCard = async (
  accountId: number,
  cardId: number,
  data: CardUpdate,
): Promise<CardRead> => {
  const response = await apiClient.put<CardRead>(
    `/api/v1/accounts/${accountId}/cards/${cardId}`,
    data,
  );
  return response.data;
};

export const deleteCard = async (
  accountId: number,
  cardId: number,
): Promise<void> => {
  await apiClient.delete(`/api/v1/accounts/${accountId}/cards/${cardId}`);
};

export const getBanks = async (): Promise<Bank[]> => {
  const response = await apiClient.get<Bank[]>("/api/v1/banks/");
  return response.data;
};
