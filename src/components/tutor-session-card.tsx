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
import { cn } from "@/lib/utils";

import {
  Calendar,
  Clock1,
  MapPin,
  LibraryBig,
  Hourglass,
  Banknote,
  Mail,
} from "lucide-react";
import { CancelDialog } from "@/components/cancel-dialog";
import { AcceptDialog } from "@/components/accept-dialog";
import { useState } from "react";

export function TutorSessionCard({
  sessionId,
  tutorInitials,
  status,
  tutorFullname,
  tutorEmail,
  sessionCourse,
  dateString,
  timeString,
  place,
  topic,
  duration,
  price,
  rawDateTime,
}: {
  sessionId: number;
  tutorInitials: string;
  tutorEmail: string;
  status: string;
  tutorFullname: string;
  sessionCourse: string;
  dateString: string;
  timeString: string;
  place: string;
  duration: number;
  price: number;
  topic: string;
  rawDateTime: Date;
}) {
  const [statusState, setStatusState] = useState(status);

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
              : statusState === "canceled"
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
      <CardContent className="space-y-2 py-2  rounded-md w-fit bg-background/40 mb-2">
        <div className="flex space-x-2">
          <Calendar />
          <p>{dateString}</p>
        </div>
        <div className="flex space-x-2">
          <Clock1 />
          <p> {timeString}</p>
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
          <a
            href={`mailto:${tutorEmail}`}
            className=" hover:border-b border-foreground"
          >
            {tutorEmail}
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2">
        {statusState === "accepted" && rawDateTime > new Date() ? (
          <>
            <CancelDialog setState={setStatusState} sessionId={sessionId} />
          </>
        ) : statusState === "accepted" && rawDateTime < new Date() ? (
          <>
            <Button variant="secondary">Reportar</Button>
            <Button>Calificar</Button>
          </>
        ) : statusState === "requested" ? (
          <>
            <CancelDialog setState={setStatusState} sessionId={sessionId} />
            <AcceptDialog setState={setStatusState} sessionId={sessionId} />

          </>
        ) : statusState === "canceled" ? null : null}
      </CardFooter>
    </Card>
  );
}
