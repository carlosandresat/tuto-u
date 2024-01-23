import { StartNavbar } from "@/components/start-navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SocialNetwork from "@/components/social-networks";

export default function FAQ() {
  return (
    <>
      <StartNavbar />
      <section className="w-screen px-8 translate-y-1/3 md:translate-y-1/2 flex items-center justify-center flex-col">
        <div className="flex flex-col md:flex-row md:justify-between w-full pb-8 md:pb-10">
          <div className="sm:w-full md:w-2/5 md:border-r-2 md:mr-4 md:py-12 mb-7 md:mb-0 md:pr-2">
          <h2 className="md:text-5xl text-3xl text-center w-1/2 md:w-full md:border-b-0 border-b-2 m-auto pb-1 md:pb-0">Pregunta<br />frecuentes</h2>
          </div>
          <div className="w-full md:w-3/4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      <SocialNetwork/>
      </section>
    </>
  );
}
