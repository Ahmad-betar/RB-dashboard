import {
  getOneProductsQuery,
  getProductsQuery,
} from "@/api/products/products-query";
import { RHFCombobox } from "@/components/rhf-combobox";
import Title from "@/components/title";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import TextField from "@/components/TextField";
import RHFTextarea from "@/components/rhf-textarea";
import { Button } from "@/components/ui/button";
import { addToCustomerCartType } from "@/api/cutomer-cart/type";
import { addToCustomerCartQuery } from "@/api/cutomer-cart/customer-cart-query";
import RHFSelect from "@/components/rhf-select";

const AddCart = () => {
  const { control, handleSubmit, watch } = useForm<addToCustomerCartType>();
  const productId = watch("productId");

  const { data } = getProductsQuery();
  const { data: product } = getOneProductsQuery(productId);
  const { mutate, isPending } = addToCustomerCartQuery();

  const sizes = product?.data.availableSizes;

  const onSubmit = (data: addToCustomerCartType) => {
    mutate(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Title title="Add Cart" />

        <Card className="w-full md:w-1/2 mx-auto">
          <CardContent className="flex  flex-col gap-2">
            <RHFCombobox
              required
              name="productId"
              control={control}
              label="Product"
              data={
                data?.data.map((product) => ({
                  label: product.title,
                  value: product._id,
                })) ?? []
              }
            />

            <RHFSelect
              required
              disabled={!sizes}
              name="size"
              control={control}
              label="Size"
              placeholder="Set Size"
              items={
                sizes?.map((size) => ({ label: size, value: String(size) })) ??
                []
              }
            />

            <TextField
              required
              type="number"
              name="quantity"
              control={control}
              label="Quantity"
              placeholder="Set Quantity"
            />

            <RHFTextarea
              required
              name="notes"
              control={control}
              label="Note"
              placeholder="Add any note"
            />

            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default AddCart;
