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

const SessionResponseEmail = ({
  studentName,
  tutorName,
  sessionDate,
  sessionTime,
  topic,
  response,
}: {
  studentName: string;
  tutorName: string | null;
  sessionDate: string;
  sessionTime: string;
  topic: string;
  response: string;
}) => (
  <Html>
    <Head />
    <Preview>Han respondido a tu solicitud de tutoría</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>
          <strong>{studentName}</strong>, tu solicitud de tutoría ha sido{" "}
          {response === "accepted" ? "aceptada" : "rechazada"}.
        </Text>
        <Section style={section}>
          <Text style={text}>
            Hola <strong>{studentName}</strong>!
          </Text>
          <Text style={text}>
            Tu tutor <strong>{tutorName}</strong> ha{" "}
            {response === "accepted" ? "aceptado" : "rechazado"} tu solicitud de
            tutoría.
          </Text>

          <Text style={text}>Aquí están los detalles de la solicitud:</Text>
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
          {response === "accepted" ? (
            <Text style={text}>
              Por favor, no olvides calificar la sesión dentro de las 24 horas
              posteriores a la misma. ¡Gracias!
            </Text>
          ) : null}
        </Section>
        <div style={buttonContainer}>
          <Link style={button} href="https://tutou.app">
            {response === "accepted"
              ? "Ver detalles de la sesión"
              : "Solicita otra tutoría"}
          </Link>
        </div>
        <Text style={footer}>Tuto-U</Text>
      </Container>
    </Body>
  </Html>
);

export default SessionResponseEmail;

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
  fontSize: "14px",
  backgroundColor: "#007bff",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
  textDecoration: "none",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
