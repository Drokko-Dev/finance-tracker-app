import { FilterDashboard } from "@/features/dashboard/components/FilterDashboard";
import { MyCards } from "@/features/dashboard/components/MyCards";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Calendar, Wallet, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Bank } from "@/types/Accounts";
import { WealthEvolutionChart } from "@/features/dashboard/components/WealthEvolutionCharts";
import { RecentTransactions } from "@/features/dashboard/components/RecentTransactions";

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
  const accountIdToSend =
    selectedAccount?.id === "ALL" ? undefined : (selectedAccount?.id as number);
  const yearMonthIdToSend =
    selectedMonth?.id === "ALL" ? undefined : (selectedMonth?.id as string);
  const {
    cards,
    bankAccounts,
    isLoadingAccounts,
    filterYearMonths,
    isLoadingYearMonths,
  } = useDashboardStats(accountIdToSend, yearMonthIdToSend);
  const accountOptions = [
    { id: "ALL", name: "Cuentas Bancarias" },
    ...bankAccounts,
  ];
  const yearMonthOptions = [
    { id: "ALL", name: "Año Mes" },
    ...filterYearMonths,
  ];

  useEffect(() => {
    if (bankAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accountOptions[0]);
    }
    if (filterYearMonths && filterYearMonths.length > 0 && !selectedMonth) {
      setSelectedMonth(filterYearMonths[0]);
    }
  }, [bankAccounts, selectedAccount, filterYearMonths, selectedMonth]);

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
        <RecentTransactions
          accountId={accountIdToSend}
          monthId={yearMonthIdToSend}
        />
      </main>
    </div>
  );
};
