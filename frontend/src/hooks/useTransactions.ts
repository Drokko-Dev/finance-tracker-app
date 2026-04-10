import apiClient from '@/api/apiClient';
import { useQuery } from '@tanstack/react-query';
import type { Transaction } from "../types/transactions";

interface query {
  page: number;
  search?: string;
  category?: string;
}


export function useTransactions({page, search, category}:query) {
  return useQuery({
    // Importante: La caché depende de estos valores
    queryKey: ['transactionss', { page, search, category: category }],
    queryFn: async () => {
      const { data } = await apiClient.get<Transaction[]>('/api/v1/transactions/movimientos/', {
        params: { page, search, category},
        
      });
      
      return data;
    },
    // Mantener los datos anteriores mientras carga los nuevos (evita parpadeos)
    placeholderData: (previousData) => previousData, 
  });
}