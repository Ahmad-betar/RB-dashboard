import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Input } from "@/components/ui/input"; // shadcn Input component
import { Label } from "@/components/ui/label"; // shadcn Label component
import { X } from "lucide-react"; // Icon for removing values
import { Button } from "./ui/button";

interface MultiTagInputProps extends UseControllerProps {
  control: any; // React Hook Form control
  name: string; // Field name
  label: string; // Label for the input
  type?: string;
}

const MultiTagInput = ({ control, name, label, type }: MultiTagInputProps) => {
  const {
    field: { value = [], onChange },
  } = useController({
    control,
    name,
    defaultValue: [], // Default value is an empty array
  });

  const [inputValue, setInputValue] = useState("");

  // Save the input value when the input loses focus (onBlur)
  const addHandler = () => {
    var InputValue: number | string = inputValue.trim();

    if (type === "number") {
      InputValue = Number(InputValue);
    }

    if (value.includes(InputValue)) {
      setInputValue("");
      return;
    }

    if (inputValue.trim()) {
      onChange([...value, InputValue]); // Update React Hook Form value
      setInputValue(""); // Clear input
    }
  };

  // Remove a value from the list
  const handleRemove = (index: number) => {
    const newValues = value.filter((_: any, i: number) => i !== index);
    onChange(newValues); // Update React Hook Form value
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-col items-start flex-wrap p-2 border rounded-md">
        {/* Display the list of values as tags */}
        <div className="flex gap-0.5 flex-wrap">
          {value.map((value: string, index: number) => (
            <div
              key={index}
              className="flex items-center px-1 py-0.5 m-1 text-white bg-black rounded-sm text-sm"
            >
              {value}
              <button
                type="button"
                className="ml-2 text-white"
                onClick={() => handleRemove(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Input field */}
        <div className="w-full border flex rounded-md shadow-sm">
          <Input
            type={type || "text"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={addHandler} // Save value on blur
            className="border-none shadow-none rounded-none focus-visible:ring-0 rounded-l-md"
            placeholder="Add a value"
          />
          <Button
            variant={"outline"}
            className="border-none rounded-none shadow-none"
            onClick={addHandler}
            type="button"
          >
            + Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiTagInput;
