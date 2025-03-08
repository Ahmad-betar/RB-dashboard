import { ColumnDef } from "@tanstack/react-table";
import { Pen, Video } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/api/products/type";
import RhfDialog from "@/components/rhf-dialog";
import DeleteDialog from "@/components/delete-dialog";
import { deleteProductsQuery } from "@/api/products/products-query";

const ProductsTable = ({ data }: { data: ProductType[] }) => {
  const { mutate: deleteProduct, isPending: isDeleting } =
    deleteProductsQuery();

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "title",
      header: "Product Name",
    },
    // {
    //   accessorKey: "description",
    //   header: "Product Description",
    // },
    {
      accessorKey: "price",
      header: "Product Price",
    },
    {
      accessorKey: "weight",
      header: "Product Weight",
    },
    {
      accessorKey: "productType",
      header: "Product Type",
      cell: ({ row }) => <p>{row.original.productType?.name}</p>,
    },
    {
      accessorKey: "availableSizes",
      header: "Product Available Sizes",
    },
    {
      accessorKey: "logo",
      header: "Logo",
      cell: ({ row }) => (
        <RhfDialog
          trigger={
            <img
              src={row.original.logo.url}
              className="w-full h-full object-cover rounded-sm"
            />
          }
          content={
            <img
              src={row.original.logo.url}
              className="w-full h-full object-contain rounded-lg"
            />
          }
        />
      ),
    },
    // {
    //   accessorKey: "images",
    //   header: "Images",
    //   cell: ({ row }) => (
    //     <div className="flex gap-2">
    //       {row.original.images.map(({ url }) => (
    //         <RhfDialog
    //           trigger={
    //             <img
    //               src={url}
    //               className="w-full h-full object-cover rounded-sm"
    //             />
    //           }
    //           content={
    //             <img
    //               src={url}
    //               className="w-full h-full object-contain rounded-lg"
    //             />
    //           }
    //         />
    //       ))}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "videos",
      header: "Videos",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.videos.map(({ url }) => (
            <RhfDialog
              trigger={<Video className="w-10 h-10" />}
              content={
                <video controls className="w-full h-full rounded-lg">
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
            />
          ))}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({
        row: {
          original: { _id },
        },
      }) => (
        <div className="flex justify-between gap-2">
          <Link to={`/action-product/${_id}`}>
            <Button variant="outline" size="icon">
              <Pen className="h-4 w-4" />
            </Button>
          </Link>

          <DeleteDialog
            id={_id}
            deleteFn={deleteProduct}
            isLoading={isDeleting}
          />
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default ProductsTable;
