import LabeledData from "@/components/labeled-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductListProps {
  products: {
    title: string;
    quantity: number;
    price: number;
    size: number;
    notes: string;
  }[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Products</h3>
      <div className="space-y-4">
        {products?.map((product, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LabeledData label="Quantity" value={product.quantity} />

                <LabeledData label="Price" value={product.quantity} />

                <LabeledData label="Size" value={product.size} />

                <LabeledData
                  label="Notes"
                  value={product.notes || "No notes provided."}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
