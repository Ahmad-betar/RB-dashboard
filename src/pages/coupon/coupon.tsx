import { deleteCouponQuery, getCouponsQuery } from "@/api/coupon/coupon-query";
import LoadingSpinner from "@/components/loading";
import Title from "@/components/title";
import CouponCard from "./coupon-card";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const Coupon = () => {
  const { data, isLoading } = getCouponsQuery();
  const { mutate, isPending } = deleteCouponQuery();

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end mb-8">
      <Link
        to={"/add-coupon"}
        className={buttonVariants({ variant: "outline" ,className : "w-fit ml-auto"})}
      >
        + Add Coupon
      </Link>
      <Title title="Coupon" />

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
    </div>
  );
};

export default Coupon;
