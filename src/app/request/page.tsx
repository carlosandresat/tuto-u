import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IndividualSessionForm } from "@/components/individual-session-form";
import { PageContainer } from "@/components/page-container";
import { db } from "@/lib/db";

export default async function Component() {
  const session = await auth();
  const courses = await db.course.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <PageContainer size="2xl" clearNavbar={false} className="flex flex-col gap-6 md:min-h-screen">
      <Button variant="link" className="px-0 self-start" asChild>
        <Link href="/home" >
          <ArrowLeft data-icon="inline-start" /> Regresar
        </Link>
      </Button>
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight w-full text-left">
        Solicitar Tutoría
      </h1>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <IndividualSessionForm
          userId={session?.user?.id || ""}
          courses={courses}
        />
      </div>
    </PageContainer>
  );
}
