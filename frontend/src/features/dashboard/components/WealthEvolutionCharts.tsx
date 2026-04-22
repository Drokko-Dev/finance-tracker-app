import { useState } from "react";
import {
  Area,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getEvolutionHistory } from "@/api/wealthEvolution";
import type { EvolutionPoint } from "@/types/transactions";
import type { WealthEvolutionChartProps } from "@/types/wealthEvolution";

// Datos de prueba ampliados (Incluye "previousAmount" para la línea punteada gris)
const data = [
  { month: "Ene 2023", amount: 12000 },
  { month: "Feb 2023", amount: 15000 },
  { month: "Mar 2023", amount: 13500 },
  { month: "Abr 2023", amount: 19000 },
  { month: "May 2023", amount: 17500 },
  { month: "Jun 2023", amount: 23000 },
  { month: "Jul 2023", amount: 26000 },
  { month: "Ago 2023", amount: 24562 },
  { month: "Sep 2023", amount: 30000 },
];

// 🎨 COMPONENTE CUSTOM PARA EL TOOLTIP (La cajita negra flotante)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card-bg border border-border-subtle px-4 py-2 rounded-xl shadow-2xl">
        <p className="text-sm text-principal mb-1">{label}</p>
        <p className="text-lg font-bold text-text-main">
          ${payload[0].value.toLocaleString("en-ES")}
        </p>
      </div>
    );
  }
  return null;
};

export const WealthEvolutionChart = ({
  accountId,
  monthId,
}: WealthEvolutionChartProps) => {
  const [period, setPeriod] = useState("1Y");
  const periodOptions = ["1M", "3M", "1Y"];

  const { data: chartData, isLoading } = useQuery<EvolutionPoint[]>({
    // La caché se separa por cuenta y por filtro de tiempo
    queryKey: ["EvolutionHistory", accountId, monthId, period],
    queryFn: () => getEvolutionHistory(accountId, monthId, period),
  });

  const gradientOffset = () => {
    // Si chartData está vacío, devolvemos 0 para evitar errores
    if (!chartData || chartData.length === 0) return 0;

    const dataMax = Math.max(...chartData.map((i) => i.amount));
    const dataMin = Math.min(...chartData.map((i) => i.amount));

    // Si todo es negativo, el offset es 0 (todo rojo)
    if (dataMax <= 0) return 0;
    // Si todo es positivo, el offset es 1 (todo cyan)
    if (dataMin >= 0) return 1;

    // Calcula el punto exacto de corte
    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="bg-card-bg border border-border-subtle rounded-2xl p-5 sm:p-6 flex flex-col gap-6 w-full shadow-lg">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-main">
            Evolución del Patrimonio
          </h2>
          <p className="text-sm text-text-subtle">
            Crecimiento constante a lo largo del tiempo
          </p>
        </div>

        {/* --- SELECTOR DE TIEMPO --- */}
        <div className="flex gap-0.5 items-center bg-card-bg border border-border-subtle rounded-xl p-1">
          {periodOptions.map((tf) => (
            <button
              key={tf}
              onClick={() => setPeriod(tf)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                period === tf
                  ? "bg-text-main/10 text-text-main shadow-sm"
                  : "text-text-subtle hover:text-text-main hover:bg-white/5"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRÁFICO --- */}
      <div className="w-full h-[250px] sm:h-[300px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              {/* 1. Degradado para el RELLENO (Área) */}
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#06b6d4" stopOpacity={0.3} />{" "}
                {/* Cyan Arriba */}
                <stop offset={off} stopColor="#f43f5e" stopOpacity={0.3} />{" "}
                {/* Rose/Rojo Abajo */}
              </linearGradient>

              {/* 2. Degradado para la LÍNEA (Borde) */}
              <linearGradient id="splitStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#06b6d4" stopOpacity={1} />
                <stop offset={off} stopColor="#f43f5e" stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" hide={true} />

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-text-subtle)"
              strokeOpacity={0.2}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#06b6d4",
                strokeWidth: 1.5,
                strokeDasharray: "5 5",
              }}
            />

            <Area
              type="linear"
              dataKey="amount"
              stroke="url(#splitStroke)"
              strokeWidth={3}
              fill="url(#splitColor)"
              // 1. PUNTO NORMAL DINÁMICO
              dot={(props: any) => {
                const { cx, cy, payload, key } = props;
                // Prevenimos errores si el gráfico aún está cargando
                if (cx == null || cy == null) return null;

                // Evaluamos si el monto es negativo
                const isNegative = payload.amount < 0;

                return (
                  <circle
                    key={key}
                    cx={cx}
                    cy={cy}
                    r={4}
                    strokeWidth={2}
                    fill="var(--color-main-bg)"
                    // Pintamos el borde Rojo si es negativo, Cyan si es positivo
                    stroke={isNegative ? "#f43f5e" : "#06b6d4"}
                  />
                );
              }}
              // 2. PUNTO ACTIVO (HOVER) DINÁMICO
              activeDot={(props: any) => {
                const { cx, cy, payload } = props;
                if (cx == null || cy == null) return null;

                const isNegative = payload.amount < 0;

                return (
                  <circle
                    key={`active-dot-${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={6} // Más grande en hover
                    strokeWidth={2}
                    fill="var(--color-main-bg)"
                    stroke={isNegative ? "#f43f5e" : "#06b6d4"}
                  />
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
