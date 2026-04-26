import { useState } from "react";
import {
  Area,
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
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

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
  const [period, setPeriod] = useState("1M");
  const periodOptions = ["1M", "3M", "1Y"];

  const { data: chartData = [], isLoading } = useQuery<EvolutionPoint[]>({
    queryKey: ["EvolutionHistory", accountId, monthId, period],
    queryFn: () => getEvolutionHistory(accountId, monthId, period),
  });

  const gradientOffset = () => {
    if (!chartData || chartData.length === 0) return 0;

    const dataMax = Math.max(...chartData.map((i) => i.amount));
    const dataMin = Math.min(...chartData.map((i) => i.amount));

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="bg-card-bg border border-border-subtle rounded-2xl p-5 sm:p-6 flex flex-col gap-6 w-full shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-main">
            Flujo de Gastos
          </h2>
          <p className="text-sm text-text-subtle">
            Revisa tus gastos a lo largo del tiempo
          </p>
        </div>

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
      <div className="w-full h-62.5 sm:h-75 mt-2">
        {isLoading || chartData.length === 0 ? (
          <LoadingSpinner message="Cargando evolución..." />
        ) : (
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
                  <stop
                    offset={off}
                    stopColor="#f43f5e"
                    stopOpacity={0.3}
                  />{" "}
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
                dot={(props: any) => {
                  const { cx, cy, payload, key } = props;
                  if (cx == null || cy == null) return null;

                  const isNegative = payload.amount < 0;

                  return (
                    <circle
                      key={key}
                      cx={cx}
                      cy={cy}
                      r={4}
                      strokeWidth={2}
                      fill="var(--color-main-bg)"
                      stroke={isNegative ? "#f43f5e" : "#06b6d4"}
                    />
                  );
                }}
                activeDot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (cx == null || cy == null) return null;

                  const isNegative = payload.amount < 0;

                  return (
                    <circle
                      key={`active-dot-${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r={6}
                      strokeWidth={2}
                      fill="var(--color-main-bg)"
                      stroke={isNegative ? "#f43f5e" : "#06b6d4"}
                    />
                  );
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
