import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/api/cutomer-cart/type";
import RhfDialog from "@/components/rhf-dialog";
import LabeledData from "@/components/labeled-data";
import { Button } from "@/components/ui/button";
import { changeCartItemQuery } from "@/api/cutomer-cart/customer-cart-query";
import CardText from "@/components/card-text";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { mutate, isPending } = changeCartItemQuery();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{item.product.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <LabeledData label="Price" value={"$" + item.product.price} />

          <CardText
            title="Quantity"
            value={
              <div className="flex justify-center rounded border w-fit">
                <Button
                  disabled={isPending}
                  variant={"ghost"}
                  className="w-5"
                  onClick={() => {}}
                >
                  -
                </Button>
                <p className="flex items-center justify-center">
                  {item.quantity}
                </p>
                <Button
                  disabled={isPending}
                  variant={"ghost"}
                  className="w-5"
                  onClick={() => {}}
                >
                  +
                </Button>
              </div>
            }
          />

          <LabeledData label="Size" value={item.size} />

          <LabeledData label="Notes" value={item.notes} />
        </div>

        {/* Images Dialog */}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.product.images.map(({ url }, index) => (
            <RhfDialog
              key={index}
              trigger={<img src={url} />}
              content={<img src={url} />}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
