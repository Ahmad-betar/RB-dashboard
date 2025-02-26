import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";

interface TextFieldProps extends InputProps {
  label: string;
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  labelOnRight?: boolean;
}

const TextField = ({
  control,
  name,
  label,
  placeholder,
  labelOnRight,
  ...props
}: TextFieldProps) => {
  return (
    <div
      className={cn("flex flex-col flex-grow w-full", {
        "flex-row items-center": labelOnRight,
      })}
    >
      <Label className={cn("mb-4", { "mb-0 font-bold": labelOnRight })}>
        {label}:
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            placeholder={placeholder || ""}
            className="mr-4"
            {...field}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default TextField;
