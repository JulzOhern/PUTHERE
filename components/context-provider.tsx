"use client";

import { SaveTextType } from "@/app/(main)/(home)/_components/notes-row";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ContextType {
  text: SaveTextType[];
  setText: React.Dispatch<React.SetStateAction<SaveTextType[]>>;
}

const Context = createContext({} as ContextType);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState<SaveTextType[]>([]);

  return (
    <Context.Provider value={{ text, setText }}>{children}</Context.Provider>
  );
}

export const useContextTextValue = () => {
  return useContext(Context);
};
