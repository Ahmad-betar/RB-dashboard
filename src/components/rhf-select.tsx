import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";

interface Props {
  items: { label: string; value: string }[];
  label: string;
  placeholder?: string;
  className?: string;
  labelOnright?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
  name: string;
  control: Control<any, any>;
}
const RHFSelect = ({
  required,
  items,
  placeholder,
  className,
  label,
  labelOnright,
  onValueChange,
  name,
  control,
}: Props) => {
  return (
    <div
      className={cn("flex flex-col justify-between", {
        "flex-row gap-4": labelOnright,
      })}
    >
      {label && (
        <Label
          className={cn("mb-2", {
            "flex items-center font-bold mb-0 p-1": labelOnright,
          })}
        >
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select required={required} {...field} onValueChange={onValueChange}>
            <SelectTrigger
              className={cn("", { "w-full": labelOnright }, className)}
            >
              <SelectValue placeholder={placeholder ?? ""} />
            </SelectTrigger>
            <SelectContent>
              {items.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default RHFSelect;
