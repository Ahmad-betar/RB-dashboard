import { addOfferPayload } from "@/api/offer/type";
import { getProductsQuery } from "@/api/products/products-query";
import RHFCalendar from "@/components/rhf-calendar";
import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { addOfferMutation } from "@/api/offer/offer-query";
import { DevTool } from "@hookform/devtools";

const AddOffer = () => {
  const { data: products } = getProductsQuery();
  const { mutate: Add, isPending: isAdding } = addOfferMutation();
  const { control, handleSubmit } = useForm<addOfferPayload>({
    defaultValues: {
      products: [{} as any],
    },
  });

const { fields, append } = useFieldArray({ name: "products", control });

  const onSubmit = (data: addOfferPayload) => {
    Add(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-4">
        <Title title="Add Offer" />

        <Card className="w-full md:w-1/2">
          <CardContent className="flex flex-col gap-4">
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
                          items={
                            products?.data.map(({ _id, title }) => ({
                              label: title,
                              value: _id,
                            })) ?? []
                          }
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

                <Button type="button" onClick={() => append({} as any)}>
                  Add More Product
                </Button>
              </CardContent>
            </Card>

            <RHFCalendar
              required
              control={control}
              name="expirationDate"
              label="Expiration Date"
            />

            <TextField
              required
              type="number"
              control={control}
              name="numberOfProductsHaveToBuy"
              label="Number Of Products Have To Buy"
              placeholder="Enter..."
            />

            <RHFTextarea
              required
              control={control}
              name="description"
              label="Description"
              placeholder="Write your offer description..."
            />

            <Button type="submit" disabled={isAdding}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
      <DevTool control={control} />
    </form>
  );
};

export default AddOffer;
