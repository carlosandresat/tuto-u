import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ProfileRequestForm } from "@/components/profile-request-form";
import { getTutorFormData } from "@/actions/profile";
import { auth } from "@/auth";
import { PageContainer } from "@/components/page-container";

export default async function Page({ params }: { params: Promise<{ user: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const resolvedParams = await params;
  const email = resolvedParams.user.replace("-", ".").concat("@yachaytech.edu.ec");
  const formData = await getTutorFormData(email);

  return (
    <PageContainer size="xl" clearNavbar={true} className="flex flex-col gap-6 md:min-h-screen">
      <Button variant="link" className="px-0 self-start" asChild>
        <Link href={`/${resolvedParams.user}/profile`}>
          <ArrowLeft data-icon="inline-start" /> Regresar
        </Link>
      </Button>
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight w-full text-left">
        Solicitar Tutoría
      </h1>
      <Card className="w-full max-w-screen-lg">
        <CardHeader>
          <CardTitle>Solicita una tutoría con {formData.name}</CardTitle>
          <CardDescription>
            Llena el formulario para realizar una solicitud de tutoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileRequestForm {...formData} studentId={session.user.id}/>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
