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

                    if (passwordsMatch) return user;

                }
                return null;
            },
        })
    ] 
} satisfies NextAuthConfig