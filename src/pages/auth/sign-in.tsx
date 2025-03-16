import { loginQuery } from "@/api/authentication/authentication-query";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signin = () => {
  const { control, handleSubmit } = useForm();
  const { mutate, isPending } = loginQuery();

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center w-full h-screen ">
        <Card className="md:w-1/2 p-4">
          <CardContent className="flex flex-col justify-between gap-4">
            <TextField control={control} name="email" label="Email" />
            <TextField
              control={control}
              type="password"
              name="password"
              label="password"
            />

            <Link to={"/request-reset-password"} className="underline">
              forget Password?
            </Link>

            <Button className="w-full self-center" disabled={isPending}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default Signin;
