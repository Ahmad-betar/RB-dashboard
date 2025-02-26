import {
  createProductType,
  getParentProductTypesQuery,
} from "@/api/product-type/product-type-query";
import FormDialog from "@/components/form-dialog";
import LoadingSpinner from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MultipleValueTextInput from "react-multivalue-text-input";
import RHFSelect from "@/components/rhf-select";
import { addProductTypeForm } from "@/api/product-type/type";

const AddProductType = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset, setValue } =
    useForm<addProductTypeForm>({
      defaultValues: { parentProductTypeId: null },
    });
  const { mutate, isPending } = createProductType();
  const { data } = getParentProductTypesQuery();

  const onSubmit = (data: addProductTypeForm) => {
    mutate(data, {
      onError: (data: any) => {
        toast(data.response.data.result);
      },
      onSuccess: () => {
        reset();
        setOpen(false);
        toast("Product Type added successfully");
      },
    });
  };
  return (
    <div className="flex justify-end">
      <FormDialog
        open={open}
        setOpen={setOpen}
        title="Edit Product Type"
        trigger={"+ Add Product Type"}
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-end"
          >
            <RHFSelect
              control={control}
              name="parentProductTypeId"
              items={
                data?.productTypes.map(({ name, _id }) => ({
                  label: name,
                  value: _id,
                }))!
              }
              onValueChange={(value: string) =>
                setValue("parentProductTypeId", value)
              }
              label="Parent Product Type"
              className="w-full"
            />

            <MultipleValueTextInput
              onItemAdded={(_item, allItems) => setValue("names", allItems)}
              onItemDeleted={(_item, allItems) => setValue("names", allItems)}
              shouldAddOnBlur={true}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              label="Items"
              name="item-input"
              placeholder="Enter whatever items you want"
            />

            <Button type="submit" className="w-fit">
              {isPending ? <LoadingSpinner color="white" /> : "Save"}
            </Button>
          </form>
        }
      />
    </div>
  );
};

export default AddProductType;
