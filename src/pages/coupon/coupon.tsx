import { deleteCouponQuery, getCouponsQuery } from "@/api/coupon/coupon-query";
import LoadingSpinner from "@/components/loading";
import Title from "@/components/title";
import CouponCard from "./coupon-card";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import CouponFilter from "./coupon-filter";
import { CouponFilterType } from "@/api/coupon/type";
import RHFPagination from "@/components/rhf-pagination";

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

  const { mutate, isPending } = deleteCouponQuery();
  const handleDelete = (id: string) => {
    mutate(id);
  };

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data?.data.map((coupon) => (
            <CouponCard
              key={coupon._id}
              coupon={coupon}
              onDelete={handleDelete}
              isDeleting={isPending}
            />
          ))}
        </div>

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
