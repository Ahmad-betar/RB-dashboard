import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AddOperatorRequest } from "@/api/operators/type";
import { addOperatorQuery } from "@/api/operators/operators-query";
import TextField from "@/components/TextField";
import Title from "@/components/title";
import { Card, CardContent } from "@/components/ui/card";

const AddOperatorForm = () => {
  const { control, handleSubmit, reset } = useForm<AddOperatorRequest>({});

  const { mutate, isPending } = addOperatorQuery();

  const onSubmit = (data: AddOperatorRequest) => {
    mutate(data, {
      onSuccess() {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto"
    >
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Title title="Add Operator" />

          <div className="space-y-2">
            <TextField required control={control} label="Name" name="name" />
          </div>

          <div className="space-y-2">
            <TextField
              required
              type="email"
              control={control}
              label="Email"
              name="email"
            />
          </div>

          <div className="space-y-2">
            <TextField
              required
              type="number"
              control={control}
              label="Phone"
              name="phone"
            />
          </div>

          <div className="space-y-2">
            <TextField
              required
              type="password"
              control={control}
              label="Password"
              name="password"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Adding..." : "Add Operator"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddOperatorForm;
