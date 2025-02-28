import { getProductsQuery } from "@/api/products/products-query";
import { RHFCombobox } from "@/components/rhf-combobox";
import Title from "@/components/title";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import TextField from "@/components/TextField";
import RHFTextarea from "@/components/rhf-textarea";
import { Button } from "@/components/ui/button";
import { addToCustomerCartType } from "@/api/cutomer-cart/type";
import { addToCustomerCartQuery } from "@/api/cutomer-cart/customer-cart-query";

const AddCart = () => {
  const { control, handleSubmit } = useForm<addToCustomerCartType>();
  const { data } = getProductsQuery();
  const { mutate, isPending } = addToCustomerCartQuery();

//   const product = watch("productId");

//   const sizes = data?.data.filter(({ _id }) => product === _id)[0];

  const onSubmit = (data: addToCustomerCartType) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Title title="Add Cart" />

        <Card className="w-1/2 mx-auto">
          <CardContent className="flex  flex-col gap-2">
            <RHFCombobox
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

            <TextField
              required
              type="number"
              name="size"
              control={control}
              label="Size"
              placeholder="Set Size"
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

            <TextField
              required
              type="number"
              name="phone"
              control={control}
              label="Phone"
              placeholder="Set phone"
            />
            <TextField
              required
              type="email"
              name="email"
              control={control}
              label="Email"
              placeholder="Set email"
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
