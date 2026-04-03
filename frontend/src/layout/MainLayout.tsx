import { useState } from "react";
import { Sidebar } from "@/layout/components/Sidebar";
import { Navbar } from "@/layout/components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar onOpenMenu={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-main-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
