import { db } from "./db";
import { auth } from "@clerk/nextjs";

export const getUser = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized user");
    }

    const data = await db.user.findUnique({
      where: {
        externalUserId: userId,
      },
    });

    return data;
  } catch {
    null;
  }
};
