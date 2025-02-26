import { Label } from "./ui/label";
import { Textarea, TextareaProps } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";

interface RHFTextAreaProps extends TextareaProps {
  label: string;
  //   placeholder?: string;
  control: Control<any, any>;
  labelOnRight?: boolean;
  name: string;
}
const RHFTextarea = ({
  label,

  labelOnRight,
  control,
  name,
  ...props
}: RHFTextAreaProps) => {
  return (
    <div
      className={cn("flex flex-col", { "flex-row items-center": labelOnRight })}
    >
      <Label className={cn("mb-4", { "mb-0 font-bold": labelOnRight })}>
        {label}:
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea className="mr-4" {...field} {...props} />
        )}
      />
    </div>
  );
};

export default RHFTextarea;
