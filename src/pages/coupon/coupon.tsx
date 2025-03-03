import { getCouponsQuery } from "@/api/coupon/coupon-query";
import LoadingSpinner from "@/components/loading";
import Title from "@/components/title";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import CouponFilter from "./coupon-filter";
import { CouponFilterType } from "@/api/coupon/type";
import RHFPagination from "@/components/rhf-pagination";
import CouponTable from "./coupon-table";

const Coupon = () => {
  const methods = useForm<CouponFilterType>({
    defaultValues: { status: "true" as "active" },
  });
  const values = methods.watch();
  const status = methods.watch("status") ?? "active";

  const { data, isLoading } = getCouponsQuery({
    ...values,
    status: status ? "active" : "expired",
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <FormProvider {...methods}>
      <div className="flex gap-8 flex-col justify-end mb-8">
        <Link
          to={"/add-coupon"}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit ml-auto",
          })}
        >
          + Add Coupon
        </Link>

        <Title title="Coupon" />

        <CouponFilter />

        <CouponTable data={data?.data!} />

        <RHFPagination
          hasNextPage={false}
          hasPreviousPage={false}
          page={1}
          totalPages={1}
          onPageChange={(page) => {
            methods.setValue("page", page);
          }}
        />
      </div>
    </FormProvider>
  );
};

export default Coupon;
