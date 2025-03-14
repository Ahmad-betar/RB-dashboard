import { getCustomersQuery } from "@/api/customer/customer-query";
import { createTempOrderMutation } from "@/api/cutomer-cart/order/temp-orders-query";
import RHFCheckbox from "@/components/rhf-checkbox";
import { RHFCombobox } from "@/components/rhf-combobox";
// import RHFSelect from "@/components/rhf-select";
import RHFTextarea from "@/components/rhf-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";

const AdminOrder = () => {
  const { control, handleSubmit } = useForm();

  const { data } = getCustomersQuery();
  const { mutate, isPending } = createTempOrderMutation();

  const customers = data?.customers.map(({ phone }) => ({
    label: String(phone),
    value: String(phone),
  }));

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Card className="w-full md:w-1/2 mx-auto">
          <CardContent className="flex  flex-col gap-2">
            {/* <RHFSelect
              required
              name="customerPhone"
              control={control}
              label="Phone Number"
              placeholder="Set Customer Number"
              items={customers ?? []}
            /> */}
            <RHFCombobox
              required
              name="customerPhone"
              control={control}
              label="Phone Number"
              data={customers ?? []}
            />

            <RHFTextarea
              required
              name="adminNotes"
              control={control}
              label="Note"
              placeholder="Add any note"
            />

            <RHFCheckbox name="isUrgent" control={control} label="is urgent" />

            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default AdminOrder;
