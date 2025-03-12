import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CartTotalProps {
  totalPrice: number;
}

const CartTotal = ({ totalPrice }: CartTotalProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">
          Total Price: <span className="text-primary">{totalPrice}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default CartTotal;
