import { getTempOrderQuery } from "@/api/cutomer-cart/order/temp-orders-query";
import LoadingSpinner from "@/components/loading";
import Title from "@/components/title";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import RhfDialog from "@/components/rhf-dialog";
import LabeledData from "@/components/labeled-data";

const TempOrderPage = () => {
  const { id } = useParams();
  const { data, isLoading } = getTempOrderQuery(id!);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4 mx-auto p-4">
      <Title title="Temporary Order Details" />

      <div className="space-y-6">
        {/* Order Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Order Overview</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabeledData label="Order ID" value={data?.order._id} />
              <LabeledData
                label="Customer Phone"
                value={data?.order.customerPhone}
              />
              <LabeledData
                label="Customer URL"
                value={
                  <a
                    href={data?.order.customerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Customer
                  </a>
                }
              />
              <LabeledData
                label="Urgent"
                value={
                  <Badge
                    variant={data?.order.isUrgent ? "destructive" : "default"}
                  >
                    {data?.order.isUrgent ? "Yes" : "No"}
                  </Badge>
                }
              />
              <LabeledData
                label="Total Price"
                value={`$${data?.order.totalPrice}`}
              />
              <LabeledData label="Item Count" value={data?.order.itemCount} />
              <LabeledData
                label="Created At"
                value={format(new Date(data?.order.createdAt!), "PPP")}
              />
              <LabeledData
                label="Updated At"
                value={format(new Date(data?.order.updatedAt!), "PPP")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Admin Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <LabeledData
              label="Notes"
              value={data?.order.adminNotes || "No notes provided."}
            />
          </CardContent>
        </Card>

        {/* Creator Details */}
        <Card>
          <CardHeader>
            <CardTitle>Creator Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <LabeledData label="Name" value={data?.order.creator.name} />
            <LabeledData label="Email" value={data?.order.creator.email} />
            <LabeledData label="Phone" value={data?.order.creator.phone} />
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.order.products.map((product) => (
              <Card key={product._id}>
                <CardContent className="p-4 space-y-2">
                  <LabeledData label="Product" value={product.product.title} />
                  <LabeledData label="Price" value={`$${product.price}`} />
                  <LabeledData label="Size" value={product.size} />
                  <LabeledData label="Quantity" value={product.quantity} />
                  <LabeledData
                    label="Notes"
                    value={product.notes || "No notes provided."}
                  />
                  <div className="flex flex-wrap gap-2">
                    {product.product.images.map((image, index) => (
                      <RhfDialog
                        key={index}
                        trigger={
                          <img
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            className="h-10 w-10 object-cover rounded"
                          />
                        }
                        content={
                          <img src={image.url} className="object-cover" />
                        }
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TempOrderPage;
