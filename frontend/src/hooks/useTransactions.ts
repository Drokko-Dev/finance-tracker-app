import apiClient from '@/api/apiClient';
import { useQuery } from '@tanstack/react-query';

export function useTransactions(page: number, search: string, category: string) {
  return useQuery({
    // Importante: La caché depende de estos valores
    queryKey: ['transactions', { page, search, category }],
    queryFn: async () => {
      const { data } = await apiClient.get('/transactions', {
        params: { page, search, category },
      });
      return data;
    },
    // Mantener los datos anteriores mientras carga los nuevos (evita parpadeos)
    placeholderData: (previousData) => previousData, 
  });
}