import { DateSelector } from "@/features/dashboard/components/DateSelector";
import { MyCards } from "@/features/dashboard/components/MyCards";

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-text-main)]">
            Resumen Financiero
          </h1>
          <p className="text-sm text-text-subtle">
            Monitorea tu salud financiera y evolución.
          </p>
        </div>
        <DateSelector />
      </header>
      <main className="">
        <MyCards />
      </main>
    </div>
  );
};
