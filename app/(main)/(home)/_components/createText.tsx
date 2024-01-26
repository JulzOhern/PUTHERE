"use client";

import { addText } from "@/action/addText";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { LuPlus } from "react-icons/lu";
import TextareadAutosize from "react-textarea-autosize";
import { toast } from "sonner";

const CreateText = ({
  textColor,
  size,
}: {
  textColor: string;
  size: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LuPlus
        onClick={() => setIsOpen(true)}
        className={cn(textColor, size)}
        cursor="pointer"
      />

      <div
        className={cn(
          "flex items-center justify-center fixed inset-0 bg-white/40 z-[501] duration-300",
          isOpen ? "mt-0 opacity-1 visible" : "invisible mt-56 opacity-0"
        )}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            addText(formData).then(() => {
              toast.success("Success", {
                description: "Created successfully",
              });
            });
            setIsOpen(false);
            e.currentTarget.reset();
          }}
          className="flex flex-col flex-1 max-w-[35rem] p-10 border border-zinc-200 rounded-lg bg-white h-[38rem]"
        >
          <div className="flex mb-4">
            <TextareadAutosize
              className="w-0 flex-1 outline-none text-3xl font-semibold resize-none text-zinc-400"
              placeholder="Untitled"
              name="title"
            />
          </div>

          <textarea
            className="flex-1 outline-none resize-none"
            name="text"
            placeholder="Add text here..."
          />

          <div className="flex items-center justify-end gap-x-3 text-zinc-500">
            <button onClick={() => setIsOpen(false)} type="button">
              Cancel
            </button>
            <button>Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateText;
