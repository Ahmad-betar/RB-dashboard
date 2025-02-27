import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CardText from "@/components/card-text";
import DeleteDialog from "@/components/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { couponType } from "@/api/coupon/type";

interface CouponCardProps {
  coupon: couponType;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const CouponCard = ({ coupon, onDelete, isDeleting }: CouponCardProps) => {

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Section 1: Coupon Details */}
        <CardText title="Coupon Details" value="" isSectionHeader withDivider />
        <CardText title="Code" value={coupon.code} />
        <CardText
          title="Discount"
          value={`${coupon.discount}${coupon.discountType === "percentage" ? "%" : ""}`}
        />
        <CardText
          title="Expiration Date"
          value={new Date(coupon.expirationDate).toLocaleDateString()}
          withDivider
        />

        {/* Section 2: Usage Limits */}
        <CardText title="Usage Limits" value="" isSectionHeader withDivider />
        <CardText title="Max Discount" value={coupon.maxDiscount} />
        <CardText title="Min Order Amount" value={coupon.minOrderAmount} />
        <CardText title="Used Count" value={coupon.usedCount} />
        <CardText title="Usage Limit" value={coupon.usageLimit} withDivider />

        {/* Section 3: Valid For */}
        {coupon.validFor.length !== 0 && (
          <>
            <CardText title="Valid For" value="" isSectionHeader withDivider />

            <CardText
              title="Products"
              value={
                <span className="flex gap-1 flex-wrap">
                  {coupon.validFor?.map(({ title }) => (
                    <Badge variant={"outline"} key={title}>
                      {title}
                    </Badge>
                  ))}
                </span>
              }
              withDivider
            />
          </>
        )}

        {/* Section 4: Creator Info */}
        {coupon.creator && (
          <>
            <CardText
              title="Creator Info"
              value=""
              isSectionHeader
              withDivider
            />
            <CardText title="Name" value={coupon.creator.name} />
            <CardText title="Email" value={coupon.creator.email} withDivider />
          </>
        )}

        {/* Section 5: Created At */}
        <CardText
          title="Created At"
          value={new Date(coupon.createdAt).toLocaleDateString()}
        />
      </CardContent>

      {/* Delete Button */}
      <CardFooter className="flex self-end justify-end p-4">
        <DeleteDialog
          id={coupon._id}
          deleteFn={() => onDelete(coupon._id)}
          isLoading={isDeleting}
        />
      </CardFooter>
    </Card>
  );
};

export default CouponCard;
