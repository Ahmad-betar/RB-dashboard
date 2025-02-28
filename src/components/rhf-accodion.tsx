import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface AccordionProps {
  content: React.ReactNode;
  trigger: string;
}
const RHFAccordion = ({ content, trigger }: AccordionProps) => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between !pb-0 mb-4">
            {content}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default RHFAccordion;
