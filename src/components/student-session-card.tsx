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
  Phone,
} from "lucide-react";
import { CancelDialog } from "./cancel-dialog";
import { RateDialog } from "@/components/rate-dialog";
import { useState } from "react";
import { ReportSessionDialog } from "@/components/report-session-dialog";

export function StudentSessionCard({
  sessionId,
  tutorInitials,
  status,
  tutorFullname,
  tutorEmail,
  tutorWhatsapp,
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
  tutorWhatsapp: string | null;
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
        <CardDescription className="text-base text-foreground backdrop-blur-sm rounded-md px-2 bg-background/40">
          {sessionCourse}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 py-2 rounded-md bg-background/40 mb-2">
        <div className="flex space-x-2">
          <Calendar />
          <p>
            {capitalizeMonth(
              rawDateTime.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            )}
          </p>
        </div>
        <div className="flex space-x-2">
          <Clock1 />
          <p>
            {" "}
            {rawDateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
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
        <div className="flex space-x-2 w-full">
          {tutorWhatsapp ? (
            <>
              <Phone />
              <p className="break-all">
                <a
                  href={`https://wa.me/${tutorWhatsapp.substring(1)}`}
                  target="_blank"
                  className=" hover:border-b border-foreground"
                >
                  {tutorWhatsapp}
                </a>
              </p>
            </>
          ) : (
            <>
              <Mail />
              <p className="break-all">
                <a
                  href={`mailto:${tutorEmail}`}
                  className=" hover:border-b border-foreground"
                >
                  {tutorEmail}
                </a>
              </p>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2">
        {statusState === "accepted" && rawDateTime > new Date() ? (
          <>
            <CancelDialog
              setState={setStatusState}
              sessionId={sessionId}
              email={tutorEmail}
              userName={tutorFullname}
            />
          </>
        ) : statusState === "accepted" &&
          rawDateTime < new Date() &&
          rate === null ? (
          <>
            <ReportSessionDialog
              buttonText="Reportar"
              sessionId={sessionId}
              role="student"
            />
            <RateDialog
              buttonText="Calificar"
              role="student"
              sessionId={sessionId}
            ></RateDialog>
          </>
        ) : statusState === "accepted" &&
          rawDateTime < new Date() &&
          rate !== null ? (
          <div className="flex gap-2">
            <p>{rate}</p> <Star className="h-6 w-6 fill-yellow-200" />
          </div>
        ) : statusState === "requested" ? (
          <CancelDialog
            setState={setStatusState}
            sessionId={sessionId}
            email={tutorEmail}
            userName={tutorFullname}
          />
        ) : statusState === "canceled" ? null : null}
      </CardFooter>
    </Card>
  );
}
