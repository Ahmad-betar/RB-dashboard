import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/api/cutomer-cart/type";
import RhfDialog from "@/components/rhf-dialog";
import LabeledData from "@/components/labeled-data";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  changeCartItemQuery,
  removeFromCartQuery,
} from "@/api/cutomer-cart/customer-cart-query";
import CardText from "@/components/card-text";
import { useFormContext } from "react-hook-form";
import { Trash } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { watch } = useFormContext();
  const { mutate, isPending } = changeCartItemQuery();
  const { mutate: remove, isPending: _isRemoving } = removeFromCartQuery();

  const email = watch("email");
  const phone = watch("phone");

  const changeCart = (quantity: number) => {
    mutate({
      email,
      phone,
      itemId: item._id,
      quantityChange: quantity,
    });
  };

  const removeHandler = () => {
    remove({ itemId: item._id, phone, email });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow relative">
      <CardHeader>
        <Button
          className={buttonVariants({
            variant: "outline",
            className: "w-fit absolute right-2 top-2",
          })}
          onClick={() => removeHandler}
        >
          <Trash className="stroke-error" />
        </Button>
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
                  onClick={() => changeCart(-1)}
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
                  onClick={() => changeCart(+1)}
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
              trigger={<img src={url} className="h-full object-cover w-full rounded"/>}
              content={<img src={url} className="object-cover" />}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
