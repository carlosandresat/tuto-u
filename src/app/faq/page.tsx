import React from "react";
import { StartNavbar } from "@/components/start-navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faq";
import { PageContainer } from "@/components/page-container";
import { Footer } from "@/components/footer";

export default function FAQ() {
  return (
    <>
      <StartNavbar />
      <PageContainer size="default" className="min-h-screen">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl w-full text-center">
          Preguntas Frecuentes
        </h2>
        {faq.map((section, index) => {
          return (
            <React.Fragment key={`Section${index}`}>
              <h3
                className="scroll-m-20 text-2xl font-semibold tracking-tight mt-12 w-full text-center"
              >
                Sección {index + 1}: {section.section}
              </h3>
              <Accordion
                type="multiple"
                className="w-full max-w-7xl px-8 pt-6 text-left"
              >
                {section.questions.map((question, index) => {
                  return (
                    <AccordionItem
                      value={`item-${index}`}
                      key={`item-${index}`}
                    >
                      <AccordionTrigger className="text-left">
                        {question.questionTitle}
                      </AccordionTrigger>
                      <AccordionContent className="bg-secondary border rounded p-6">
                        {question.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </React.Fragment>
          );
        })}
      </PageContainer>
      <Footer size="default" />
    </>
  );
}
