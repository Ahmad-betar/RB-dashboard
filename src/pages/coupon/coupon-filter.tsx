import { useFormContext } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RHFSelect from "@/components/rhf-select";
import RHFCheckbox from "@/components/rhf-checkbox";
import { getProductsQuery } from "@/api/products/products-query";

const CouponFilter = () => {
  const { control } = useFormContext();
  const { data } = getProductsQuery();

  const select_items = data?.data.map(({ _id, title }) => ({
    label: title,
    value: _id,
  }));

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Filters</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-4 items-center justify-between !pb-0 mb-4">
            <RHFSelect
              name="product"
              control={control}
              label="Product"
              placeholder="Product"
              items={select_items ?? []}
            />
            <RHFCheckbox
              name="status"
              control={control}
              label="Active"
              className="w-fit"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default CouponFilter;
