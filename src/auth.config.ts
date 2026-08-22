import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export default { 
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await db.user.findUnique({
                        where: {
                            email,
                        },
                    });

                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (passwordsMatch) {
                        // Respaldo de seguridad: cierra un POST directo a
                        // /api/auth/callback/credentials que evite la acción
                        // login() por completo. No puede llevar un mensaje útil
                        // -- devolver null aquí colapsa siempre a
                        // "CredentialsSignin", así que el mensaje amable para un
                        // usuario sin verificar vive en login() (src/actions/login.ts),
                        // que corre el mismo chequeo ANTES de llegar aquí.
                        const enforcementDisabled =
                            process.env.EMAIL_VERIFICATION_ENFORCED === "false";
                        if (!enforcementDisabled && !user.emailVerified) {
                            return null;
                        }
                        return user;
                    }

                }
                return null;
            },
        })
    ] 
} satisfies NextAuthConfig