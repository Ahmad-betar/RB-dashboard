import { addGovernorateQuery } from "@/api/governorates/governorates-query";
import { addGovernoratesType } from "@/api/governorates/type";
import FormDialog from "@/components/form-dialog";
import LoadingSpinner from "@/components/loading";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AddGovernorates = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<addGovernoratesType>();
  const { mutate, isPending } = addGovernorateQuery();

  const onSubmit = (data: addGovernoratesType) => {
    mutate(
      { name: data.name, stateId: id },
      {
        onError: (data: any) => {
          toast(data.response.data.result);
        },
        onSuccess: () => {
          reset();
          setOpen(false);
          toast("Governorate added successfully");
        },
      }
    );
  };

  return (
    <div className="flex justify-end">
      <FormDialog
        open={open}
        setOpen={setOpen}
        title="Edit Governorate"
        trigger={"+ Add Governorate"}
        body={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-end"
          >
            <TextField required name="name" control={control} label="Name" />

            <Button type="submit" className="w-fit">
              {isPending ? <LoadingSpinner color="white" /> : "Save"}
            </Button>
          </form>
        }
      />
    </div>
  );
};

export default AddGovernorates;
