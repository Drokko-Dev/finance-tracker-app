// src/features/dashboard/components/TransactionTable.tsx
import { GlassCard } from "@/components/ui/GlassCard";

const transactions = [
  {
    name: "Spotify",
    amount: "- $18.99",
    date: "Wed 1:00pm",
    cat: "Subscriptions",
    color: "bg-green-500",
  },
  {
    name: "Stripe",
    amount: "+ $120.00",
    date: "Wed 10:45am",
    cat: "Income",
    color: "bg-blue-600",
  },
  {
    name: "A Coffee",
    amount: "- $4.50",
    date: "Wed 3:20am",
    cat: "Food and dining",
    color: "bg-slate-500",
  },
];

export const TransactionTable = ({ className }: { className?: string }) => (
  <GlassCard className={className}>
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-xl font-bold">Transaction history</h3>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-white/5 rounded-xl text-xs border border-white/5">
          Select dates
        </button>
        <button className="px-4 py-2 bg-white/5 rounded-xl text-xs border border-white/5">
          Apply filter
        </button>
      </div>
    </div>

    <div className="space-y-6">
      {transactions.map((t, i) => (
        <div
          key={i}
          className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-xl shadow-lg`}
            >
              {t.name[0]}
            </div>
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-xs text-slate-500">{t.date}</p>
            </div>
          </div>
          <p
            className={`font-bold ${t.amount.includes("+") ? "text-green-400" : "text-white"}`}
          >
            {t.amount}
          </p>
          <span className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/5 text-slate-400">
            {t.cat}
          </span>
        </div>
      ))}
    </div>
  </GlassCard>
);
