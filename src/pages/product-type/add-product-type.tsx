import {
  createProductType,
  getParentProductTypesQuery,
} from "@/api/product-type/product-type-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import RHFSelect from "@/components/rhf-select";
import { addProductTypeForm } from "@/api/product-type/type";
import Title from "@/components/title";
import { Card, CardContent } from "@/components/ui/card";
import TextField from "@/components/TextField";
// import RHFIileInput from "@/components/rhf-file-input";
import { Button } from "@/components/ui/button";
import RHFIileInput from "@/components/rhf-file-input";

const AddProductType = () => {
  const methods = useForm<addProductTypeForm>({});
  const { control, handleSubmit, reset } = methods;
  const { mutate, isPending } = createProductType();
  const { data } = getParentProductTypesQuery();

  const selectItems = data?.productTypes.map(({ name, _id }) => ({
    label: name,
    value: _id,
  }));

  const onSubmit = (data: addProductTypeForm) => {
    mutate(
      { ...data, image: data.image[0] },
      {
        onError: (data: any) => {
          toast(data.response.data.result);
        },
        onSuccess: () => {
          reset();
          toast("Product Type added successfully");
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          <Title title="Add Product Type" />

          <Card className="pt-4 w-full md:w-1/2 mx-auto">
            <CardContent className="flex flex-col gap-4">
              <TextField
                required
                control={control}
                name="name"
                label="Name"
                placeholder="Enter Name"
              />

              <RHFSelect
                control={control}
                name="parentProductTypeId"
                items={selectItems ?? []}
                label="Parent Product Type"
                placeholder="Select Parent Product Type"
              />

              <RHFIileInput
                name="image"
                id="image"
                type="image"
                label="Image"
              />

              <Button disabled={isPending}>Add</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProductType;
