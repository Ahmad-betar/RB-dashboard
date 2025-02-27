import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextField from "@/components/TextField";
import RHFSelect from "@/components/rhf-select";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

interface ProductFiltersProps {
  productTypes: { _id: string; name: string }[];
}

const ProductFilters = ({ productTypes }: ProductFiltersProps) => {
  const { control } = useFormContext();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Filters</AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TextField
            name="search"
            control={control}
            label="Search"
            placeholder="Search"
          />

          <RHFSelect
            control={control}
            name="sort"
            label="Sort By"
            placeholder="Sort by"
            items={[
              { label: "Ascending", value: "name:asc" },
              { label: "Descending", value: "name:desc" },
            ]}
          />

          <RHFSelect
            control={control}
            name="productType"
            label="Product Type"
            placeholder="Product Type"
            items={productTypes.map(({ _id, name }) => ({
              label: name,
              value: _id,
            }))}
          />

          <div>
            <Label>Price Range</Label>
            <div className="flex mt-4 gap-2">
              <TextField
                control={control}
                name="minPrice"
                label=""
                type="number"
                placeholder="min Price"
              />

              <TextField
                control={control}
                name="maxPrice"
                label=""
                placeholder="max price"
                type="number"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductFilters;
