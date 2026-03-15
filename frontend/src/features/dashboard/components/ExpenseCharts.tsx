import { GlassCard } from "@/components/ui/GlassCard";
import { TrendingUp } from "lucide-react";

export const ExpenseCharts = ({ className }: { className?: string }) => (
  <GlassCard className={className}>
    <h3 className="text-xl font-bold mb-6">Expenses Breakdown</h3>

    {/* Representación visual de un gráfico circular simplificado */}
    <div className="relative w-48 h-48 mx-auto mb-8">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="stroke-blue-500/20"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="stroke-blue-500"
          strokeWidth="3"
          strokeDasharray="60, 100"
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
        />
        <path
          className="stroke-orange-500"
          strokeWidth="3"
          strokeDasharray="30, 100"
          strokeDashoffset="-60"
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black">72%</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest">
          Spent
        </span>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <span className="text-sm">Housing</span>
        </div>
        <span className="font-bold text-sm">$ 2,500.00</span>
      </div>
      <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
          <span className="text-sm">Food</span>
        </div>
        <span className="font-bold text-sm">$ 850.20</span>
      </div>
    </div>
  </GlassCard>
);
