import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Control, Controller } from "react-hook-form";

const RHFCheckbox = ({
  name,
  control,
  label,
}: {
  name: string;
  label: string;
  control: Control<any, any>;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            id={name}
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
};

export default RHFCheckbox;
