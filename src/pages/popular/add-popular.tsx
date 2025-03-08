import { useAddPopularMutation } from "@/api/popular/popular-query";
import { getProductsQuery } from "@/api/products/products-query";
import RHFSelect from "@/components/rhf-select";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddPopular = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { data } = getProductsQuery();
  const { mutate: add, isPending: isAdding } = useAddPopularMutation();

  const onSubmit = (data: any) => {
    add(data, {
      onSuccess: () => {
        navigate(-1);
        toast("Added successfully");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 h-full">
          <RHFSelect
            required
            label="Product"
            name="product"
            control={methods.control}
            items={
              data?.data.map(({ _id, title }) => ({
                label: title,
                value: _id,
              }))!
            }
          />
          <TextField
            required
            type="number"
            control={methods.control}
            name="orderNumber"
            label="Item Order"
          />
          <Button variant={"outline"} disabled={isAdding}>
            Add
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddPopular;
