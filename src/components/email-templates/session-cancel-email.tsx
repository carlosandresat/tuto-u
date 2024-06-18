import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const SessionCancelEmail = ({
    userName,
  sessionDate,
  sessionTime,
}: {
    userName: string;
  sessionDate: string;
  sessionTime: string;
}) => (
  <Html>
    <Head />
    <Preview>Una sesión de tutoría ha sido cancelada</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>
          <strong>{userName}</strong>, una sesión de tutoría ha sido cancelada.
        </Text>
        <Section style={section}>
          <Text style={text}>
            Hola <strong>{userName}</strong>!
          </Text>
          <Text style={text}>
            Te informamos que una sesión de tutoría ha sido cancelada.
          </Text>
        </Section>
        <div style={buttonContainer}>
          <Link style={button} href="https://tutou.app">
            Ver detalles en Tuto-U
          </Link>
        </div>
        <Text style={footer}>Tuto-U ({sessionDate}, {sessionTime})</Text>
      </Container>
    </Body>
  </Html>
);

export default SessionCancelEmail;

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