import { useFormContext } from "react-hook-form";
import RHFCalendar from "@/components/rhf-calendar";
import TextField from "@/components/TextField";
import RHFAccordion from "@/components/rhf-accodion";
import { GetOrdersParams } from "@/api/order/type";
// import RHFCheckbox from "@/components/rhf-checkbox";

const OrderFilters = () => {
  const { control } = useFormContext<GetOrdersParams>();

  return (
    <RHFAccordion
      trigger="Filters"
      content={
        <>
          <>
            <TextField
              control={control}
              name="name"
              label="Name"
              placeholder="Enter a Name"
            />

            <TextField
              control={control}
              name="phone"
              label="Phone Number"
              placeholder="Enter a Phone Number"
            />

            <TextField
              control={control}
              name="orderId"
              label="Order ID"
              placeholder="Enter a Order ID"
            />

            <TextField
              control={control}
              name="productTitle"
              label="Product Title"
              placeholder="Enter a Product Title"
            />

            <RHFCalendar
              name="startDate"
              control={control}
              label="Start Date"
            />

            <RHFCalendar name="endDate" control={control} label="End Date" />

            {/* <TextField
              type="number"
              control={control}
              label="Min Amount"
              name="minAmount"
              placeholder="Enter min amount"
            />

            <TextField
              type="number"
              control={control}
              label="Max Amount"
              placeholder="Enter max amount"
              name="maxAmount"
            />
          </div>

          <div className="flex gap-4 justify-end my-4">
            <RHFCheckbox
              control={control}
              name="isUrgent"
              label="Urgent Orders"
            /> */}

            {/* <RHFCheckbox control={control} name="isPaid" label="Paid Orders" /> */}
          </>
        </>
      }
    />
  );
};

export default OrderFilters;
