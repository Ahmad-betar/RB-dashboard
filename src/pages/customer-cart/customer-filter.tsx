import { useFormContext } from "react-hook-form";
import { CartFiltersType } from "@/api/cutomer-cart/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextField from "@/components/TextField";

const CartFilters = () => {
  const { control } = useFormContext<CartFiltersType>();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between !pb-0 mb-4">
          <TextField
            label="Email"
            control={control}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <TextField
            label="Phone"
            control={control}
            type="number"
            name="phone"
            placeholder="Enter phone"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CartFilters;
