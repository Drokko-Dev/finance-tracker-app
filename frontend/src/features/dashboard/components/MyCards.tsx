// src/features/dashboard/components/MyCards.tsx
import { GlassCard } from "@/components/ui/GlassCard";

export const MyCards = ({ className }: { className?: string }) => (
  <GlassCard className={className}>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-bold text-white">My Cards</h3>
      <button className="text-xs text-slate-400 hover:text-white">
        Show All →
      </button>
    </div>

    <div className="relative overflow-hidden bg-linear-to-br from-orange-400/20 via-purple-500/20 to-blue-600/20 border border-white/10 rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between items-start mb-12">
        <span className="font-bold tracking-widest text-lg">Fundly</span>
        <span className="text-xs text-white/40">•••• 3456</span>
      </div>
      <p className="text-xs text-white/50 uppercase tracking-widest">
        Total Balance
      </p>
      <p className="text-2xl font-bold mt-1">$ 86,320.25 USD</p>

      {/* Círculos decorativos de fondo */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-6">
      <button className="py-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-medium">
        ⇄ Send
      </button>
      <button className="py-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-medium">
        📥 Request
      </button>
    </div>
  </GlassCard>
);
