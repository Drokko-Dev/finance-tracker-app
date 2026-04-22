import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categoryConfig } from "@/features/dashboard/assets/categoryConfig";

export interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  accountName: string;
  amount: number;
  type: "income" | "expense";
}

// 3. DATOS DE PRUEBA (Simulando lo que llega del backend)
const recentTransactions: Transaction[] = [
  {
    id: "1",
    title: "Compra de Supermercado",
    category: "Alimentos",
    date: "Hoy, 14:30",
    accountName: "Tarjeta de Crédito",
    amount: -125500,
    type: "expense",
  },
  {
    id: "2",
    title: "Nómina Quincenal",
    category: "Ingreso",
    date: "Ayer, 09:00",
    accountName: "Cuenta Principal",
    amount: 2100000,
    type: "income",
  },
  {
    id: "3",
    title: "Suscripción Software",
    category: "Fijos",
    date: "12 Sep, 10:15",
    accountName: "Tarjeta Virtual",
    amount: -19990,
    type: "expense",
  },
  {
    id: "4",
    title: "Comida para Bobby",
    category: "Mascotas",
    date: "10 Sep, 18:00",
    accountName: "Cuenta Principal",
    amount: -45200,
    type: "expense",
  },
  {
    id: "5",
    title: "Fondo de Emergencia",
    category: "Ahorro",
    date: "01 Sep, 12:00",
    accountName: "Portafolio",
    amount: -150000,
    type: "expense",
  }, // El ahorro sale de la cuenta, por eso es negativo
];

export const RecentTransactions = () => {
  // Tomamos solo las últimas 5
  const displayTransactions = recentTransactions.slice(0, 5);

  return (
    <div className=" bg-card-bg border border-border-subtle rounded-2xl p-6 w-full max-w-2xl text-white font-sans shadow-lg">
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
        {displayTransactions.map((tx) => {
          // Buscamos la configuración visual de la categoría (si no existe, usamos 'Otros')
          const config = categoryConfig[tx.category] || categoryConfig["Otros"];
          const Icon = config.icon;

          // Formateamos el número a estilo Chileno (puntos para miles)
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
