import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Input } from "@/components/ui/input"; // shadcn Input component
import { Label } from "@/components/ui/label"; // shadcn Label component
import { X } from "lucide-react"; // Icon for removing values

interface MultiTagInputProps extends UseControllerProps {
  control: any; // React Hook Form control
  name: string; // Field name
  label: string; // Label for the input
}

const MultiTagInput = ({ control, name, label }: MultiTagInputProps) => {
  const {
    field: { value = [], onChange },
  } = useController({
    control,
    name,
    defaultValue: [], // Default value is an empty array
  });

  const [inputValue, setInputValue] = useState("");

  // Save the input value when the input loses focus (onBlur)
  const handleBlur = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]); // Update React Hook Form value
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
              className="flex items-center px-2 py-1 m-1 text-white bg-black rounded-full"
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
        <Input
          type={"text"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur} // Save value on blur
          className="flex-1 p-1 m-1 border-none outline-none"
          placeholder="Add a value"
        />
      </div>
    </div>
  );
};

export default MultiTagInput;
