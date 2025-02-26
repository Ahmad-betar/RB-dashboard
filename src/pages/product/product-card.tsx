import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pen, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DeleteDialog from "@/components/delete-dialog";
import { ProductType } from "@/api/products/type";
import { API_BASE_URL } from "@/api/axios";

interface ProductCardProps {
  product: ProductType;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductCard = ({ product, onDelete, isDeleting }: ProductCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img
          src={`${API_BASE_URL}${product.logoUrl}`}
          alt={product.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{product.title}</CardTitle>

        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {product.description}
        </p>
        <div className="mt-4 space-y-2">
          <p className="text-sm">
            <span className="font-medium">Price:</span> ${product.price}
          </p>
          <p className="text-sm">
            <span className="font-medium">Weight:</span> {product.weight}
          </p>
          <p className="text-sm">
            <span className="font-medium">Type:</span>{" "}
            {product.productType.name}
          </p>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Link to={`/action-product/${product._id}`}>
            <Button variant="outline" size="icon">
              <Pen className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={product._id}
            deleteFn={onDelete}
            isLoading={isDeleting}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
