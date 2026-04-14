import { useQuery } from "@tanstack/react-query";
import {
  getSummarizedTransactions,
  getYearMonthsTransactions,
} from "@/api/transactions";
import { getAccounts } from "@/api/accounts";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { Bank } from "@/types/Accounts";
import type { YearMonth } from "@/types/transactions";

export const useDashboardStats = (accountId?: number, monthId?: string) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["SummarizedTransactions", accountId, monthId],
    queryFn: () => getSummarizedTransactions(accountId, monthId),
    enabled: !!accountId,
  });

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["Accounts"],
    queryFn: getAccounts,
  });

  const { data: yearMonths, isLoading: isLoadingYearMonths } = useQuery({
    queryKey: ["YearMonths"],
    queryFn: () => getYearMonthsTransactions(),
  });

  const bankAccounts: Bank[] = [];
  accounts?.forEach((account) => {
    bankAccounts.push({
      id: account.id,
      name: account.bank,
    });
  });

  const filterYearMonths: YearMonth[] = [];
  yearMonths?.forEach(([year, month]) => {
    const nameMonth = new Date(year, month - 1).toLocaleString("es-ES", {
      month: "long",
    });
    filterYearMonths.push({
      id: year + "-" + month,
      name: nameMonth[0].toUpperCase() + nameMonth.slice(1) + " " + year,
    });
  });

  const totalIncome =
    transactions
      ?.filter((type) => type.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const totalExpense =
    transactions
      ?.filter((type) => type.type === "expense")
      .reduce((acc, curr) => acc + Math.abs(curr.amount), 0) || 0;

  const totalBalance = totalIncome - totalExpense;

  const cards = [
    {
      title: "Balance Total",
      amount: totalBalance.toLocaleString("en-ES"), // Para que ponga las comitas (ej. 24,562)
      change: "+5.0%", // Esto podrías calcularlo después comparando meses
      isPositive: totalBalance >= 0,
      color: "#38bdf8",
      icon: <Wallet className="w-5 h-5 text-accent" />,
      glowColor: "rgba(6, 182, 212, 0.15)",
    },
    {
      title: "Ingresos",
      amount: totalIncome.toLocaleString("en-ES"),
      change: "+2.0%",
      isPositive: true,
      color: "#10b981",
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-400" />,
      glowColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Gastos",
      amount: totalExpense.toLocaleString("en-ES"),
      change: "-2.0%",
      isPositive: false,
      color: "#f43f5e",
      icon: <ArrowUpRight className="w-5 h-5 text-rose-400" />,
      glowColor: "rgba(244, 63, 94, 0.1)",
    },
  ];

  return {
    cards,
    isLoading,
    bankAccounts,
    isLoadingAccounts,
    filterYearMonths,
    isLoadingYearMonths,
  };
};
