import apiClient from "./apiClient";
import type { EvolutionPoint } from "@/types/transactions";

// En tu archivo de API
export const getEvolutionHistory = async (
  accountId?: number,
  monthId?: string,
  period: string = "1Y",
): Promise<EvolutionPoint[]> => {
  const response = await apiClient.get<EvolutionPoint[]>(
    `/api/v1/transactions/evolution/`,
    {
      params: {
        account_id: accountId,
        month_id: monthId,
        period: period,
      },
    },
  );
  return response.data;
};
