import { FilterDashboard } from "@/features/dashboard/components/FilterDashboard";
import { MyCards } from "@/components/MyCards";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Calendar, Wallet, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Bank } from "@/types/Accounts";
import { WealthEvolutionChart } from "@/features/dashboard/components/WealthEvolutionCharts";
import { RecentTransactions } from "@/features/dashboard/components/RecentTransactions";
import { ExpenseCategory } from "@/features/dashboard/components/ExpenseCategory";
import { useFilterOptions } from "@/features/dashboard/hooks/useFilterOptions";

interface FilterOptions {
  id: number | string;
  name: string;
}

export const DashboardPage = () => {
  const [selectedAccount, setSelectedAccount] = useState<FilterOptions | null>(
    null,
  );
  const [selectedMonth, setSelectedMonth] = useState<FilterOptions | null>(
    null,
  );

  const {
    bankAccounts,
    isLoadingAccounts,
    filterYearMonths,
    isLoadingYearMonths,
  } = useFilterOptions();

  const accountOptions = [
    { id: "ALL", name: "Cuentas Bancarias" },
    ...bankAccounts,
  ];
  const yearMonthOptions = [
    { id: "ALL", name: "Año Mes" },
    ...filterYearMonths,
  ];

  // Inicialización: solo cuando llegan los datos y no hay selección aún
  useEffect(() => {
    if (bankAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accountOptions[0]); // ALL por defecto
    }
  }, [bankAccounts]);

  useEffect(() => {
    if (filterYearMonths.length > 0 && !selectedMonth) {
      // ✅ Último mes (más reciente), no el primero
      setSelectedMonth(filterYearMonths[0]);
    }
  }, [filterYearMonths]);

  // Valores a enviar a la API
  const accountIdToSend =
    selectedAccount?.id === "ALL" ? undefined : (selectedAccount?.id as number);

  const lastMonth = filterYearMonths[0]?.id as string | undefined;
  const yearMonthIdToSend =
    selectedMonth?.id === "ALL" ? lastMonth : (selectedMonth?.id as string);

  const { cards, categories_expense, percentExpense } = useDashboardStats(
    accountIdToSend,
    yearMonthIdToSend,
  );

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-text-main)]">
            Resumen Financiero
          </h1>
          <p className="text-sm text-text-subtle">
            Monitorea tu salud financiera y evolución.
          </p>
        </div>
        <div className="flex sm:flex-row flex-col items-center gap-2">
          {isLoadingAccounts ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-text-subtle">
              <Loader2 className="w-4 h-4 animate-spin" />
              Cargando cuentas...
            </div>
          ) : selectedAccount ? (
            <FilterDashboard
              options={accountOptions}
              icon={<Wallet className="w-4 h-4 text-text-subtle" />}
              value={selectedAccount}
              onChange={(opcion) => setSelectedAccount(opcion as Bank)}
              allOptionLabel="Cuentas Bancarias"
            />
          ) : null}{" "}
          {isLoadingYearMonths ? (
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-text-subtle">
              <Loader2 className="w-4 h-4 animate-spin" />
              Cargando meses...
            </div>
          ) : selectedMonth ? (
            <FilterDashboard
              options={yearMonthOptions}
              icon={<Calendar className="w-4 h-4 text-text-subtle" />}
              value={selectedMonth}
              onChange={setSelectedMonth}
              allOptionLabel="Meses"
            />
          ) : null}{" "}
        </div>
      </header>
      <main className="flex flex-col gap-6">
        <MyCards cards={cards} />
        <WealthEvolutionChart
          accountId={accountIdToSend}
          monthId={yearMonthIdToSend}
        />
        <div className="flex flex-col lg:flex-row gap-6">
          <ExpenseCategory
            data={categories_expense || []}
            percentExpense={percentExpense}
          />
          <RecentTransactions
            accountId={accountIdToSend}
            monthId={yearMonthIdToSend}
          />
        </div>
      </main>
    </div>
  );
};
