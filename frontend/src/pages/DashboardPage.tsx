import { FilterDashboard } from "@/features/dashboard/components/FilterDashboard";
import { MyCards } from "@/features/dashboard/components/MyCards";
import { TransactionList } from "@/features/dashboard/components/TransactionList";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Calendar, Wallet, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Bank } from "@/types/Accounts";

const months = [
  { id: 1, name: "Agosto 2023" },
  { id: 2, name: "Septiembre 2023" },
  { id: 3, name: "Octubre 2023" },
];

interface FilterOptions {
  id: number | string;
  name: string;
}

export const DashboardPage = () => {
  const [selectedAccount, setSelectedAccount] = useState<Bank | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<FilterOptions | null>(
    null,
  );
  const {
    cards,
    bankAccounts,
    isLoadingAccounts,
    filterYearMonths,
    isLoadingYearMonths,
  } = useDashboardStats(selectedAccount?.id, selectedMonth?.id as string);

  useEffect(() => {
    if (bankAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(bankAccounts[0]); // Selecciona "Santander" por defecto
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
              options={bankAccounts}
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
              options={filterYearMonths}
              icon={
                <Calendar className="w-4 h-4 text-[var(--color-text-subtle)]" />
              }
              value={selectedMonth} // <- Le pasamos el valor
              onChange={setSelectedMonth} // <- Le pasamos la función para cambiarlo
            />
          ) : null}{" "}
        </div>
      </header>
      <main className="">
        <MyCards cards={cards} />
        <TransactionList />
      </main>
    </div>
  );
};
