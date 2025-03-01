import { editOfferMutation, getOfferQuery } from "@/api/offer/offer-query";
import { addOfferPayload } from "@/api/offer/type";
import LoadingSpinner from "@/components/loading";
import RHFCalendar from "@/components/rhf-calendar";
import RHFTextarea from "@/components/rhf-textarea";
import TextField from "@/components/TextField";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditOffer = () => {
  const { id } = useParams();
  const { data, isLoading } = getOfferQuery(id!);
  const { control, handleSubmit, reset } = useForm();
  const { mutate: Edit, isPending: isEditing } = editOfferMutation();

  const onSubmit = (data: any) => {
    Edit({ id: id as string, payload: data });
  };

  useEffect(() => {
    const values = data?.data;

    if (data && id) {
      reset({
        ...values,
      });
    }
  }, [data, reset, id]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title title="Edit Offer" />

      <Card className="w-full md:w-1/2 mx-auto mt-8">
        <CardContent className="flex flex-col gap-2">
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

          <Button type="submit" disabled={isEditing}>
            Save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default EditOffer;
