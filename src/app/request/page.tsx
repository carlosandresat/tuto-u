import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IndividualSessionRequestSchema } from "@/schemas";
import { AchievementsDialog } from "@/components/achievements-dialog";
import { IndividualSessionForm } from "@/components/individual-session-form";


export default async function Component() {
  const session = await auth();

  return (
    <>
      <section className="md:min-h-screen w-full p-6 md:p-12 items-center justify-center flex">
        {/* Button Back */}
        <Link href="/home" className="absolute top-0 left-0 p-6">
          <Button variant="link">
            <ArrowLeft className="mr-2" /> Regresar
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row gap-6 max-w-screen-2xl w-full mt-12">
          <IndividualSessionForm userId={session?.user?.id || ""}></IndividualSessionForm>
        </div>
      </section>
    </>
  );
}
