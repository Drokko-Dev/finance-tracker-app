import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  createCard,
  updateCard,
  deleteCard,
  getBanks,
} from "@/api/accounts";
import type {
  AccountCreate,
  AccountUpdate,
  CardCreate,
  CardUpdate,
} from "@/types/Accounts";

export const useAccounts = () => {
  const queryClient = useQueryClient();

  const { data: accounts, isLoading: isAccountsLoading } = useQuery({
    queryKey: ["Accounts"],
    queryFn: getAccounts,
  });

  const { data: banks, isLoading: isBanksLoading } = useQuery({
    queryKey: ["Banks"],
    queryFn: getBanks,
  });

  const { mutate: addAccount, isPending: isCreatingAccount } = useMutation({
    mutationFn: (data: AccountCreate) => createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Accounts"] });
    },
  });

  const { mutate: editAccount, isPending: isUpdatingAccount } = useMutation({
    mutationFn: ({
      accountId,
      data,
    }: {
      accountId: number;
      data: AccountUpdate;
    }) => updateAccount(accountId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Accounts"] });
    },
  });

  const { mutate: removeAccount, isPending: isDeletingAccount } = useMutation({
    mutationFn: (accountId: number) => deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Accounts"] });
    },
  });

  const { mutate: addCard, isPending: isCreatingCard } = useMutation({
    mutationFn: ({
      accountId,
      data,
    }: {
      accountId: number;
      data: CardCreate;
    }) => createCard(accountId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Accounts"] });
    },
  });

  const { mutate: editCard, isPending: isUpdatingCard } = useMutation({
    mutationFn: ({
      accountId,
      cardId,
      data,
    }: {
      accountId: number;
      cardId: number;
      data: CardUpdate;
    }) => updateCard(accountId, cardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Accounts"] });
    },
  });

  const { mutate: removeCard, isPending: isDeletingCard } = useMutation({
    mutationFn: ({
      accountId,
      cardId,
    }: {
      accountId: number;
      cardId: number;
    }) => deleteCard(accountId, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Accounts"] });
    },
  });

  return {
    accounts,
    banks,
    isAccountsLoading,
    isBanksLoading,
    addAccount,
    editAccount,
    removeAccount,
    isCreatingAccount,
    isUpdatingAccount,
    isDeletingAccount,
    addCard,
    editCard,
    removeCard,
    isCreatingCard,
    isUpdatingCard,
    isDeletingCard,
  };
};
