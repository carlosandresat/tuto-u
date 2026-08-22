import { cookies } from "next/headers";

/**
 * No "use server" aquí — src/lib/ nunca la lleva (ver CLAUDE.md). Un setter de
 * cookie exportado desde un módulo con esa directiva quedaría expuesto como
 * endpoint HTTP público, permitiendo que cualquiera fije esta cookie.
 *
 * La cookie es solo una PISTA de enrutamiento — nunca una prueba de identidad.
 * Solo se fija después de un bcrypt.compare exitoso (login) o de crear la
 * cuenta (registro), así que resendVerificationCode() puede confiar en el
 * correo que trae sin volver a validar nada: no hay forma de que alguien
 * fije esta cookie con un correo ajeno sin antes conocer la contraseña de esa
 * cuenta o haber completado el registro con ese correo.
 */
const PENDING_VERIFICATION_COOKIE = "pending_verification_email";
const PENDING_VERIFICATION_COOKIE_MAX_AGE_SECONDS = 15 * 60;

export const setPendingVerificationEmail = async (email: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(PENDING_VERIFICATION_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    maxAge: PENDING_VERIFICATION_COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
};

export const getPendingVerificationEmail = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(PENDING_VERIFICATION_COOKIE)?.value ?? null;
};

export const clearPendingVerificationEmail = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(PENDING_VERIFICATION_COOKIE);
};
