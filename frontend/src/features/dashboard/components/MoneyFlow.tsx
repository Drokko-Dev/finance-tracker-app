// src/features/dashboard/components/MoneyFlow.tsx
import { GlassCard } from "@/components/ui/GlassCard";

export const MoneyFlow = ({ className }: { className?: string }) => {
  const data = [40, 60, 45, 90, 65, 80, 50, 85, 40, 75, 55, 70]; // Datos de ejemplo

  return (
    <GlassCard className={className}>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white">Money Flow</h3>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div> Income
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div> Outcome
          </span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((val, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 w-full max-w-3"
          >
            <div
              style={{ height: `${val}%` }}
              className={`w-full rounded-full ${i % 2 === 0 ? "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"}`}
            ></div>
            <span className="text-[10px] text-slate-500">Jan</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
