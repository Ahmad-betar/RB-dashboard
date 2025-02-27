import { useForm } from "react-hook-form";
import { addCouponQuery } from "@/api/coupon/coupon-query";
import { Button } from "@/components/ui/button";
import TextField from "@/components/TextField";
import { CouponFormValues } from "@/api/coupon/type";
import RHFSelect from "@/components/rhf-select";
import RHFCalendar from "@/components/rhf-calendar";
import { getProductsQuery } from "@/api/products/products-query";
import LoadingSpinner from "@/components/loading";
import RHFMultiSelectForm from "@/components/rhf-multi-select";

const AddCoupon = () => {
  const { mutate, isPending } = addCouponQuery();
  const { data, isLoading } = getProductsQuery();
  const { control, handleSubmit, reset } = useForm<CouponFormValues>({
    defaultValues: {
      code: "",
      discount: 0,
      discountType: "value",
      maxDiscount: 0,
      minOrderAmount: 0,
      usageLimit: 1,
      expirationDate: new Date(),
      validFor: [],
    },
  });

  const validForItems = data?.data.map(({ _id, title }) => ({
    label: title,
    value: _id,
  }));

  const onSubmit = (data: CouponFormValues) => {
    mutate(
      {
        ...data,
        expirationDate: new Date(data.expirationDate).toLocaleDateString(),
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Coupon</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Code */}
        <TextField
          required
          control={control}
          name="code"
          label="Coupon Code"
          placeholder="Enter coupon code"
        />

        {/* Discount */}
        <TextField
          required
          control={control}
          name="discount"
          label="Discount"
          placeholder="Enter discount"
          type="number"
          min={1}
        />

        {/* Discount Type */}
        <div className="space-y-2">
          <RHFSelect
            required
            label="Discount Type"
            control={control}
            name="discountType"
            items={[
              { label: "Percentage", value: "percentage" },
              { label: "Fixed Value", value: "value" },
            ]}
          />
        </div>

        {/* Max Discount */}
        <TextField
          required
          control={control}
          name="maxDiscount"
          label="Max Discount"
          placeholder="Enter max discount"
          type="number"
        />

        {/* Min Order Amount */}
        <TextField
          control={control}
          name="minOrderAmount"
          label="Min Order Amount"
          placeholder="Enter min order amount"
          type="number"
        />

        {/* Usage Limit */}
        <TextField
          control={control}
          name="usageLimit"
          label="Usage Limit"
          placeholder="Enter usage limit"
          type="number"
        />

        {/* Expiration Date */}
        <div className="space-y-2">
          <RHFCalendar
            control={control}
            name="expirationDate"
            label="Expiration Date"
          />
        </div>

        {/* Valid For (Categories) */}
        <div className="space-y-2">
          <RHFMultiSelectForm
            name="validFor"
            control={control}
            label="Valid For Products"
            options={validForItems ?? []}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Adding..." : "Add Coupon"}
        </Button>
      </form>
    </div>
  );
};

export default AddCoupon;
