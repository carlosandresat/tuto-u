"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const newSessionTutorNotificationEmail = async (email: string) => {
  await resend.emails.send({
    from: "Notificaciones Tuto-U <notifications@tutou.app>",
    to: email,
    subject: "Tutoría solicitada",
    html: '<p>Hola, tienes una solicitud de tutoría. Por favor aceptar/rechazar y contactar con el estudiante en caso de ser necesario. Ten en cuenta que hay 24 horas después de realizada la tutoría para calificar la sesión, si puedes recordárselo al estudiante sería de mucha ayuda.</p><p>Entra a <a href="https://tutou.app" target="_blank">Tuto-U</a></p>',
  });
};
