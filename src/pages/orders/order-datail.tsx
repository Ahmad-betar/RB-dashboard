import { getOneOrderQuery } from "@/api/order/orders-query";
import LoadingSpinner from "@/components/loading";
import Title from "@/components/title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import OrderOverview from "./order-overview";
import CustomerInfo from "./cutomer-info";
import DeliveryAddress from "./delivery-address";
import OrderNotes from "./order-notes";
import OrderProductsTable from "./order-products-table";

const Order = () => {
  const { id } = useParams();
  const { data, isLoading } = getOneOrderQuery(id!);

  const order = data?.order;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6">
      <Title title="Order Details" />

      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <OrderOverview order={order!} />

          <Separator />

          <CustomerInfo customer={order?.customer!} />

          <Separator />

          <DeliveryAddress address={order?.deliveryAddress!} />

          <Separator />

          <OrderNotes
            orderNotes={order?.orderNotes!}
            adminNotes={order?.adminNotes!}
          />

          <Separator />

          <OrderProductsTable products={order?.products!} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Order;
