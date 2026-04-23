import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
interface OptionItem {
  id: number;
  name: string;
}
export function useAccount() {
  return useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const { data } = await apiClient.get<OptionItem[]>("/api/v1/accounts/");
      return {data};
    },
    placeholderData: (previousData) => previousData,
  });
}