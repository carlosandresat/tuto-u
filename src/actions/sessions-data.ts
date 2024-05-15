"use server";

import { db } from "@/lib/db";
import { addHours } from "date-fns";

export const cancelSession = async (sessionId: number): Promise<string> => {
  try {
    const updatedSession = await db.individualSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status: "canceled",
      },
    });

    return `Session ${updatedSession.id} has been successfully canceled.`;
  } catch (error) {
    console.error("Failed to cancel the session:", error);
    throw new Error(
      "Unable to cancel the session. Please make sure the session ID is correct."
    );
  }
};
