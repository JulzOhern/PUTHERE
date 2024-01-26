"use client";

import React, { useState } from "react";
import { format } from "timeago.js";
import TextareadAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { editText } from "@/action/editText";
import { deleteText } from "@/action/deleteText";

type TextCardProp = {
  text: {
    id: string;
    title: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
};

const TextCard = ({ text }: TextCardProp) => {
  const [seeText, setSeeText] = useState("");

  return (
    <>
      <div
        onClick={() => setSeeText(text.id)}
        className="flex flex-col justify-between bg-white p-5 rounded-lg hover:scale-[1.1] hover:shadow-lg duration-200 border border-zinc-200 cursor-pointer"
      >
        <div>
          <h1 className="font-semibold text-xl text-zinc-400 mb-2">
            {text.title}
          </h1>
          <p className="ellipsis whitespace-pre-wrap break-words break-all text-sm text-zinc-400 mb-4">
            {text.text}
          </p>
        </div>
        <p className="text-[13px] text-zinc-400">{format(text.createdAt)}</p>
      </div>

      <div
        className={cn(
          "flex items-center justify-center fixed inset-0 bg-white/40 duration-300",
          seeText === text.id
            ? "visible mt-0 opacity-1"
            : "opacity-0 invisible mt-56"
        )}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title") as string;
            const text_ = formData.get("text") as string;

            if (
              text_.replace(/\s/g, "") === text.text.replace(/\s/g, "") &&
              title === text.title
            ) {
              return toast.info("Info", {
                description: "No changes made",
              });
            }

            await editText(formData, text.id).then(() => {
              toast.success("Success", {
                description: "Save successfully",
              });
              setSeeText("");
            });
          }}
          className="flex flex-col flex-1 max-w-[35rem] p-10 border border-zinc-200 rounded-lg bg-white h-[38rem]"
        >
          <div className="flex mb-4">
            <TextareadAutosize
              className="w-0 flex-1 outline-none text-3xl font-semibold resize-none text-zinc-400"
              placeholder="Untitled"
              name="title"
              defaultValue={text.title}
            />
          </div>

          <textarea
            className="flex-1 outline-none resize-none mb-5"
            name="text"
            placeholder="Add text here..."
            defaultValue={text.text}
          />

          <div className="flex items-center justify-end gap-x-3 text-zinc-500">
            <button
              onClick={async () => {
                await deleteText(text.id).then(() =>
                  toast.success("Success", {
                    description: "Deleted successfully",
                  })
                );
              }}
              type="button"
              className="text-red-500"
            >
              Delete
            </button>
            <button onClick={() => setSeeText("")} type="button">
              Cancel
            </button>
            <button>Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TextCard;
