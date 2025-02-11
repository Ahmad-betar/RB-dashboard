import { addCityQuery } from "@/api/city/city-query";
import { addCityType } from "@/api/city/type";
import FormDialog from "@/components/form-dialog";
import LoadingSpinner from "@/components/loading";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AddCity = () => {
  const { GovernorateId } = useParams();
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<addCityType>();
  const { mutate, isPending } = addCityQuery();

  const onSubmit = (data: addCityType) => {
    mutate(
      { name: data.name, governorateId: GovernorateId },
      {
        onError: (data: any) => {
          toast(data.response.data.result);
        },
        onSuccess: () => {
          reset();
          setOpen(false);
          toast("City added successfully");
        },
      }
    );
  };

  return (
    <div className="flex justify-end">
      <FormDialog
        open={open}
        setOpen={setOpen}
        title="Edit City"
        trigger={"+ Add City"}
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

export default AddCity;
