import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Offer } from "@/api/offer/type";
import LabeledData from "@/components/labeled-data";
import { deleteOfferMutation } from "@/api/offer/offer-query";
import DeleteDialog from "@/components/delete-dialog";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const { mutate, isPending } = deleteOfferMutation();

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg">{offer.description}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              new Date(offer.expirationDate) > new Date()
                ? "default"
                : "destructive"
            }
          >
            {new Date(offer.expirationDate) > new Date() ? "Active" : "Expired"}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Expires on: {format(new Date(offer.expirationDate), "PPP")}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <LabeledData
            label="Products to Buy:"
            value={offer.numberOfProductsHaveToBuy}
          />

          {/* Display Products */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Products:</p>

            {offer.products.map((product) => (
              <div key={product._id} className="pl-4 border-l-2 border-muted">
                <LabeledData label="Product ID:" value={product.product} />

                <LabeledData
                  label="New Price:"
                  value={"$" + product.newPrice}
                />
                <LabeledData label="Notes:" value={product.notes} />
                <Separator />
              </div>
            ))}
          </div>

          {/* Created and Updated Dates */}
          <div className="text-sm text-muted-foreground">
            <p>Created: {format(new Date(offer.createdAt), "PPP")}</p>
            <p>Updated: {format(new Date(offer.updatedAt), "PPP")}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Link
          to={"/offer/edit-product/" + offer._id}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit",
          })}
        >
          <Pen /> Producs
        </Link>

        <Link
          to={offer._id}
          className={buttonVariants({
            variant: "outline",
            className: "w-fit",
          })}
        >
          <Pen />
        </Link>
        <DeleteDialog deleteFn={mutate} id={offer._id} isLoading={isPending} />
      </CardFooter>
    </Card>
  );
};

export default OfferCard;
