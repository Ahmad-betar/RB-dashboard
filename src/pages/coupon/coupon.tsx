import { deleteCouponQuery, getCouponsQuery } from "@/api/coupon/coupon-query";
import CardText from "@/components/card-text";
import DeleteDialog from "@/components/delete-dialog";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Coupon = () => {
  const { data, isLoading } = getCouponsQuery();
  const { mutate, isPending } = deleteCouponQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end">
      <Title title="Coupon" />

      {/* <AddGovernorates /> */}

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.data.length !== 0 &&
          data?.data.map(
            ({
              _id,
              code,
              discount,
              creator,
              discountType,
              expirationDate,
              maxDiscount,
              minOrderAmount,
              usageLimit,
              usedCount,
              validFor,
              createdAt,
            }) => (
              <Card className="flex flex-col justify-between" key={_id}>
                <CardContent className="flex flex-col gap-2 font-light p-4">
                  <CardText title="Code: " value={code} />
                  <CardText title="Discount: " value={discount} />
                  <CardText title="DiscountType: " value={discountType} />
                  <CardText
                    title="ExpirationDate: "
                    value={expirationDate.toString()}
                  />
                  <CardText title="MaxDiscount: " value={maxDiscount} />
                  <CardText title="MinOrderAmount: " value={minOrderAmount} />
                  <CardText title="UsedCount: " value={usedCount} />
                  <CardText title="UsageLimit: " value={usageLimit} />
                  <CardText
                    title="ValidFor: "
                    value={
                      <span className="flex gap-1 w-fit">
                        {validFor?.map(({ title }) => (
                          <Badge variant={"outline"}>{title}</Badge>
                        ))}
                      </span>
                    }
                  />
                  {creator !== null && (
                    <CardText title="Creator name: " value={creator.name} />
                  )}
                  {creator !== null && (
                    <CardText title="Creator Email: " value={creator.email} />
                  )}
                  <CardText title="CreatedAt: " value={createdAt.toString()} />
                </CardContent>

                <CardFooter className="flex self-end justify-end gap-2">
                  <DeleteDialog
                    id={_id}
                    deleteFn={mutate}
                    isLoading={isPending}
                  />
                </CardFooter>
              </Card>
            )
          )}
        {data?.data.length === 0 && <NoData />}
      </div>
    </div>
  );
};

export default Coupon;
