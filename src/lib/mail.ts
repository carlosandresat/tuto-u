"use server";

import { Resend } from "resend";
import { differenceInMinutes } from "date-fns"

const resend = new Resend(process.env.RESEND_API_KEY);

export const newSessionTutorNotificationEmail = async (email: string, firstname: string | null, topic: string, dateString:string) => {
  const minutesLeft = differenceInMinutes(new Date(dateString), new Date())

  await resend.emails.send({
    from: "Notificaciones Tuto-U <notifications@tutou.app>",
    to: email,
    subject: "Tutoría solicitada",
    html: `<p>Hola ${firstname}, tienes una solicitud de tutoría con el tema: ${topic}. La tutoría está agendada en: ${Math.trunc(minutesLeft/60)}h ${minutesLeft%60} min. Por favor aceptar/rechazar y contactar con el estudiante en caso de ser necesario. Ten en cuenta que hay 24 horas después de realizada la tutoría para calificar la sesión, si puedes recordárselo al estudiante sería de mucha ayuda.</p><p>Entra a <a href="https://tutou.app" target="_blank">Tuto-U</a></p>`,
  });
};
