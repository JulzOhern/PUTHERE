"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteText = async (textId: string) => {
  try {
    await db.text.delete({
      where: {
        id: textId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to delete text");
  }
};
