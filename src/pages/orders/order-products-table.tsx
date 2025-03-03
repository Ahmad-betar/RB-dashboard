import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { ProductType } from "@/api/order/type";

interface ProductListProps {
  products: ProductType[];
}

const ProductsTable = (data: ProductListProps) => {
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <>{row.original.title ?? ""}</>,
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "size",
      header: "Size",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ];

  return <DataTable columns={columns} data={data.products} />;
};

export default ProductsTable;
