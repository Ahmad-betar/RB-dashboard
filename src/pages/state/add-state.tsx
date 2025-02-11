import { addStateQuery } from "@/api/state/state-query";
import { addStateFormType } from "@/api/state/type";
import FormDialog from "@/components/form-dialog";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import LoadingSpinner from "@/components/loading";

const AddState = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<addStateFormType>();
  const { mutate, isPending } = addStateQuery();

  const onSubmit = (data: addStateFormType) => {
    mutate(data, {
      onError: (data: any) => {
        toast(data.response.data.result);
      },
      onSuccess: () => {
        reset();
        setOpen(false);
        toast("State added successfully");
      },
    });
  };

  return (
    <div className="flex justify-end">
      <FormDialog
        open={open}
        setOpen={setOpen}
        title="Edit State"
        trigger={"+ Add State"}
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-end"
          >
            <TextField required name="name" control={control} label="Name" />
            <TextField
              required
              name="firstKiloDeliveryCost"
              control={control}
              type="number"
              label="First Kilo Delivery Cost"
            />
            <TextField
              required
              name="deliveryCostPerKilo"
              control={control}
              type="number"
              label="Delivery Cost Per Kilo"
            />

            <Button type="submit" className="w-fit">
              {isPending ? <LoadingSpinner color="white" /> : "Save"}
            </Button>
          </form>
        }
      />
    </div>
  );
};

export default AddState;
