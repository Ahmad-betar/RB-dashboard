import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { OrderType } from "@/api/order/type";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

interface OrdersTableProps {
  data: OrderType[];
}

const OrdersTable = ({ data }: OrdersTableProps) => {
  const columns: ColumnDef<OrderType>[] = [
    {
      accessorKey: "customer.name",
      header: "Customer Name",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => `$${row.original.totalAmount}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={"outline"}>{row.original.status}</Badge>
      ),
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            to={`/orders/${row.original._id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default OrdersTable;
