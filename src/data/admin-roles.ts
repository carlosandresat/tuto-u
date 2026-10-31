import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";

export type MentorAdminRow = {
  id: string;
  name: string;
  email: string | null;
};

export async function getMentorAdmins(): Promise<MentorAdminRow[]> {
  await requireAdmin();

  try {
    const users = await db.user.findMany({
      where: { role: "MENTOR_ADMIN" },
      orderBy: { email: "asc" },
      select: { id: true, firstname: true, lastname: true, email: true },
    });

    return users.map((user) => ({
      id: user.id,
      name: `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim(),
      email: user.email,
    }));
  } catch (error) {
    console.error("Failed to fetch mentor admins:", error);
    throw new Error("Unable to fetch mentor admins.");
  }
}
