import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ReactNode } from "react";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  uploadImageQuery,
  uploadVideoQuery,
} from "@/api/uplaod-file.ts/uplaod-file";
import LoadingSpinner from "./loading";
import { API_BASE_URL } from "@/api/axios";

interface RHFInputFileProps extends InputProps {
  name: string;
  Icon: ReactNode;
  id: string;
  label?: string;
  type: "image" | "audio" | "video";
}

const RHFIileInput = ({
  Icon,
  id,
  name,
  label,
  type,
  ...props
}: RHFInputFileProps) => {
  const { mutate: addImage, isPending: isAddingImage } = uploadImageQuery({});
  const { mutate: addVideo, isPending: isAddingVideo } = uploadVideoQuery({});
  const { control, setValue } = useFormContext();
  const file = useWatch({ name, control });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    const newfile = e.target.files?.[0];
    if (!newfile) return;

    if (type === "image") {
      formData.append("image", newfile);

      addImage(formData, {
        onSuccess: (data) => {
          setValue(name, data.imageUrl);
        },
      });
    } else {
      formData.append("video", newfile);

      addVideo(formData, {
        onSuccess: (data) => {
          setValue(name, data.videoUrl);
        },
      });
    }
  };

  const removeFile = () => {
    setValue(name, null); // Set the value to null or undefined to remove the file
  };

  if (file) {
    const imageUrl = API_BASE_URL + file;

    return (
      <div
        className={cn("flex flex-col w-full gap-4 justify-between md:w-fit")}
      >
        {label && <Label>{label}</Label>}
        <Button
          type="button"
          variant={"outline"}
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          onClick={removeFile} // Use the removeFile function here
        >
          <X className="stroke-black" />
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
              {isAddingImage || isAddingVideo ? <LoadingSpinner /> : Icon}
              <Input
                id={id}
                type="file"
                accept={type === "video" ? "video/*" : "image/*"}
                className="hidden"
                name={name}
                ref={ref}
                onChange={changeHandler}
                disabled={isAddingImage || isAddingVideo}
                {...props}
              />
            </Label>
          </div>
        )}
      />
    </>
  );
};

export default RHFIileInput;
