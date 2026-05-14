// useFilterOptions.ts
import { useQuery } from "@tanstack/react-query";
import { getYearMonthsTransactions } from "@/api/transactions";
import { getAccounts } from "@/api/accounts";
import type { Bank } from "@/types/Accounts";
import type { YearMonth } from "@/types/transactions";

export const useFilterOptions = () => {
  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["Accounts"],
    queryFn: getAccounts,
  });

  const { data: yearMonths, isLoading: isLoadingYearMonths } = useQuery({
    queryKey: ["YearMonths"],
    queryFn: getYearMonthsTransactions,
  });

  const bankAccounts: Bank[] =
    accounts?.map((a) => ({ id: a.id, name: a.bank })) ?? [];

  const filterYearMonths: YearMonth[] =
    yearMonths?.map(([year, month]) => {
      const nameMonth = new Date(year, month - 1).toLocaleString("es-ES", {
        month: "long",
      });
      return {
        id: `${year}-${month}`,
        name: nameMonth[0].toUpperCase() + nameMonth.slice(1) + " " + year,
      };
    }) ?? [];

  return {
    bankAccounts,
    isLoadingAccounts,
    filterYearMonths,
    isLoadingYearMonths,
  };
};
