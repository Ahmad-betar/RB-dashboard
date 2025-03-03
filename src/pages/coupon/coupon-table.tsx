import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { couponType } from "@/api/coupon/type";
import { DataTable } from "@/components/ui/data-table";
import DeleteDialog from "@/components/delete-dialog";
import { deleteCouponQuery } from "@/api/coupon/coupon-query";

const CouponTable = ({ data }: { data: couponType[] }) => {
  const { mutate, isPending } = deleteCouponQuery();

  const couponColumns: ColumnDef<couponType>[] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "discount",
      header: "Discount",
    },
    {
      accessorKey: "maxDiscount",
      header: "Max Discount",
    },
    {
      accessorKey: "expirationDate",
      header: "Expiration Date",
      cell: ({ row }) => (
        <>{format(new Date(row.original.expirationDate), "PPP")}</>
      ),
    },
    {
      accessorKey: "minOrderAmount",
      header: "Min Order Amount",
    },
    {
      accessorKey: "discountType",
      header: "Discount Type",
    },
    {
      accessorKey: "usageLimit",
      header: "Usage Limit",
    },
    {
      accessorKey: "usedCount",
      header: "Used Count",
    },
    {
      accessorKey: "creator",
      header: "Creator",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span>{row.original.creator?.name}</span>
          <span>{row.original.creator?.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "validFor",
      header: "Valid For",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.validFor.map(({ title }) => (
            <Badge>{title}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
      accessorKey: "Action",
      header: "Action",
      cell: ({ row }) => (
        <DeleteDialog
          id={row.original._id}
          deleteFn={mutate}
          isLoading={isPending}
        />
      ),
    },
  ];
  return <DataTable columns={couponColumns} data={data} />;
};

export default CouponTable;
