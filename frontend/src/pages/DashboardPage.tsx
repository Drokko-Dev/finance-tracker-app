import { FilterDashboard } from "@/features/dashboard/components/FilterDashboard";
import { MyCards } from "@/features/dashboard/components/MyCards";
import { TransactionList } from "@/features/dashboard/components/TransactionList";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Calendar, Wallet, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Bank } from "@/types/Accounts";
import { WealthEvolutionChart } from "@/features/dashboard/components/WealthEvolutionCharts";

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
  const pruebaMeses = [
    { id: "ALL", name: "Cuentas Bancarias" },
    { id: "2024-01", name: "Enero 2024" },
    { id: "2024-02", name: "Febrero 2024" },
    { id: "2024-03", name: "Marzo 2024" },
    { id: "2024-04", name: "Abril 2024" },
    { id: "2024-05", name: "Mayo 2024" },
    { id: "2024-06", name: "Junio 2024" },
    { id: "2024-07", name: "Julio 2024" },
    { id: "2024-08", name: "Agosto 2024" },
    { id: "2024-09", name: "Septiembre 2024" },
    { id: "2024-10", name: "Octubre 2024" },
    { id: "2024-11", name: "Noviembre 2024" },
    { id: "2024-12", name: "Diciembre 2024" },
  ];

  useEffect(() => {
    if (bankAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accountOptions[0]); // Selecciona "Santander" por defecto
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
          {/* 2. LA MAGIA: Condicionamos el renderizado del filtro */}
          {isLoadingAccounts ? (
            // Mientras carga, mostramos un pequeño texto o spinner para que no salte la pantalla
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-subtle)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Cargando cuentas...
            </div>
          ) : selectedAccount ? (
            // Cuando termina de cargar Y tiene cuentas, dibujamos el filtro REAL
            <FilterDashboard
              options={accountOptions}
              icon={
                <Wallet className="w-4 h-4 text-[var(--color-text-subtle)]" />
              }
              value={selectedAccount} // <- Le pasamos el valor
              onChange={(opcion) => setSelectedAccount(opcion as Bank)} // <- Le pasamos la función para cambiarlo
            />
          ) : null}{" "}
          {isLoadingYearMonths ? (
            // Mientras carga, mostramos un pequeño texto o spinner para que no salte la pantalla
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-subtle)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Cargando meses...
            </div>
          ) : selectedMonth ? (
            // Cuando termina de cargar Y tiene cuentas, dibujamos el filtro REAL
            <FilterDashboard
              options={yearMonthOptions}
              icon={
                <Calendar className="w-4 h-4 text-[var(--color-text-subtle)]" />
              }
              value={selectedMonth} // <- Le pasamos el valor
              onChange={setSelectedMonth} // <- Le pasamos la función para cambiarlo
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
      </main>
    </div>
  );
};
