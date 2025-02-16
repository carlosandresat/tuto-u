import { StartNavbar } from "@/components/start-navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/data/faq";

export default function FAQ() {
  return (
    <>
      <StartNavbar />
      <section className="min-h-screen w-full py-12 flex items-center justify-center flex-col pt-40">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight max-w-screen-xl">
          Preguntas Frecuentes
        </h2>
        {faq.map((section, index) => {
          return (
            <>
              <h3
                className="scroll-m-20 text-2xl font-semibold tracking-tight mt-12"
                key={`Section${index}`}
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
            </>
          );
        })}
      </section>
    </>
  );
}
