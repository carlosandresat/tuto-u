
import { Resend } from "resend";
import { capitalizeFirstLetter } from "@/lib/utils"
import SessionRequestEmail from "@/components/email-templates/session-request";
import SessionResponseEmail from "@/components/email-templates/session-response-email";
import SessionCancelEmail from "@/components/email-templates/session-cancel-email";
import PasswordResetEmail from "@/components/email-templates/password-reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const isDev = process.env.NODE_ENV === "development";
const enableEmailInDev = process.env.ENABLE_EMAIL_IN_DEV === "true";
const shouldBypassEmail = isDev && !enableEmailInDev;

const sendEmail = async (payload: {
  to: string;
  subject: string;
  react: React.ReactElement;
  devLogContext?: Record<string, any>;
}) => {
  if (shouldBypassEmail) {
    console.log("\n==================================================");
    console.log(`📧 [DEV MODE] Email Notification Bypassed`);
    console.log(`To:      ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    if (payload.devLogContext) {
      console.log("Context Details:");
      for (const [key, value] of Object.entries(payload.devLogContext)) {
        console.log(`  - ${key}: ${value}`);
      }
    }
    console.log("==================================================\n");
    return { data: null, error: null };
  }

  return await resend.emails.send({
    from: "Notificaciones Tuto-U <notifications@tutou.app>",
    to: payload.to,
    subject: payload.subject,
    react: payload.react,
  });
};

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
  
  await sendEmail({
    to: email,
    subject: `Tutoría solicitada (${capitalizeFirstLetter(formattedDate)})`,
    react: SessionRequestEmail({tutorName: firstname, sessionDate: capitalizeFirstLetter(formattedDate), sessionTime: formattedTime, topic}),
    devLogContext: {
      tutorName: firstname,
      sessionDate: capitalizeFirstLetter(formattedDate),
      sessionTime: formattedTime,
      topic,
    },
  });
};

export const sessionResponseNotificationEmail = async (email: string, tutorName: string | null, topic: string, date:Date, studentName: string, response:string) => {
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
  
  await sendEmail({
    to: email,
    subject: `Tutoría ${response === "accepted" ? "aceptada" : "rechazada"}`,
    react: SessionResponseEmail({tutorName, studentName, sessionDate: capitalizeFirstLetter(formattedDate), sessionTime: formattedTime, topic, response}),
    devLogContext: {
      tutorName,
      studentName,
      sessionDate: capitalizeFirstLetter(formattedDate),
      sessionTime: formattedTime,
      topic,
      response,
    },
  });
};

export const sessionCancelNotificationEmail = async (email: string, userName: string, date:Date) => {
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
  
  await sendEmail({
    to: email,
    subject: `Tutoría cancelada`,
    react: SessionCancelEmail({ userName, sessionDate: capitalizeFirstLetter(formattedDate), sessionTime: formattedTime}),
    devLogContext: {
      userName,
      sessionDate: capitalizeFirstLetter(formattedDate),
      sessionTime: formattedTime,
    },
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  userName: string,
  domain: string
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Restablece tu contraseña",
    react: PasswordResetEmail({ resetLink, userName }),
    devLogContext: {
      userName,
      resetLink,
    },
  });
};