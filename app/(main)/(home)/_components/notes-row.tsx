"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BsTrashFill } from "react-icons/bs";
import SelectedText from "./selected-text";
import { useSelectedTextId } from "@/utils/zustand";
import { deleteSelectedText } from "@/action/delete-selected";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useContextTextValue } from "@/components/context-provider";

export interface SaveTextType {
  id: string;
  userId: string;
  title: string;
  text: string;
  checked?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface NotesRowProp {
  saveText: SaveTextType[];
}

export default function NotesRow({ saveText }: NotesRowProp) {
  const { text, setText } = useContextTextValue();
  const selectedTextId = useSelectedTextId();
  const [pending, setTransition] = useTransition();

  const isNotSelectedAll = text.some((t) => t.checked === false || !t.checked);
  const findSelectedText = text.find(
    (t) => t.id === selectedTextId.selectedTextId
  );

  useEffect(() => {
    setText(saveText);
  }, [saveText]);

  useEffect(() => {
    if (selectedTextId.selectedTextId) {
      document.body.style.overflow = "clip";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTextId.selectedTextId]);

  function onSelectAll() {
    setText((prev) =>
      prev.map((t) =>
        isNotSelectedAll ? { ...t, checked: true } : { ...t, checked: false }
      )
    );
  }

  function onDeleteSelected() {
    const selectedText = text.filter((t) => t.checked === true);

    if (!!selectedText.length === false) {
      toast.error("No selected text.");
    }

    for (let i = 0; i < selectedText.length; i++) {
      setTransition(async () => {
        await deleteSelectedText(selectedText[i].id)
          .then(() => {
            if (i === selectedText.length - 1) {
              toast.success("deleted successfully");
            }
          })
          .catch((error) => toast.error(error.message));
      });
    }
  }

  return (
    <>
      <SelectedText selectedText={findSelectedText} />

      <Card className="flex justify-between slide-up mb-3 border-none py-2 px-5">
        <div className="flex items-center gap-2">
          <Checkbox
            id="check-box"
            disabled={text.length === 0}
            onCheckedChange={onSelectAll}
            checked={!isNotSelectedAll && !!text.length}
            className="disabled:cursor-not-allowed"
          />
          <label htmlFor="check-box" className="text-sm">
            Select all notes
          </label>
        </div>

        {pending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <button
            onClick={onDeleteSelected}
            className="flex gap-2 items-center"
          >
            <p className="text-sm">Delete all notes</p>
            <BsTrashFill
              className="cursor-pointer"
              title="Delete selected notes"
            />
          </button>
        )}
      </Card>

      <Card className="slide-up grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5 border-none bg-transparent shadow-none">
        {text.map((text) => (
          <div
            key={text.id}
            className="slide-up flex flex-col justify-between gap-5 bg-white p-7 rounded-lg shadow divide-y divide-zinc-300 duration-200 transition-all"
          >
            <div
              onClick={() => selectedTextId.setSelectedId(text.id)}
              className="space-y-4 cursor-pointer"
            >
              <CardTitle className="line-clamp-1 text-gray-800">
                {text.title}
              </CardTitle>

              <p className="line-clamp-6">{text.text}</p>
            </div>

            <div className="space-y-2 pt-3">
              <div className="flex items-center gap-2 gap-y-2">
                <Checkbox
                  onCheckedChange={() =>
                    setText((prev) =>
                      prev.map((t) =>
                        t.id === text.id ? { ...t, checked: !t.checked } : t
                      )
                    )
                  }
                  checked={text.checked || false}
                  id={text.id}
                />
                <label htmlFor={text.id}>Select to delete</label>
              </div>

              <ul>
                <li>
                  Created at:{" "}
                  {text.createdAt.toLocaleDateString([], {
                    dateStyle: "medium",
                  })}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}
