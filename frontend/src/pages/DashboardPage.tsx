import { FilterDashboard } from "@/features/dashboard/components/FilterDashboard";
import { MyCards } from "@/features/dashboard/components/MyCards";
import { TransactionList } from "@/features/dashboard/components/TransactionList";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { Calendar, Wallet } from "lucide-react";
import { useEffect } from "react";

const months = [
  { id: 1, name: "Agosto 2023" },
  { id: 2, name: "Septiembre 2023" },
  { id: 3, name: "Octubre 2023" },
];

const account = [
  { id: 1, name: "Banco Chile" },
  { id: 2, name: "Banco Estado" },
  { id: 3, name: "Banco Santander" },
];

export const DashboardPage = () => {
  const { cards, bankAccounts } = useDashboardStats();
  useEffect(() => {
    console.log("Cuentas disponibles:", bankAccounts);
  }, [bankAccounts]);
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
          <FilterDashboard
            options={bankAccounts}
            icon={<Wallet className="w-4 h-4 text-text-subtle" />}
          />
          <FilterDashboard
            options={months}
            icon={<Calendar className="w-4 h-4 text-text-subtle" />}
          />
        </div>
      </header>
      <main className="">
        <MyCards cards={cards} />
        <TransactionList />
      </main>
    </div>
  );
};
