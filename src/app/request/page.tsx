import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IndividualSessionForm } from "@/components/individual-session-form";

export default async function Component() {
  const session = await auth();

  return (
    <>
      <section className="md:min-h-screen w-full p-6 items-center justify-center flex flex-col space-y-6">
        {/* Button Back */}
        <Button variant="link" className="px-0 self-start" asChild>
          <Link href="/home" >
          <ArrowLeft className="mr-2" /> Regresar
        </Link>
        </Button>
        <div className="flex flex-col md:flex-row gap-6 max-w-screen-2xl w-full">
          <IndividualSessionForm userId={session?.user?.id || ""}></IndividualSessionForm>
        </div>
      </section>
    </>
  );
}
