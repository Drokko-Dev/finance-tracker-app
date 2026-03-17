import { useState } from "react";
import { Sidebar } from "@/layout/components/Sidebar";
import { Navbar } from "@/layout/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar onOpenMenu={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-[var(--color-main-bg)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
