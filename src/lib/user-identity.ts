import { db } from "@/lib/db";

/**
 * Deriva la identidad de un usuario nuevo a partir de su correo institucional:
 * la universidad (por dominio) y un username único dentro de esa universidad.
 * Retorna null si el dominio no pertenece a ninguna universidad registrada.
 */
export const resolveUserIdentity = async (email: string) => {
  const domain = email.split("@")[1];

  const university = await db.university.findUnique({
    where: { emailDomain: domain },
  });

  if (!university) {
    return null;
  }

  const base = email.split("@")[0].toLowerCase().replace(/\./g, "");

  let username = base;
  let suffix = 1;

  while (
    await db.user.findFirst({
      where: { universityId: university.id, username },
    })
  ) {
    suffix++;
    username = `${base}-${suffix}`;
  }

  return { universityId: university.id, username };
};