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

const PasswordResetEmail = ({
  resetLink,
  userName,
}: {
  resetLink: string;
  userName: string;
}) => (
  <Html>
    <Head />
    <Preview>Restablece tu contraseña de Tuto-U</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>
          Restablece tu contraseña de <strong>Tuto-U</strong>
        </Text>
        <Section style={section}>
          <Text style={text}>
            Hola <strong>{userName}</strong>,
          </Text>
          <Text style={text}>
            Has solicitado restablecer tu contraseña para tu cuenta de Tuto-U. Haz clic en el botón de abajo para cambiar tu contraseña.
          </Text>
          <div style={buttonContainer}>
            <Link style={button} href={resetLink}>
              Restablecer contraseña
            </Link>
          </div>
          <Text style={textTiny}>
            Este enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo de forma segura.
          </Text>
        </Section>
        <Text style={footer}>Tuto-U - Plataforma de Tutorías Yachay Tech</Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

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
  lineHeight: 1.5,
};

const textTiny = {
  fontSize: "12px",
  color: "#6a737d",
  margin: "20px 0 0 0",
  textAlign: "left" as const,
  lineHeight: 1.5,
};

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const button = {
  fontSize: '14px',
  backgroundColor: '#007bff',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '12px 24px',
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 'bold',
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
