import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VerifyEmailForm } from "@/components/verify-email-form";
import { PageContainer } from "@/components/page-container";
import { getPendingVerificationEmail } from "@/lib/verification-cookie";

const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!domain || local.length <= 2) {
    return email;
  }
  return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
};

export default async function VerifyEmailPage() {
  const email = await getPendingVerificationEmail();

  if (!email) {
    redirect("/auth/login");
  }

  return (
    <PageContainer size="default" clearNavbar={false} className="flex min-h-screen flex-col items-center justify-center p-8">
      <Link href="/auth/login" className="absolute top-0 left-0 p-6">
        <Button variant="link">
          <ArrowLeft className="mr-2" /> Regresar al Login
        </Button>
      </Link>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={60}
        height={60}
        className="w-16 mb-12"
      />
      <Card className="max-w-screen-sm w-full">
        <CardHeader>
          <CardTitle>Verifica tu correo</CardTitle>
          <CardDescription>
            Ingresa el código de 6 dígitos que enviamos a {maskEmail(email)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/auth/login">
            <Button variant="link">Volver al inicio de sesión</Button>
          </Link>
        </CardFooter>
      </Card>
    </PageContainer>
  );
}
