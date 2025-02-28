import RHFAccordion from "@/components/rhf-accodion";
import TextField from "@/components/TextField";
import { useFormContext } from "react-hook-form";
const OperatorFilter = () => {
  const { control } = useFormContext();
  return (
    <RHFAccordion
      trigger="Filters"
      content={
        <>
          <TextField
            name="name"
            control={control}
            label="Name"
            placeholder="Enter Name"
          />

          <TextField
            type="number"
            name="phone"
            control={control}
            label="Phone"
            placeholder="Enter Phone"
          />

          <TextField
            name="email"
            control={control}
            label="Email"
            placeholder="Enter Email"
          />
        </>
      }
    />
  );
};

export default OperatorFilter;
