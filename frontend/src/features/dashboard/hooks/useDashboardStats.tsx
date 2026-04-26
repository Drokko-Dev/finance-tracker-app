import { useQuery } from "@tanstack/react-query";
import {
  getSummarizedTransactions,
  getYearMonthsTransactions,
} from "@/api/transactions";
import { getAccounts } from "@/api/accounts";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { Bank } from "@/types/Accounts";
import type { YearMonth } from "@/types/transactions";

export const useDashboardStats = (accountId?: number, monthId?: string) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["SummarizedTransactions", accountId, monthId],
    queryFn: () => getSummarizedTransactions(accountId, monthId, 5),
  });

  const totalIncome = transactions?.total_income || 0;
  const totalExpense = transactions?.total_expense || 0;
  const totalBalance = transactions?.total_balance || 0;
  const percentExpense =
    totalIncome > 0
      ? Number(((totalExpense / totalIncome) * 100).toFixed(1))
      : totalExpense > 0
        ? 100
        : 0;

  const recentTransactions =
    transactions?.recent_transactions?.map((t: any) => ({
      id: t.id.toString(),
      title: t.description,
      category: t.category_name,
      date: new Date(t.created_at).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
      accountName: t.account_name,
      amount: t.type === "expense" ? -Math.abs(t.amount) : t.amount,
      type: t.type,
    })) || [];

  const categories_expense = transactions?.category_summary;

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

  const cards = [
    {
      title: "Balance Total",
      amount: totalBalance.toLocaleString("en-ES"),
      change: "+5.0%",
      iconChange:
        totalBalance >= 0 ? (
          <TrendingUp size={12} />
        ) : (
          <TrendingDown size={12} />
        ),
      subtitle: "Ingresos - gasto neto",
      isPositive: totalBalance >= 0,
      color: "#38bdf8",
      icon: <Wallet className="w-5 h-5 text-accent" />,
      glowColor: "rgba(6, 182, 212, 0.15)",
    },
    {
      title: "Ingresos",
      amount: totalIncome.toLocaleString("en-ES"),
      subtitle: "Solo ingresos reales",
      change: "+2.0%",
      iconChange: <TrendingUp size={12} />,
      isPositive: true,
      color: "#10b981",
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-400" />,
      glowColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Gastos",
      amount: totalExpense.toLocaleString("en-ES"),
      subtitle: "Gasto neto este mes",
      change: "-2.0%",
      iconChange: <TrendingDown size={12} />,
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
    recentTransactions,
    categories_expense,
    percentExpense,
  };
};
