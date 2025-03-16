import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { requestPasswordResetQuery } from "@/api/authentication/authentication-query";
import TextField from "@/components/TextField";
import { Card, CardContent } from "@/components/ui/card";

const RequestPasswordResetForm = () => {
  const { control, handleSubmit } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = requestPasswordResetQuery();

  const onSubmit = (data: { email: string }) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center w-screen h-screen bg-gray-50"
    >
      <Card className="md:w-1/2 p-4">
        <CardContent className="flex flex-col justify-between gap-8">
          <TextField
            required
            type="email"
            control={control}
            name="email"
            label="Email"
          />

          <Button type="submit" disabled={isPending} className="w-full">
            Request Password Reset
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default RequestPasswordResetForm;
