import { db } from "./db";
import { auth } from "@clerk/nextjs";

export const getUser = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await db.user.findUnique({
    where: {
      externalUserId: userId,
    },
  });

  return data;
};
