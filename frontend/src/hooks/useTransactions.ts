import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types/transactions";

interface query {
  page: number;
  search?: string;
  category?: string;
  initialDate: Date | undefined;
  finalDate: Date | undefined;
}

export function useTransactions({
  page,
  search,
  category,
  initialDate, // Viene del estado de tu componente
  finalDate,
}: query) {
  return useQuery({
    queryKey: ["transactions", { page, search, category, initialDate, finalDate }],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>(
        "/api/v1/transactions/movimientos/",
        {
          params: { 
            page, 
            search, 
            category,
            // Mapeo de nombres y formateo a YYYY-MM-DD
            start_date: initialDate ? initialDate.toISOString().split('T')[0] : null,
            end_date: finalDate ? finalDate.toISOString().split('T')[0] : null,
          },
        },
      );
      return data;
    },
    placeholderData: (previousData) => previousData,
  });
}
