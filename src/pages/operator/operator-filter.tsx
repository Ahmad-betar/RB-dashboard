import TextField from "@/components/TextField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFormContext } from "react-hook-form";
const OperatorFilter = () => {
  const { control } = useFormContext();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent className="!pb-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField name="name" control={control} label="Name" />
          <TextField
            type="number"
            name="phone"
            control={control}
            label="Phone"
          />
          <TextField name="email" control={control} label="Email" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OperatorFilter;
