import { auth } from "@clerk/nextjs";
import { getUser } from "./getUser";
import { db } from "./db";

export const getText = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const data = await db.text.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
