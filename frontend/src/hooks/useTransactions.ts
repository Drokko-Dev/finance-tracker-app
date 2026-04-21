import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types/transactions";

interface query {
  page: number;
  search?: string;
  category?: string;
  type?: string | undefined;
  account?: string | undefined;
  initialDate?: Date | undefined;
  finalDate?: Date | undefined;
  sortBy?: string;
  order?: string
}

export function useTransactions({
  page,
  search,
  category,
  type,
  account,
  initialDate,
  finalDate,
  sortBy,
  order,
}: query) {
  return useQuery({
    queryKey: [
      "transactions",
      { page, search, category, initialDate, finalDate, sortBy,  order},
    ],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>(
        "/api/v1/transactions/movimientos/",
        {
          params: {
            page,
            search,
            category,
            type,
            account,
            sort_by: sortBy,
            order: order,
            start_date: initialDate
              ? initialDate.toISOString().split("T")[0]
              : null,
            end_date: finalDate ? finalDate.toISOString().split("T")[0] : null,
          },
        },
      );
      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
