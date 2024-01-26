"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const editText = async (formData: FormData, textId: string) => {
  const title = formData.get("title") as string;
  const text = formData.get("text") as string;

  try {
    await db.text.update({
      where: {
        id: textId,
      },
      data: {
        title,
        text,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to edit text");
  }
};
