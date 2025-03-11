import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import { getOfferQuery } from "@/api/offer/offer-query";
import LoadingSpinner from "@/components/loading";

const OfferDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = getOfferQuery(id!);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Offer Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{data?.data.description}</h2>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Expires on:{" "}
          {new Date(data?.data.expirationDate!).toLocaleDateString()}
        </Badge>
      </div>

      {/* Call to Action */}
      <div className="mt-8 flex justify-center">
        <Button className="px-8 font-bold">
          {t("form.add_to_cart")} ({data?.data.numberOfProductsHaveToBuy}{" "}
          required)
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {data?.data.products.map(({ product, newPrice, notes }) => (
          <Card key={product._id} className="hover:shadow-md transition-shadow">
            <CardHeader className="p-0">
              <img
                src={product.images[0]?.url}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>

              {/* Price and Discount */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm line-through text-gray-500">
                  {product.price.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-green-600">
                  {newPrice}
                </span>
              </div>

              {/* Notes */}
              {notes && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Notes:</span> {notes}
                  </p>
                </div>
              )}

              {/* Available Sizes */}
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Available Sizes:</span>{" "}
                  {product.availableSizes.join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfferDetails;
