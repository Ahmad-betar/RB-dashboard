import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderType } from "@/api/order/type";
import LabeledData from "./labeled-data";
import { Link } from "react-router-dom";

interface OrderCardProps {
  order: OrderType;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Link to={order._id}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="flex flex-col items-start justify-between">
            <span>Order #</span>
            <span>{order._id}</span>

            <Badge
              className="absolute top-5 right-5"
              variant={order.isUrgent ? "destructive" : "default"}
            >
              {order.isUrgent ? "Urgent" : "Normal"}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <LabeledData label="Customer" value={order.customer.name} />

          <LabeledData
            label="Total Amount"
            value={`$${order.totalAmount.toLocaleString()}`}
          />

          <LabeledData
            label="Delivery State"
            value={order.deliveryAddress.state.name}
          />

          <LabeledData
            label="Status"
            value={<Badge variant="outline">{order.status}</Badge>}
          />

          <LabeledData
            label="Order Date"
            value={new Date(order.createdAt).toLocaleDateString()}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default OrderCard;
