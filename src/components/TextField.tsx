import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldError } from "react-hook-form";

interface TextFieldProps extends InputProps {
  label: string;
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  labelOnRight?: boolean;
  rules?: any; // Validation rules
  error?: FieldError | undefined; // Error object from react-hook-form
}

const TextField = ({
  control,
  name,
  label,
  placeholder,
  labelOnRight,
  rules,
  error,
  ...props
}: TextFieldProps) => {
  return (
    <div
      className={cn("flex flex-col flex-grow w-full", {
        "flex-row items-center": labelOnRight,
      })}
    >
      {label && (
        <Label className={cn("mb-4", { "mb-0 font-bold": labelOnRight })}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules} // Pass validation rules
        render={({ field }) => (
          <div className="w-full">
            <Input
              placeholder={placeholder || ""}
              className={cn("mr-4", {
                "border-red-500": error, // Add red border if there's an error
              })}
              {...field}
              {...props}
            />
            {error && (
              <p className="text-sm text-red-500 mt-1">{error.message}</p> // Display error message
            )}
          </div>
        )}
      />
    </div>
  );
};

export default TextField;
