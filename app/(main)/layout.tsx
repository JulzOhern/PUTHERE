import Navbar from "@/components/navbar";
import React from "react";
import { Toaster } from "sonner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-zinc-50">
      <Navbar />
      <Toaster richColors position="bottom-center" />
      {children}
    </div>
  );
};

export default MainLayout;
