import { resetPasswordQuery } from "@/api/authentication/authentication-query";
import { resetPassword } from "@/api/authentication/type";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const { control, handleSubmit } = useForm<resetPassword>();
  const { mutate, isPending } = resetPasswordQuery();

  const onSubmit = (data: resetPassword) => {
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
            type="text"
            label="Token"
            placeholder="Enter your token"
            name="token"
            control={control}
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            type="password"
            control={control}
            name="newPassword"
            required
          />
          <Button disabled={isPending} type="submit">
            save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ResetPassword;
