import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addMessageMutation } from "@/api/whatsapp/whatsapp-query";
import { FormProvider, useForm } from "react-hook-form";
import { useOffersTemplatesQuery } from "@/api/offers-template/offers-template-query";
import RHFSelect from "@/components/rhf-select";
import TextField from "@/components/TextField";
import MultiTagInput from "@/components/rhf-multi-tag-input";

interface addMessage {
  customerIds: string[];
  message: string;
}

const Messages = () => {
  const methods = useForm<addMessage>();
  const { data, isLoading } = useOffersTemplatesQuery();
  const { mutate, isPending, reset } = addMessageMutation();

  const { control, handleSubmit } = methods;

  const onSubmit = (data: addMessage) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Title title="Add Messages" />

        <Card>
          <CardContent className="flex flex-col gap-4">
            <RHFSelect
              disabled={isLoading}
              control={control}
              name="offersTemplateId"
              label="Offers Template"
              placeholder="Offers Template"
              items={
                data?.data.map(({ name, _id }) => ({
                  label: name,
                  value: _id,
                })) ?? []
              }
            />

            <MultiTagInput
              control={control}
              name="variables"
              label="variables"
            />

            <TextField
              name="urlVariable"
              control={control}
              label="URL Variable"
              placeholder="URL Variable"
            />
            <Button disabled={isPending}>Send Message</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Messages;
