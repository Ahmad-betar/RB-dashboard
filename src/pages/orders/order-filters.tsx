import { useFormContext } from "react-hook-form";

import RHFCalendar from "@/components/rhf-calendar";
import TextField from "@/components/TextField";
import RHFCheckbox from "@/components/rhf-checkbox";

const OrderFilters = () => {
  const { control } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <RHFCalendar name="startDate" control={control} label="Start Date" />

        <RHFCalendar name="endDate" control={control} label="End Date" />

        <TextField control={control} label="Min Amount" name="minAmount" />

        <TextField control={control} label="Max Amount" name="maxAmount" />
      </div>

      <div className="flex gap-4 justify-end my-4">
        <RHFCheckbox control={control} name="isUrgent" label="Urgent Orders" />

        <RHFCheckbox control={control} name="isPaid" label="Paid Orders" />
      </div>
    </>
  );
};

export default OrderFilters;
