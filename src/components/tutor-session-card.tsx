"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, capitalizeMonth } from "@/lib/utils";

import {
  Calendar,
  Clock1,
  MapPin,
  LibraryBig,
  Hourglass,
  Banknote,
  Mail,
  Star,
} from "lucide-react";
import { CancelDialog } from "@/components/cancel-dialog";
import { RejectDialog } from "@/components/reject-dialog";
import { AcceptDialog } from "@/components/accept-dialog";
import { RateDialog } from "@/components/rate-dialog";
import { useState } from "react";
import { addHours } from "date-fns";

export function TutorSessionCard({
  sessionId,
  tutorInitials,
  status,
  tutorFullname,
  tutorEmail,
  sessionCourse,
  place,
  topic,
  duration,
  price,
  rawDateTime,
  rate,
}: {
  sessionId: number;
  tutorInitials: string;
  tutorEmail: string;
  status: string;
  tutorFullname: string;
  sessionCourse: string;
  place: string;
  duration: number;
  price: number;
  topic: string;
  rawDateTime: Date;
  rate: number | null;
}) {
  const [statusState, setStatusState] = useState(status);
  const [rateState, setRateState] = useState<number|null>(rate)

  return (
    <Card>
      <CardHeader>
        <Badge
          className={cn(
            "bg-green-500 w-fit mb-2",
            statusState === "accepted"
              ? "bg-green-500"
              : statusState === "requested"
              ? "bg-yellow-500"
              : statusState === "canceled" || statusState === "rejected"
              ? "bg-destructive dark:text-foreground hover:dark:text-background"
              : ""
          )}
        >
          {statusState.charAt(0).toUpperCase() + statusState.slice(1)}
        </Badge>

        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={`/photos/${tutorEmail.split("@")[0]}.jpg`}
              className=" object-cover"
            />
            <AvatarFallback>{tutorInitials}</AvatarFallback>
          </Avatar>
          <CardTitle className="rounded-md bg-background/40">
            {tutorFullname}
          </CardTitle>
        </div>
        <CardDescription className="text-base text-foreground backdrop-blur-sm rounded-md w-fit px-2 bg-background/40">
          {sessionCourse}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 py-2  rounded-md bg-background/40 mb-2">
        <div className="flex space-x-2">
          <Calendar />
          <p>{capitalizeMonth(rawDateTime.toLocaleDateString('es-ES', {day: '2-digit', month: 'short', year: 'numeric'}))}</p>
        </div>
        <div className="flex space-x-2">
          <Clock1 />
          <p> {rawDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
        </div>
        <div className="flex space-x-2">
          <MapPin />
          <p>{place}</p>
        </div>
        <div className="flex space-x-2">
          <LibraryBig />
          <p>{topic}</p>
        </div>
        <div className="flex space-x-2">
          <Hourglass />
          <p>{`${duration / 60}h`.replace(".0", "")}</p>
        </div>
        <div className="flex space-x-2">
          <Banknote /> <p>{price != 0 ? `$${price.toFixed(2)}` : "Gratuita"}</p>
        </div>
        <div className="flex space-x-2">
          <Mail />
          <p className="break-all">
          <a
            href={`mailto:${tutorEmail}`}
            className=" hover:border-b border-foreground"
          >
            {tutorEmail}
          </a>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2">
        {statusState === "accepted" && rawDateTime > new Date() ? (
          <>
            <CancelDialog setState={setStatusState} sessionId={sessionId} />
          </>
        ) : statusState === "accepted" && rawDateTime < new Date() && rateState === null ? (
          <>
            <Button variant="secondary">Reportar</Button>
            <RateDialog buttonText="Calificar" role="tutor" sessionId={sessionId}></RateDialog>
          </>
        ) : statusState === "accepted" && rawDateTime < new Date() && rateState !== null ? (
          <div className="flex gap-2">
            <p>{rateState}</p> <Star className="h-6 w-6 fill-yellow-200" />
          </div>
        ) : statusState === "requested" && rawDateTime > addHours(new Date(), 1)? ( //solo se puede aceptar 1 hora antes
          <>
            <RejectDialog setState={setStatusState} sessionId={sessionId} studentEmail={tutorEmail} studentName={tutorFullname}/>
            <AcceptDialog setState={setStatusState} sessionId={sessionId} studentEmail={tutorEmail} studentName={tutorFullname}/>

          </>
        ) : statusState === "requested" && rawDateTime < addHours(new Date(), 1)? ( //solo se puede aceptar 1 hora antes
        <p className="text-center text-destructive leading-4">No respondiste a tiempo, vuelve a configurar tu perfil</p>
       ) : statusState === "canceled" ? null : null}
      </CardFooter>
    </Card>
  );
}
