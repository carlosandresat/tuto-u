import { StartNavbar } from "@/components/start-navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import FaqTitle from "@/components/title-faq";
import SocialNetwork from "@/components/social-networks";

export default function FAQ() {
  return (
    <>
      <StartNavbar />
      <section className="min-h-screen max-w-screen-2xl px-8 flex items-center justify-center flex-col md:flex-row ">
        <div className="w-full md:w-[calc(50%-10rem)] md:border-r-2 md:border-b-0 border-b-2 md:mr-4 md:py-[calc(10vw-5rem)] mb-7 md:mb-0">
          <FaqTitle/>
        </div>
        <div className="w-[calc(100%-1.5rem)] md:w-[calc(50%+5rem)]">
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
      </section>
      <SocialNetwork/>
    </>
  );
}
