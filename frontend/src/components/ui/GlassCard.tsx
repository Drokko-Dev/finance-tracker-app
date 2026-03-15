// src/components/ui/GlassCard.tsx
export const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[var(--color-card-bg)]/80 backdrop-blur-lg border border-[var(--color-border-subtle)] rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className}`}
  >
    {children}
  </div>
);
