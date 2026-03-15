import { Sidebar } from "@/layout/components/Sidebar";
import { Navbar } from "@/layout/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-[--color-main-bg] overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {children}
        </main>
      </div>
    </div>
  );
};
