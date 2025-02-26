import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ReactNode } from "react";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { uploadImageQuery } from "@/api/uplaod-file.ts/uplaod-file";
import { API_BASE_URL } from "@/api/axios";
import LoadingSpinner from "./loading";

interface RHFInputFileProps extends InputProps {
  name: string;
  Icon: ReactNode;
  id: string;
  label?: string;
  //   keyId: number;
  type: "image" | "audio" | "video";
}

const RHFIileInput = ({
  Icon,
  id,
  name,
  label,
  //   keyId,
  type,
  ...props
}: RHFInputFileProps) => {
  const { mutate, isPending } = uploadImageQuery({});
  const { control, setValue } = useFormContext();
  const file = useWatch({ name, control });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    const newfile = e.target.files?.[0];
    if (!newfile) return;

    if (type === "image") {
      formData.append("image", newfile);
    }

    mutate(formData, {
      onSuccess: (data) => {
        setValue(name, data.imageUrl);
      },
    });
  };

  if (file) {
    return (
      <div
        className={cn("flex flex-col w-full gap-4 justify-between md:w-fit")}
      >
        {label && <Label>{label}</Label>}
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            setValue(name, undefined);
            //   update(keyId, undefined);
          }}
        >
          {/* <img src={API_BASE_URL + watch(name)} /> */}
          <X />
        </Button>
      </div>
    );
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { name, ref, value } }) => (
          <div className={cn({ "flex flex-col gap-4 justify-between": label })}>
            {label && <Label>{label}</Label>}
            <Label
              htmlFor={id}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer w-full"
              )}
            >
              {isPending ? <LoadingSpinner /> : Icon}
              <Input
                id={id}
                type="file"
                className="hidden"
                name={name}
                ref={ref}
                // value={value}
                onChange={changeHandler}
                disabled={isPending}
                // {...field}
                // onChange={onChange}
                {...props}
              />
            </Label>
          </div>
        )}
      />
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default RHFIileInput;
