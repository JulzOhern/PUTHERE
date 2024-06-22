import { getText } from "@/lib/getText";
import React from "react";
import NotesRow from "./_components/notes-row";

export default async function HomePage() {
  const saveText = await getText();

  return (
    <div className="my-4">
      {saveText.length ? (
        <NotesRow saveText={saveText} />
      ) : (
        <div className="flex flex-col gap-2 items-center justify-center min-h-[70dvh]">
          <p className="slide-up text-2xl font-bold">No text to display</p>
          <p className="text-zinc-600">Add new text</p>
        </div>
      )}
    </div>
  );
}
