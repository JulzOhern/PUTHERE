import Navbar from "@/components/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-zinc-50">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
