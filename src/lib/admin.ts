import { auth } from "@/auth";
import { db } from "@/lib/db";

function getAdminEmailSet(): Set<string> {
  const raw = process.env.ADMIN_EMAILS || "";
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => email.length > 0)
  );
}

export async function requireAdmin(): Promise<{ userId: string; email: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }

  const currentUserId = session.user.id;
  const adminEmails = getAdminEmailSet();
  if (adminEmails.size === 0) {
    throw new Error("Unauthorized: no admin allowlist configured.");
  }

  const user = await db.user.findUnique({
    where: { id: currentUserId },
    select: { email: true },
  });

  const email = user?.email?.trim().toLowerCase();
  if (!email || !adminEmails.has(email)) {
    throw new Error("Unauthorized: not an admin.");
  }

  return { userId: currentUserId, email };
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}
