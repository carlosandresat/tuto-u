import React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const VerificationCodeEmail = ({
  code,
  userName,
}: {
  code: string;
  userName: string;
}) => (
  <Html>
    <Head />
    <Preview>Verifica tu correo de Tuto-U</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={title}>
          Verifica tu correo de <strong>Tuto-U</strong>
        </Text>
        <Section style={section}>
          <Text style={text}>
            Hola <strong>{userName}</strong>,
          </Text>
          <Text style={text}>
            Usa el siguiente código para verificar tu cuenta de Tuto-U.
          </Text>
          <div style={codeContainer}>
            <Text style={codeText}>{code}</Text>
          </div>
          <Text style={textTiny}>
            Este código expirará en 15 minutos. Si no creaste esta cuenta, puedes ignorar este correo de forma segura.
          </Text>
        </Section>
        <Text style={footer}>Tuto-U - Plataforma de Tutorías Yachay Tech</Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationCodeEmail;

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

const codeContainer = {
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const codeText = {
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "8px",
  fontFamily: "monospace",
  color: "#24292e",
  backgroundColor: "#f6f8fa",
  borderRadius: "0.5em",
  padding: "16px 24px",
  display: "inline-block",
  margin: "0",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
