import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const SessionRequestEmail = ({
  tutorName,
  sessionDate,
  sessionTime,
  topic,
}: {
  tutorName: string | null;
  sessionDate: string;
  sessionTime: string;
  topic: string;
}) => (
  <Html>
    <Head />
    <Preview>Tienes una nueva solicitud de tutoría</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>
          <strong>{tutorName}</strong>, tienes una nueva solicitud de tutoría.
        </Text>
        <Section style={section}>
          <Text style={text}>
            Hola <strong>{tutorName}</strong>!
          </Text>
          <Text style={text}>
            Tienes una nueva solicitud de tutoría. Por favor, acepta o rechaza
            la solicitud y contacta con el estudiante. No olvides acordar de antemano el pago por la tutoría en caso de ser necesario.
            Ten en cuenta que hay 24 horas después de realizada la tutoría para
            calificar la sesión, si puedes recordárselo al estudiante sería de
            mucha ayuda.
          </Text>
          <Section style={infoSection}>
            <Text>
              <strong>Fecha:</strong> {sessionDate}
            </Text>
            <Text>
              <strong>Hora:</strong> {sessionTime}
            </Text>
            <Text>
              <strong>Tema:</strong> {topic}
            </Text>
          </Section>
        </Section>
        <div style={buttonContainer}>
          <Link style={button} href="https://tutou.app">
            Ver solicitud completa
          </Link>
        </div>
        <Text style={footer}>Tuto-U</Text>
      </Container>
    </Body>
  </Html>
);

export default SessionRequestEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
  textAlign: "center" as const,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const infoSection = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "left" as const,
  marginTop: "20px",
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "40px",
};

const button = {
  fontSize: '14px',
  backgroundColor: '#007bff',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '12px 24px',
  textDecoration: 'none',
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
