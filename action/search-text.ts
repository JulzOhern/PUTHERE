"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/getUser";

export async function searchText(value: string) {
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized user");
  }

  try {
    const searchResult = await db.text.findMany({
      where: {
        userId: user?.id,
        OR: [
          {
            title: {
              contains: value,
              mode: "insensitive",
            },
          },
          {
            text: {
              contains: value,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return searchResult;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
