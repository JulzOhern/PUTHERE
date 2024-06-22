import AddText from "@/components/add-text";
import Navbar from "@/components/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100dvh] bg-zinc-100">
      <Navbar />
      <AddText />
      <div className="mx-3">{children}</div>
    </div>
  );
};

export default MainLayout;
