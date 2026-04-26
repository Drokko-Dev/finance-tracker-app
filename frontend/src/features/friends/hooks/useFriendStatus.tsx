import { useQuery } from "@tanstack/react-query";
import { getSummarizedTransactions } from "@/api/transactions";

import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const useFriendStats = (accountId?: number, monthId?: string) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["SummarizedTransactions", accountId, monthId],
    queryFn: () => getSummarizedTransactions(undefined, undefined, 5),
  });

  const totalIncome = transactions?.total_income || 0;
  const totalExpense = transactions?.total_expense || 0;
  const totalBalance = transactions?.total_balance || 0;

  const cards = [
    {
      title: "Balance Total",
      amount: totalBalance.toLocaleString("en-ES"),
      color: "#38bdf8",
      icon: <Wallet className="w-5 h-5 text-accent" />,
      glowColor: "rgba(6, 182, 212, 0.15)",
    },
    {
      title: "Me deben",
      amount: totalIncome.toLocaleString("en-ES"),
      color: "#10b981",
      isPositive: true,
      change: "2 Personas",
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-400" />,
      glowColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Le Debo",
      amount: totalExpense.toLocaleString("en-ES"),
      color: "#f43f5e",
      isPositive: false,
      change: "3 Personas",
      icon: <ArrowUpRight className="w-5 h-5 text-rose-400" />,
      glowColor: "rgba(244, 63, 94, 0.1)",
    },
  ];

  return {
    cards,
    isLoading,
  };
};
