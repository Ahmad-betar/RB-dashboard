import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CreatableSelect from "react-select/creatable";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

const MultiValueInput = ({
  label,
  onChange,
  setValue,
  value,
}: {
  label: string;
  onChange: (newValue: string[]) => void;
  setValue: any;
  value: Option[];
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev: any) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const handleBlur = () => {
    if (inputValue) {
      setValue((prev: any) => [...prev, createOption(inputValue)]);
      setInputValue("");
    }
  };

  useEffect(() => {
    onChange(value.map(({ value }) => value));
  }, [value]);

  return (
    <div className="flex flex-col flex-grow w-full">
      <Label className={cn("mb-4")}>{label}:</Label>

      <CreatableSelect
        components={{ DropdownIndicator: null }}
        inputValue={inputValue}
        isClearable
        isMulti
        required
        menuIsOpen={false}
        onChange={(newValue) => {
          setValue(newValue as Option[]);
        }}
        onInputChange={(newValue) => {
          Number(newValue) ? setInputValue(newValue) : undefined;
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    </div>
  );
};

export default MultiValueInput;
