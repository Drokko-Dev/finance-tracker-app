import { Bell, ChevronDown, Search } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="h-20 border-b border-[var(--color-border-subtle)] flex items-center justify-between px-8 bg-white  backdrop-blur-md z-10">
      <div className="relative group flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] w-4 h-4" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="bg-slate-100/60 pl-12 pr-6 py-2.5 rounded-xl w-full border border-[var(--color-border-subtle)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm text-[var(--color-text-main)]"
        />
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="relative p-3 text-slate-400 hover:text-black transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#0b0c10]"></span>
        </button>
        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-[var(--color-border-subtle)] cursor-pointer hover:bg-white/10 transition-all">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-purple-500"></div>
          <span className="text-sm font-bold hidden md:block">Jaime</span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
