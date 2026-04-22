import apiClient from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";
interface OptionItem {
  id: number;
  name: string;
}
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await apiClient.get<OptionItem[]>("/api/v1/categories/");
      return {data};
    },
    placeholderData: (previousData) => previousData,
  });
}
