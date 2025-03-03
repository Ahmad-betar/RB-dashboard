import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";

interface ComboboxItem {
  value: string;
  label: string;
}

interface RHFComboboxProps {
  name: string;
  control?: any;
  data: ComboboxItem[];
  label?: string;
  required?: boolean; // Add this line
}

export function RHFCombobox({
  name,
  control,
  data,
  label,
  required,
}: RHFComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }} // Add validation rules
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label>
            {label}
          </Label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {field.value
                  ? data.find((item) => item.value === field.value)?.label
                  : label || "Select an item..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value
                              ? undefined
                              : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === item.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {fieldState.error && (
            <span className="text-red-500">{fieldState.error.message}</span> // Display error message
          )}
        </div>
      )}
    />
  );
}
