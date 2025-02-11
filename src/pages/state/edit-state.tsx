import { editStateQuery } from "@/api/state/state-query";
import { editStateFormType } from "@/api/state/type";
import FormDialog from "@/components/form-dialog";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import LoadingSpinner from "@/components/loading";

const StateForm = ({ _id }: { _id: string }) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = editStateQuery();

  const { control, handleSubmit, reset } = useForm<editStateFormType>();

  const onSubmit = (data: editStateFormType) => {
    mutate(
      { ...data, _id },
      {
        onError: () => {
          toast("Failed to update state");
        },
        onSuccess: () => {
          setOpen(false);
          reset();
          toast("State updated successfully");
        },
      }
    );
  };

  return (
    <FormDialog
      open={open}
      setOpen={setOpen}
      title="Edit State"
      trigger={<Pencil />}
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-end"
        >
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
  );
};

export default StateForm;
