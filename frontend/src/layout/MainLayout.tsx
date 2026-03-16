import { Sidebar } from "@/layout/components/Sidebar";
import { Navbar } from "@/layout/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex bg-[var(--color-card-bg)] transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};
