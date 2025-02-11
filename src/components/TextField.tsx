import { Input, InputProps } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";

interface TextFieldProps extends InputProps {
  label: string;
  control: Control<any, any>;
  name: string;
  placeholder?: string;
}

const TextField = ({
  control,
  name,
  label,
  placeholder,
  ...props
}: TextFieldProps) => {
  return (
    <div className={cn("flex flex-grow gap-4 !items-center w-full")}>
      <Label className="font-semibold">{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input {...field} placeholder={placeholder} {...props} />
        )}
      />
    </div>
  );
};

export default TextField;
