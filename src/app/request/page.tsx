import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IndividualSessionForm } from "@/components/individual-session-form";
import { PageContainer } from "@/components/page-container";

export default async function Component() {
  const session = await auth();

  return (
    <>
      <PageContainer size="2xl" clearNavbar={false} className="space-y-6 md:min-h-screen">
        <Button variant="link" className="px-0 self-start" asChild>
          <Link href="/home" >
            <ArrowLeft className="mr-2" /> Regresar
          </Link>
        </Button>
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight w-full text-left">
          Solicitar Tutoría
        </h1>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <IndividualSessionForm userId={session?.user?.id || ""}></IndividualSessionForm>
        </div>
      </PageContainer>
    </>
  );
}
