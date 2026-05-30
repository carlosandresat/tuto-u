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
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <IndividualSessionForm userId={session?.user?.id || ""}></IndividualSessionForm>
        </div>
      </PageContainer>
    </>
  );
}
