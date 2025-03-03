import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Control, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

const RHFCheckbox = ({
  name,
  control,
  label,
  className,
}: {
  name: string;
  label: string;
  className?: string;
  control: Control<any, any>;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn("flex gap-2", className)}>
          <Checkbox
            defaultChecked
            id={name}
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <Label htmlFor={name}>{label}</Label>
        </div>
      )}
    />
  );
};

export default RHFCheckbox;
