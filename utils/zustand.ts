import { SaveTextType } from "@/app/(main)/(home)/_components/notes-row";
import { create } from "zustand";

interface UseSelectedTextIdType {
  selectedTextId: string;
  setSelectedId: (id: string) => void;
}

interface UseOpenAddTextType {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useSelectedTextId = create<UseSelectedTextIdType>((set) => ({
  selectedTextId: "",
  setSelectedId: (id: string) => set(() => ({ selectedTextId: id })),
}));

export const useOpenAddText = create<UseOpenAddTextType>((set) => ({
  isOpen: false,
  setOpen: () => set(() => ({ isOpen: true })),
  setClose: () => set(() => ({ isOpen: false })),
}));
