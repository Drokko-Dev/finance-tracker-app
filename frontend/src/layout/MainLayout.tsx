import { useState } from "react";
import { Sidebar } from "@/layout/components/Sidebar";
import { Navbar } from "@/layout/components/Navbar";
import { Outlet } from "react-router-dom";
import { CreateTransactionModal } from "@/components/CreateTransactionModal";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar onOpenMenu={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenModal={() => setIsTransactionModalOpen(true)} // ← pasás esto
        />
        <CreateTransactionModal
          isOpen={isTransactionModalOpen}
          onClose={() => setIsTransactionModalOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-main-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
