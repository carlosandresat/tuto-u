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

/**
 * Gestión de mentores. A diferencia de `requireAdmin()`, el permiso vive en la
 * BD (`User.role`), y se lee de ahí en cada llamada —no del JWT— para que
 * quitar el rol desde /admin/roles tenga efecto inmediato.
 */
export async function requireMentorAdmin(): Promise<{ userId: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: no active session.");
  }

  const currentUserId = session.user.id;
  const user = await db.user.findUnique({
    where: { id: currentUserId },
    select: { role: true },
  });

  if (user?.role !== "MENTOR_ADMIN") {
    throw new Error("Unauthorized: not a mentor admin.");
  }

  return { userId: currentUserId };
}

export async function isCurrentUserMentorAdmin(): Promise<boolean> {
  try {
    await requireMentorAdmin();
    return true;
  } catch {
    return false;
  }
}
