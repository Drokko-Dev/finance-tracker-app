import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryConfig } from "@/assets/categoryConfig";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import type { WealthEvolutionChartProps } from "@/types/wealthEvolution";
import { useEffect } from "react";

export interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  accountName: string;
  amount: number;
  type: "income" | "expense";
}

export const RecentTransactions = ({
  accountId,
  monthId,
}: WealthEvolutionChartProps) => {
  const { recentTransactions, categories_expense } = useDashboardStats(
    accountId,
    monthId,
  );
  useEffect(() => {
    console.log("Transacciones recientes actualizadas:", recentTransactions);
    console.log("Resumen por categoría:", categories_expense);
  }, [recentTransactions, categories_expense]);

  return (
    <div className=" bg-card-bg border border-border-subtle rounded-2xl p-6 w-full text-white font-sans shadow-lg">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-text-main tracking-wide">
          Últimos Movimientos
        </h2>
        <Link
          to={"/movimientos"}
          className="text-sm text-text-subtle hover:text-text-main transition-colors flex items-center gap-1 group cursor-pointer"
        >
          Ver todos
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-3">
        {recentTransactions.map((tx) => {
          const config = categoryConfig[tx.category] || categoryConfig["Otros"];
          const Icon = config.icon;

          const formattedAmount = Math.abs(tx.amount).toLocaleString("es-CL");
          const isIncome = tx.type === "income";

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between group cursor-pointer hover:bg-hover-movement -mx-3 p-3 rounded-lg transition-colors border-b border-border-subtle"
            >
              <div className="flex items-center gap-4">
                {/* ICONO CON CÍRCULO */}
                <div
                  className={`w-12 h-12 hidden sm:flex rounded-full items-center justify-center border ${config.bg} ${config.border}`}
                >
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                {/* DETALLES */}
                <div className="flex flex-col">
                  <span className="font-semibold text-text-main text-[15px]">
                    {tx.title}
                  </span>
                  <span className="text-sm text-text-subtle mt-0.5">
                    {tx.date}
                  </span>
                  <span className="text-sm text-text-subtle mt-0.5">
                    {tx.accountName}
                  </span>
                </div>
              </div>

              {/* MONTO */}
              <div
                className={`font-bold text-[15px] ${isIncome ? "text-income" : "text-expense"}`}
              >
                {isIncome ? "+" : "-"}${formattedAmount}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
