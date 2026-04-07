import { DateSelector } from "@/features/dashboard/components/DateSelector";
import { MyCards } from "@/features/dashboard/components/MyCards";
import { TransactionList } from "@/features/dashboard/components/TransactionList";
import { Wallet, ArrowDownLeft, ArrowUpRight } from "lucide-react";

const cards = [
  {
    title: "Balance Total",
    amount: "24,562",
    change: "+12.5%",
    isPositive: true,
    color: "#38bdf8", // Tu cian/azul principal
    icon: <Wallet className="w-5 h-5 text-[var(--color-accent)]" />,
    glowColor: "rgba(6, 182, 212, 0.15)", // Un resplandor basado en tu acento
  },
  {
    title: "Ingresos",
    amount: "4,250",
    change: "+8.2%",
    isPositive: true,
    color: "#10b981", // Esmeralda para ingresos
    icon: <ArrowDownLeft className="w-5 h-5 text-emerald-400" />,
    glowColor: "rgba(16, 185, 129, 0.1)",
  },
  {
    title: "Gastos",
    amount: "1,850",
    change: "-2.1%",
    isPositive: false,
    color: "#f43f5e", // Rose para gastos
    icon: <ArrowUpRight className="w-5 h-5 text-rose-400" />,
    glowColor: "rgba(244, 63, 94, 0.1)",
  },
];

export const DashboardPage = () => {
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
        <DateSelector />
      </header>
      <main className="">
        <MyCards cards={cards} />
        <TransactionList />
      </main>
    </div>
  );
};
