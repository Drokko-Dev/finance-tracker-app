// src/features/dashboard/components/DashboardGrid.tsx
export const GlassCard = ({ title, children, className }: any) => (
  <div
    className={`bg-[#17171b]/80 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-8 ${className}`}
  >
    {title && (
      <h3 className="text-slate-400 text-sm font-medium mb-6 uppercase tracking-wider">
        {title}
      </h3>
    )}
    {children}
  </div>
);
