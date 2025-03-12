import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Image, Video, X } from "lucide-react";
import {
  uploadImageQuery,
  uploadVideoQuery,
} from "@/api/uplaod-file.ts/uplaod-file";
import LoadingSpinner from "./loading";

interface RHFInputFileProps extends InputProps {
  name: string;
  id: string;
  label?: string;
  type: "image" | "video";
  className?: string;
}

const RHFIileInput = ({
  id,
  name,
  label,
  type,
  className,
  ...props
}: RHFInputFileProps) => {
  const { mutate: addImage, isPending: isAddingImage } = uploadImageQuery();
  const { mutate: addVideo, isPending: isAddingVideo } = uploadVideoQuery();
  const { control, setValue } = useFormContext();
  const file = useWatch({ name, control });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    const newfiles = e.target.files?.item(0);
    if (!newfiles) return;

    if (type === "image") {
      formData.append("image", newfiles);

      addImage(formData, {
        onSuccess: (data) => {
          setValue(name, data.image);
        },
      });
    } else {
      formData.append("video", newfiles);

      addVideo(formData, {
        onSuccess: (data) => {
          setValue(name, data.video);
        },
      });
    }
  };

  if (file) {
    return (
      <div className={cn("flex flex-col w-full gap-4 justify-between")}>
        {label && <Label>{label}</Label>}

        <div className="flex gap-2 w-full">
          <Button
            type="button"
            variant={"outline"}
            style={{
              backgroundImage: `url('${file.url}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
            }}
            onClick={() => setValue(name, undefined)}
          >
            <X className="stroke-red-500" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref } }) => (
          <div className={cn({ "flex flex-col gap-4 justify-between": label })}>
            {label && <Label>{label}</Label>}
            <Label
              htmlFor={id}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer w-full"
              )}
            >
              {isAddingImage || isAddingVideo ? (
                <LoadingSpinner />
              ) : type === "image" ? (
                <Image />
              ) : (
                <Video />
              )}
              <Input
                id={id}
                type="file"
                accept={type === "video" ? "video/*" : "image/*"}
                className="hidden"
                // name={name}
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
