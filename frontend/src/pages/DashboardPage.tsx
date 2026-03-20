import { MoneyFlow } from "@/features/dashboard/components/MoneyFlow";
import { MyCards } from "@/features/dashboard/components/MyCards";
import { TransactionTable } from "@/features/dashboard/components/TransactionTable";
import { ExpenseCharts } from "@/features/dashboard/components/ExpenseCharts";

export const DashboardPage = () => {
  return (
    <div className="">
      {/* 2. Contenido Principal */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        {/* 3. El Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-8 max-w-400 mx-auto">
          {/* Fila 1: Gráfico de Barras y Tarjeta de Crédito */}
          <MoneyFlow className="col-span-12 lg:col-span-8" />
          <MyCards className="col-span-12 lg:col-span-4" />

          {/* Fila 2: Tabla de Transacciones y Gráfico de Gastos (Circular) */}
          <TransactionTable className="col-span-12 lg:col-span-8" />
          <ExpenseCharts className="col-span-12 lg:col-span-4" />
        </div>

        {/* Espaciado extra al final */}
        <div className="h-20"></div>
      </main>
    </div>
  );
};
