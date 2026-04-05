import { TrendingUp, TrendingDown } from "lucide-react";

interface CardData {
  title: string;
  amount: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  change: string;
  isPositive: boolean;
}

export const MyCards = ({ cards }: { cards: CardData[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative p-6 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border-subtle)] hover:border-[var(--hover-color)] shadow-xl overflow-hidden group transition-all duration-500 cursor-default"
          style={{
            // Creamos una variable personalizada de CSS con el color de la card
            ["--hover-color" as any]: `${card.color}30`, // 80 es 50% de opacidad
          }}
        >
          {/* Línea de luz superior (Highlight) */}
          <div
            className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${card.color}80, transparent)`,
            }}
          ></div>

          {/* Resplandor de fondo (Glow) */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-colors duration-500 opacity-50 group-hover:opacity-100"
            style={{ backgroundColor: card.glowColor }}
          ></div>

          {/* Capa de degradado interna sutil */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              {/* Contenedor del Icono */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner"
                style={{
                  backgroundColor: `${card.color}10`,
                  borderColor: `${card.color}20`,
                }}
              >
                {card.icon}
              </div>

              {/* Badge de Porcentaje */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm
                ${
                  card.isPositive
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                }`}
              >
                {card.isPositive ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                <span>{card.change}</span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--color-text-subtle)] mb-1.5 tracking-tight">
                {card.title}
              </p>
              <div className="flex items-baseline gap-0.5">
                <h2 className="text-3xl font-bold tracking-tighter text-[var(--color-text-main)]">
                  ${card.amount}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
