import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Info,
  AlertCircle,
} from "lucide-react";
// 👇 Importa tu configuración desde donde la tengas guardada
import { categoryConfig } from "@/assets/categoryConfig";

// 1. TIPO DE DATOS DEL BACKEND
export interface CategoryExpense {
  category_name: string;
  total_amount: number;
}

// 2. DICCIONARIO PARA RECHARTS (Traductor de Tailwind a Hexadecimal)
// Recharts necesita hex para pintar el SVG, así que mapeamos tus colores -400.
const tailwindToHex: Record<string, string> = {
  "text-orange-400": "#fb923c",
  "text-blue-400": "#60a5fa",
  "text-purple-400": "#c084fc",
  "text-red-400": "#f87171",
  "text-pink-400": "#f472b6",
  "text-amber-400": "#fbbf24",
  "text-cyan-400": "#22d3ee",
  "text-slate-400": "#94a3b8",
  "text-gray-400": "#9ca3af",
  "text-emerald-400": "#34d399",
  "text-indigo-400": "#818cf8",
};

// 3. TOOLTIP PERSONALIZADO (Flotante oscuro)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card-bg border border-border-subtle px-4 py-2 rounded-xl shadow-2xl">
        <p className="text-sm text-text-subtle mb-1">{data.category_name}</p>
        <p className="text-lg font-bold text-text-main">
          ${data.total_amount.toLocaleString("es-CL")}
        </p>
      </div>
    );
  }
  return null;
};

export const ExpenseCategory = ({
  data,
  percentExpense,
}: {
  data: CategoryExpense[];
  percentExpense: number;
}) => {
  // Procesamos los datos para calcular porcentajes y asignar colores
  const { processedData, totalAmount } = useMemo(() => {
    if (!data || data.length === 0)
      return { processedData: [], totalAmount: 0 };

    const total = data.reduce((acc, curr) => acc + curr.total_amount, 0);
    const processed = data.map((item) => {
      const config =
        categoryConfig[item.category_name] || categoryConfig["Otros"];

      const bgClass = config.color.replace("text-", "bg-");
      const hexColor = tailwindToHex[config.color] || "#94a3b8";
      const percentage = Math.round((item.total_amount / total) * 100);

      return {
        ...item,
        percentage,
        bgClass,
        hexColor,
      };
    });
    processed.sort((a, b) => b.total_amount - a.total_amount);

    return { processedData: processed, totalAmount: total };
  }, [data]);

  const getHealthStatus = (percent: number) => {
    if (percent >= 100) {
      return {
        title: "Alerta Crítica",
        message: `Tus gastos (${percent}%) superan o igualan tus ingresos. ¡Cuidado con las deudas!`,
        icon: AlertOctagon,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
      };
    }
    if (percent >= 80) {
      return {
        title: "Riesgo Alto", // Lo diferenciamos del nivel de 100%
        message: `Tus gastos (${percent}%) se acercan peligrosamente a tus ingresos. ¡Modera tus compras!`,
        icon: AlertCircle,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
      };
    }
    if (percent >= 50) {
      return {
        title: "Presupuesto Ajustado",
        message: `Estás gastando el ${percent}% de tus ingresos. Intenta reducir gastos no esenciales.`,
        icon: AlertTriangle,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
      };
    }
    if (percent >= 30) {
      return {
        title: "Salud Financiera Estable",
        message: `Tus gastos (${percent}%) están bajo control. ¡Buen margen para ahorrar!`,
        icon: Info,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
      };
    }
    // De 0 a 29.9%
    return {
      title: "Salud Financiera Excelente",
      message: `¡Increíble! Gastas solo el ${percent}% de lo que ganas. Nivel maestro ahorrador.`,
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    };
  };

  const health = getHealthStatus(percentExpense);
  return (
    <div className="bg-card-bg border border-border-subtle rounded-3xl p-6 w-full flex flex-col shadow-xl">
      <h2 className="text-lg font-bold text-text-main tracking-tight mb-6">
        Distribución de Gastos
      </h2>

      {/* --- GRÁFICO DONUT REAL (RECHARTS) --- */}
      <div className="relative h-[220px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              innerRadius={75}
              outerRadius={100}
              paddingAngle={4}
              dataKey="total_amount"
              stroke="none"
              cornerRadius={6} // Bordes redondeados en las rebanadas
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.hexColor} />
              ))}
            </Pie>
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* TEXTO CENTRAL (Posicionado absolutamente sobre el gráfico) */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-semibold text-text-subtle tracking-wider uppercase">
            TOTAL
          </span>
          <span className="text-2xl font-extrabold text-text-main tracking-tighter mt-1">
            ${totalAmount.toLocaleString("es-CL")}
          </span>
        </div> */}
      </div>

      {/* --- LEYENDA DINÁMICA --- */}
      <div className="flex flex-col gap-3 mt-8 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
        {processedData.map((item) => (
          <div
            key={item.category_name}
            className="flex items-center justify-between group hover:bg-white/[0.02] p-1.5 -mx-1.5 rounded-lg transition-colors cursor-default"
          >
            {/* IZQUIERDA: Punto dinámico y Nombre */}
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.hexColor }}
              />
              <span className="text-[15px] font-medium text-text-subtle tracking-tight group-hover:text-text-main transition-colors">
                {item.category_name}
              </span>
            </div>

            {/* DERECHA: Porcentaje */}
            <span className="text-[15px] font-semibold text-text-main">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>

      {/* --- TARJETA DE SALUD FINANCIERA DINÁMICA --- */}
      <div
        className={`rounded-2xl border p-5 mt-8 flex gap-4 ${health.bg} ${health.border}`}
      >
        <div
          className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-card-bg shadow-sm border ${health.border}`}
        >
          <health.icon className={`w-5 h-5 ${health.color}`} />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-bold text-text-main text-[15px] tracking-tight">
            {health.title}
          </span>
          <p className="text-sm text-text-subtle mt-1 leading-relaxed">
            {health.message}
          </p>
        </div>
      </div>
    </div>
  );
};
