import { getCustomersQuery } from "@/api/customer/customer-query";
import RHFMultiSelectForm from "@/components/rhf-multi-select";
import RHFTextarea from "@/components/rhf-textarea";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addMessageMutation } from "@/whatsapp/whatsapp-query";
import { FormProvider, useForm } from "react-hook-form";

interface addMessage {
  customerIds: string[];
  message: string;
}

const Messages = () => {
  const methods = useForm<addMessage>();
  const { control, handleSubmit } = methods;

  const { data } = getCustomersQuery();
  const { mutate } = addMessageMutation();

  const onSubmit = (data: addMessage) => {
    mutate(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Add Messages" />

        <Card>
          <CardContent className="flex flex-col gap-4">
            <RHFMultiSelectForm
              name="customerIds"
              label="Customers"
              options={
                data?.customers.map(({ id, name, phone }) => ({
                  label: name + " " + phone,
                  value: id,
                })) ?? []
              }
            />

            <RHFTextarea name="message" control={control} label="message" />

            <Button>Add Message</Button>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Messages;
