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
import {
  addOfferMutation,
  editOfferMutation,
  getOfferQuery,
} from "@/api/offer/offer-query";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/loading";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";

const ActionsOffer = () => {
  const { id } = useParams();
  const { data: products } = getProductsQuery();
  const { data, isLoading } = getOfferQuery(id!);
  const { mutate: Add, isPending: isAdding } = addOfferMutation();
  const { mutate: Edit, isPending: isEditing } = editOfferMutation();
  const { control, handleSubmit, reset } = useForm<addOfferPayload>({
    defaultValues: {
      products: [{ product: "", newPrice: 0, notes: "" }],
      description: "",
      expirationDate: "",
      numberOfProductsHaveToBuy: 0,
    },
  });

  const { fields, append } = useFieldArray({ name: "products", control });

  const onSubmit = (data: addOfferPayload) => {
    id ? Edit({ id, payload: data }) : Add(data);
  };

  useEffect(() => {
    const values = data?.data;

    if (data && id) {
      reset({
        ...values,
        products: values?.products.map(({ newPrice, notes, product }) => ({
          notes,
          product: product._id,
          newPrice: Number(newPrice),
        })),
      });
    }
  }, [data, reset, id]);

  if (isLoading) return <LoadingSpinner />;

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

                <Button
                  type="button"
                  onClick={() =>
                    append({ product: "", newPrice: 0, notes: "" })
                  }
                >
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

            <Button type="submit" disabled={isAdding || isEditing}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
      <DevTool control={control} />
    </form>
  );
};

export default ActionsOffer;
