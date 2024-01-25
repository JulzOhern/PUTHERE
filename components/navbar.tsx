import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ImPencil2 } from "react-icons/im";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center fixed inset-x-0 border-b border-zinc-200 p-3 bg-white">
      <div className="flex item-center justify-between max-w-[45rem] flex-1">
        <div>
          <h1 className="flex items-center">
            <span className="border-b border-zinc-400 pr-3">PutHere</span>{" "}
            <ImPencil2 className="scale-[1.3] ml-1 text-zinc-500" />
          </h1>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
