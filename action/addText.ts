"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { revalidatePath } from "next/cache";

export const addText = async (formData: FormData) => {
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized user");
  }

  const { text, title } = Object.fromEntries(formData.entries()) as {
    text: string;
    title: string;
  };

  try {
    await db.text.create({
      data: {
        text,
        title,
        userId: user?.id as string,
      },
    });

    console.log("first");
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to create text");
  }
};
