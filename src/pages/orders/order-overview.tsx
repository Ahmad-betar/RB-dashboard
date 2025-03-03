import { OrderDetailsType } from "@/api/order/type";
import LabeledData from "@/components/labeled-data";
import { Badge } from "@/components/ui/badge";

interface OrderOverviewProps {
  order: OrderDetailsType;
}

const OrderProductsTable = ({ order }: OrderOverviewProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Order Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <LabeledData label="Order ID" value={order?.orderId} />

        <LabeledData
          label="Order Date"
          value={new Date(order?.orderDate).toLocaleDateString()}
        />

        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge variant="outline">{order?.status}</Badge>
        </div>

        <LabeledData label="Total Cost" value={"$" + order?.FinalCost} />

        <LabeledData label="Delivery Cost" value={"$" + order?.deliveryCost} />

        <div>
          <p className="text-sm text-muted-foreground">Paid</p>
          <Badge variant={order?.isPaid ? "success" : "destructive"}>
            {order?.isPaid ? "Yes" : "No"}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Urgent</p>
          <Badge variant={!order?.isUrgent ? "default" : "destructive"}>
            {order?.isUrgent ? "Yes" : "No"}
          </Badge>
        </div>
        {order?.coupon && (
          <LabeledData
            label="Coupon"
            value={`${order.coupon.code} (${order.coupon.discount}د.ك off)`}
          />
        )}
      </div>
    </div>
  );
};

export default OrderProductsTable;
