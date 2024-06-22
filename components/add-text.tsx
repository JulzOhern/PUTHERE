"use client";

import { cn } from "@/lib/utils";
import { useOpenAddText } from "@/utils/zustand";
import { Plus } from "lucide-react";
import React, { ElementRef, useEffect, useRef, useTransition } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { addText } from "@/action/addText";
import { toast } from "sonner";

export default function AddText() {
  const [pending, setTransition] = useTransition();
  const openAddText = useOpenAddText();
  const formRef = useRef<ElementRef<"form">>(null);

  useEffect(() => {
    if (openAddText.isOpen) {
      document.body.style.overflow = "clip";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openAddText.isOpen]);

  function onAddText(formData: FormData) {
    setTransition(async () => {
      await addText(formData)
        .then(() => {
          toast.success("Add text successfully");
          formRef.current?.reset();
          openAddText.setClose();
        })
        .catch((error) => toast.error(error.message));
    });
  }

  return (
    <>
      <button
        onClick={() => openAddText.setOpen()}
        style={{ boxShadow: "1px 2px 8px #898989" }}
        className="fixed right-5 bottom-5 bg-white cursor-pointer rounded-full p-4 text-zinc-600 z-[1000]"
      >
        <Plus />
      </button>

      <form
        action={onAddText}
        ref={formRef}
        className={cn(
          "fixed inset-0 duration-200 space-y-5 transition-all bg-white z-[1001] overflow-auto p-4",
          openAddText.isOpen
            ? "scale-100 opacity-100"
            : "invisible scale-0 opacity-0"
        )}
      >
        <div>
          <TextAreaAutoSize
            placeholder="Title of your text"
            className="w-full p-3 text-2xl font-bold rounded-md resize-none outline-none bg-50"
            name="title"
            required
          />
        </div>

        <div>
          <TextAreaAutoSize
            placeholder="Text here..."
            spellCheck={false}
            minRows={18}
            name="text"
            className="w-full rounded-lg p-3 outline-none resize-none"
            required
          />
        </div>

        <div className="flex md:flex-row flex-col gap-2">
          <Button
            disabled={pending}
            onClick={() => openAddText.setClose()}
            type="button"
            className="hover:bg-transparent border border-zinc-300 bg-white text-black flex-1"
          >
            Close
          </Button>

          <Button disabled={pending} className="flex-1" type="submit">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
