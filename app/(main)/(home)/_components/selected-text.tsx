import { deleteText } from "@/action/deleteText";
import { editText } from "@/action/editText";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelectedTextId } from "@/utils/zustand";
import React, { useTransition } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { toast } from "sonner";

interface SelectedTextProp {
  selectedText:
    | {
        id: string;
        userId: string;
        title: string;
        text: string;
        checked?: boolean | undefined;
        createdAt: Date;
        updatedAt: Date;
      }
    | undefined;
}

export default function SelectedText({ selectedText }: SelectedTextProp) {
  const selectedTextId = useSelectedTextId();
  const [pending, setTransition] = useTransition();

  function onDeleteText() {
    setTransition(async () => {
      await deleteText(selectedTextId.selectedTextId)
        .then(() => {
          toast.success("Deleted text successfully");
          selectedTextId.setSelectedId("");
        })
        .catch((error) => toast.error(error.message));
    });
  }

  function onEditText(formData: FormData) {
    setTransition(async () => {
      await editText(formData, selectedTextId.selectedTextId)
        .then(() => toast.success("Saved successfully"))
        .catch((error) => toast.error(error.message));
    });
  }

  return (
    <form
      action={onEditText}
      className={cn(
        "fixed inset-0 duration-200 space-y-5 transition-all bg-white z-[1001] overflow-auto p-4",
        selectedText ? "scale-100 opacity-100" : "invisible scale-0 opacity-0"
      )}
    >
      <div>
        <TextAreaAutoSize
          defaultValue={selectedText?.title}
          placeholder="Title of your text"
          name="title"
          className="w-full p-3 text-2xl font-bold rounded-md resize-none outline-none bg-50"
        />
      </div>

      <div>
        <TextAreaAutoSize
          defaultValue={selectedText?.text}
          placeholder="Text here..."
          spellCheck={false}
          name="text"
          minRows={16}
          className="w-full rounded-lg p-3 outline-none resize-none"
        />
      </div>

      <div className="space-y-2">
        <div className="flex md:flex-row flex-col gap-2">
          <Button
            disabled={pending}
            onClick={onDeleteText}
            type="button"
            className="text-red-500 border border-red-500 bg-white hover:bg-transparent flex-1"
          >
            Delete
          </Button>

          <Button type="submit" disabled={pending} className="flex-1">
            Save
          </Button>
        </div>

        <Button
          disabled={pending}
          onClick={() => selectedTextId.setSelectedId("")}
          type="button"
          className="hover:bg-transparent w-full border border-zinc-300 bg-white text-black"
        >
          Close
        </Button>
      </div>
    </form>
  );
}
