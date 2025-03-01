import { manageOfferProductsQuery } from "@/api/offer/offer-query";
import { editOfferPayload } from "@/api/offer/type";
import { getProductsQuery } from "@/api/products/products-query";
import LoadingSpinner from "@/components/loading";
import RHFMultiSelectForm from "@/components/rhf-multi-select";
import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams();
  const { data, isLoading } = getProductsQuery();
  const { control, handleSubmit, watch, setValue } = useForm<editOfferPayload>({
    defaultValues: { products: [{}], action: "add" },
  });
  const { mutate, isPending } = manageOfferProductsQuery();
  const { fields, append } = useFieldArray({ name: "products", control });

  const action = watch("action");

  const products = data?.data.map(({ _id, title }) => ({
    label: title,
    value: _id,
  }));

  const onSubmit = (payload: any) => {
    mutate({ id: id as string, payload });
  };

  useEffect(() => {
    setValue("products", []);
  }, [action]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title title="Edit Products" />

      <Card className="w-full md:w-1/2 mx-auto mt-8">
        <CardContent className="flex flex-col gap-4">
          <RHFSelect
            control={control}
            name="action"
            label="Action"
            items={[
              { label: "remove", value: "remove" },
              { label: "add", value: "add" },
            ]}
            placeholder="Action"
          />

          {action === "remove" && (
            <RHFMultiSelectForm
              name="products"
              control={control}
              label="Products"
              options={products ?? []}
            />
          )}

          {action === "add" && (
            <Card>
              <CardContent className="flex flex-col gap-4">
                {fields.map((_product, id) => (
                  <Card key={id}>
                    <CardContent className="flex flex-col gap-4">
                      <div className="flex gap-2">
                        <RHFSelect
                          required
                          control={control}
                          name={`products.${id}.product`}
                          label="Products"
                          placeholder="Enter Product..."
                          items={products ?? []}
                        />

                        <TextField
                          required
                          type="number"
                          control={control}
                          name={`products.${id}.newPrice`}
                          label="New Price"
                          placeholder="Enter a New Price..."
                        />
                      </div>

                      <RHFTextarea
                        required
                        control={control}
                        name={`products.${id}.notes`}
                        label="Notes"
                      />
                    </CardContent>
                  </Card>
                ))}

                {action === "add" && (
                  <Button onClick={() => append({} as any)}>Add Product</Button>
                )}
              </CardContent>
            </Card>
          )}

          <Button type="submit" disabled={isPending}>
            Save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default EditProducts;
