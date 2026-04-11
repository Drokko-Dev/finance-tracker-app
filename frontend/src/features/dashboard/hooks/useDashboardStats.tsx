import { useQuery } from "@tanstack/react-query";
import { getSummarizedTransactions, getTransactions } from "@/api/transactions";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";

export const useDashboardStats = () => {
  /* const { data: transactions, isLoading } = useQuery({
    queryKey: ["SummarizedTransactions"],
    queryFn: getSummarizedTransactions,
  }); */
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["Transactions"],
    queryFn: getTransactions,
  });

  // 2. Calculamos los montos reales (asumiendo que tus transacciones
  // tienen algún campo como 'type' o si 'amount' es positivo/negativo)
  const totalIncome =
    transactions
      ?.filter((type) => type.type === "income") // Ajusta esta lógica a tu modelo de BD
      .reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const totalExpense =
    transactions
      ?.filter((type) => type.type === "expense")
      .reduce((acc, curr) => acc + Math.abs(curr.amount), 0) || 0;

  const totalBalance = totalIncome - totalExpense;

  // 3. Armamos tu JSON, pero inyectando los montos reales
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

  return { cards, isLoading };
};
