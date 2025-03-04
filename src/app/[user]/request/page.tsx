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

export default async function Page({ params }: { params: { user: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const email = params.user.replace("-", ".").concat("@yachaytech.edu.ec");
  const formData = await getTutorFormData(email);

  return (
    <section className="md:min-h-screen w-full p-6 items-center flex flex-col space-y-6">
      <Button variant="link" className="px-0 self-start" asChild>
        <Link href={`/${params.user}/profile`}>
          <ArrowLeft className="mr-2" /> Regresar
        </Link>
      </Button>
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
    </section>
  );
}
