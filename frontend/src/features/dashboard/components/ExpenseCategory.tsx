import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShieldCheck } from "lucide-react";
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

export const ExpenseCategory = ({ data }: { data: CategoryExpense[] }) => {
  // Procesamos los datos para calcular porcentajes y asignar colores
  const { processedData, totalAmount } = useMemo(() => {
    if (!data || data.length === 0)
      return { processedData: [], totalAmount: 0 };

    const total = data.reduce((acc, curr) => acc + curr.total_amount, 0);

    const processed = data.map((item) => {
      // Buscamos la config de la categoría (o usamos "Otros" si no existe)
      const config =
        categoryConfig[item.category_name] || categoryConfig["Otros"];

      // Convertimos el "text-orange-400" a "bg-orange-400" para el punto de la leyenda
      const bgClass = config.color.replace("text-", "bg-");

      // Obtenemos el hex para Recharts
      const hexColor = tailwindToHex[config.color] || "#94a3b8";

      // Calculamos el porcentaje
      const percentage = Math.round((item.total_amount / total) * 100);

      return {
        ...item,
        percentage,
        bgClass,
        hexColor,
      };
    });

    // Ordenamos de mayor a menor gasto para que el gráfico se vea mejor
    processed.sort((a, b) => b.total_amount - a.total_amount);

    return { processedData: processed, totalAmount: total };
  }, [data]);

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
      <div className="flex flex-col gap-3 mt-8">
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

      {/* --- TARJETA DE SALUD FINANCIERA --- */}
      <div className="rounded-2xl bg-principal/5 border border-principal/10 p-5 mt-8 flex gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-principal/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-principal" />
        </div>
        <div className="flex-1 flex flex-col">
          <span className="font-bold text-text-main text-[15px] tracking-tight">
            Salud Financiera Excelente
          </span>
          <p className="text-sm text-text-subtle mt-1 leading-relaxed">
            Tus gastos representan menos del 50% de tus ingresos este mes.
            ¡Sigue así!
          </p>
        </div>
      </div>
    </div>
  );
};
