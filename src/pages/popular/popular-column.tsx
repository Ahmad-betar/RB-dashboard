import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { getPopularResponse } from "@/api/popular/type";
import RhfDialog from "@/components/rhf-dialog";
import { useDeletePopularMutation } from "@/api/popular/popular-query";
import DeleteDialog from "@/components/delete-dialog";

const PopularTbale = ({ popular }: { popular: getPopularResponse[] }) => {
  const { mutate: Delete, isPending: isDeleting } = useDeletePopularMutation();

  const popularColumns: ColumnDef<getPopularResponse>[] = [
    {
      accessorKey: "product.title",
      header: "Product",
    },
    {
      accessorKey: "product.price",
      header: "Price",
    },
    {
      accessorKey: "product.images",
      header: "images",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.product.images.map(({ url }) => (
            <RhfDialog
              trigger={<img src={url} />}
              content={<img src={url} />}
            />
          ))}
        </div>
      ),
    },
    {
      accessorKey: "orderNumber",
      header: "Order Number",
    },
    {
      accessorKey: "Actions",
      header: "Actions",
      cell: ({ row }) => (
        <DeleteDialog
          deleteFn={Delete}
          isLoading={isDeleting}
          id={row.original._id}
        />
      ),
    },
  ];
  return <DataTable columns={popularColumns} data={popular ?? []} />;
};

export default PopularTbale;
