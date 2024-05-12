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
} from "lucide-react";
import Image from "next/image";
import { CancelDialog } from "./cancel-dialog";

export function StudentSessionCard({
  status,
  fullname,
  photo_url,
  course,
  date,
  time,
  place,
  topic,
  duration,
  price,
  rawDateTime,
}: {
  status: string;
  fullname: string;
  photo_url: string;
  course: string;
  date: string;
  time: string;
  place: string;
  duration: number;
  price: number;
  topic: string;
  rawDateTime: Date;
}) {
  return (
    <Card>
      <CardHeader>
        <Badge
          className={cn(
            "bg-green-500 w-fit mb-2",
            status === "accepted"
              ? "bg-green-500"
              : status === "requested"
              ? "bg-yellow-500"
              : status === "canceled"
              ? "bg-destructive dark:text-foreground hover:dark:text-background"
              : ""
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>

        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src="/photos/carlos.arevalo.jpg"
              className=" object-cover"
            />
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <CardTitle className="rounded-md bg-background/40">
            {fullname}
          </CardTitle>
        </div>
        <CardDescription className="text-base text-foreground backdrop-blur-sm rounded-md w-fit px-2 bg-background/40">
          {course}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 py-2  rounded-md w-fit bg-background/40 mb-2">
        <div className="flex space-x-2">
          <Calendar />
          <p>{date}</p>
        </div>
        <div className="flex space-x-2">
          <Clock1 />
          <p> {time}</p>
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
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2">
        {status === "accepted" && rawDateTime > new Date() ? (
          <>
            <CancelDialog />
          </>
        ) : status === "accepted" && rawDateTime < new Date() ? (
          <>
            <Button variant="secondary">Reportar</Button>
            <Button>Calificar</Button>
          </>
        ) : status === "requested" ? (
          <CancelDialog />
        ) : status === "canceled" ? null : null}
      </CardFooter>
    </Card>
  );
}