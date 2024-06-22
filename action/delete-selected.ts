"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { revalidatePath } from "next/cache";

export const deleteSelectedText = async (textId: string) => {
  try {
    const user = await getUser();

    if (!textId) {
      throw new Error("No text selected");
    }

    await db.text.delete({
      where: {
        id: textId,
      },
    });

    revalidatePath("/");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
