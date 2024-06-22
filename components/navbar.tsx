"use client";

import { UserButton } from "@clerk/nextjs";
import React, { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { MdOutlineSearch } from "react-icons/md";
import { useContextTextValue } from "./context-provider";
import { searchText } from "@/action/search-text";
import { toast } from "sonner";

const Navbar = () => {
  const { setText } = useContextTextValue();

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    searchText(e.target.value)
      .then((data) => setText(data))
      .catch((error) => toast.error(error.message));
  }

  return (
    <div className="flex items-center justify-between h-16 px-3 shadow bg-white">
      <div>
        <h1 className="flex items-center gap-1 font-bold text-2xl tracking-[-2px]">
          PUTHERE
        </h1>
      </div>

      <div className="relative flex items-center flex-1 max-w-[30rem]">
        <MdOutlineSearch className="absolute left-5 text-zinc-500 scale-[1.4]" />
        <Input
          type="text"
          onChange={onSearch}
          placeholder="Search notes"
          className="slide-down bg-[#E0E0E0] pl-11 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <div>
        <UserButton afterSignOutUrl="/sign-in" showName={true} />
      </div>
    </div>
  );
};

export default Navbar;
