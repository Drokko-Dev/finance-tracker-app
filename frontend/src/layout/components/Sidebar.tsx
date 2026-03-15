// src/components/layout/Sidebar.tsx
export const Sidebar = () => (
  <aside className="w-64 h-screen bg-white border-r border-[var(--color-border-subtle)] p-6 flex flex-col">
    <div className="flex items-center gap-2 mb-10 px-2">
      {/* El logo usa el degradado "tus finanzas" */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-end)]"></div>
      <span className="text-xl font-bold text-[var(--color-text-main)]">
        Finanz
      </span>
    </div>

    <nav className="flex-1 space-y-2">
      <NavItem icon="📊" label="Resumen" active />
      <NavItem icon="💸" label="Mis Ciclos" />
      <NavItem icon="💸" label="Movimientos" />
      <NavItem icon="💸" label="Amigos" />
      <NavItem icon="💸" label="Eliminados" />
      {/* ...otros items... */}
    </nav>
  </aside>
);

const NavItem = ({ icon, label, active }: any) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-end)] text-white shadow-lg shadow-cyan-500/20" : "text-[var(--color-text-subtle)] hover:bg-slate-100"}`}
  >
    <span>{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </div>
);
