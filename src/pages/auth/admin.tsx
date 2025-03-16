import { addAdminQuery } from "@/api/authentication/authentication-query";
import { addAdminType } from "@/api/authentication/type";
import TextField from "@/components/TextField";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

const Admin = () => {
  const { control, handleSubmit, reset } = useForm<addAdminType>();
  const { mutate, isPending } = addAdminQuery();

  const onSubmit = (data: addAdminType) => {
    mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Title title="Add Admin" />

        <Card className="w-3/4 md:w-1/2 mx-auto">
          <CardContent className="space-y-4">
            <TextField
              type="email"
              name="email"
              control={control}
              label="Email"
              placeholder="Enter Email"
            />

            <TextField
              name="name"
              control={control}
              label="Name"
              placeholder="Enter name"
            />

            <TextField
              type="number"
              name="phone"
              control={control}
              label="phone"
              placeholder="Enter phone"
            />

            <TextField
              type="password"
              name="password"
              control={control}
              label="password"
              placeholder="Enter password"
            />

            <Button className="w-full" disabled={isPending}>
              Add Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default Admin;
