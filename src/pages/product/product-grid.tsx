import { ProductType } from "@/api/products/type";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: ProductType[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductGrid = ({ products, onDelete, isDeleting }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
