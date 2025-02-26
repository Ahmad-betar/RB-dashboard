import React from "react";
import { Control, Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

const RHFCalendar = ({
  control,
  name,
  label,
}: {
  control: Control<any, any>;
  name: string;
  label: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn("flex flex-col flex-grow w-full", {})}>
          {label && (
            <Label className={cn("mb-4")}>
              {label}
            </Label>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {field.value ? format(field.value, "PPP") : "Start Date"}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};

export default RHFCalendar;
