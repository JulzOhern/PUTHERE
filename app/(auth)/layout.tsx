import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-50">
      {children}
    </div>
  );
};

export default AuthLayout;
