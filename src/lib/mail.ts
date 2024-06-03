"use server";

import { Resend } from "resend";
import { capitalizeFirstLetter } from "@/lib/utils"
import SessionRequestEmail from "@/components/email-templates/session-request";

const resend = new Resend(process.env.RESEND_API_KEY);

export const newSessionTutorNotificationEmail = async (email: string, firstname: string | null, topic: string, dateString:string) => {
  const date = new Date(dateString)
  // Use Intl.DateTimeFormat to format the date
  const formattedDate = date.toLocaleString('es-US', {
    timeZone: 'America/Guayaquil', // Specify the desired timezone
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleString('en-US', {
    timeZone: 'America/Guayaquil', // Specify the desired timezone
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format
    timeZoneName: 'long',
  }); 
  

  await resend.emails.send({
    from: "Notificaciones Tuto-U <notifications@tutou.app>",
    to: email,
    subject: `Tutoría solicitada (${capitalizeFirstLetter(formattedDate)})`,
    react: SessionRequestEmail({tutorName: firstname, sessionDate: capitalizeFirstLetter(formattedDate), sessionTime: formattedTime, topic}),
  });
};
