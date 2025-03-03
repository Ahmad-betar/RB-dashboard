import { ColumnDef } from "@tanstack/react-table";
import { GetTempOrdersResponse } from "@/api/cutomer-cart/order/type";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { buttonVariants } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const tempOrderColumns: ColumnDef<GetTempOrdersResponse["orders"][0]>[] =
  [
    {
      accessorKey: "_id",
      header: "Order ID",
    },
    {
      accessorKey: "customerPhone",
      header: "Customer Phone",
    },
    {
      accessorKey: "customerUrl",
      header: "Customer URL",
      cell: ({ row }) => (
        <a
          href={row.original.customerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Customer
        </a>
      ),
    },
    {
      accessorKey: "isUrgent",
      header: "Urgent",
      cell: ({ row }) => (
        <Badge variant={row.original.isUrgent ? "destructive" : "default"}>
          {row.original.isUrgent ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => `$${row.original.totalPrice}`,
    },
    {
      accessorKey: "itemCount",
      header: "Item Count",
    },
    {
      accessorKey: "adminNotes",
      header: "Admin Notes",
    },
    {
      accessorKey: "creator.name",
      header: "Creator",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
      accessorKey: "view",
      header: "View",
      cell: ({ row }) => (
        <Link
          to={row.original._id}
          className={buttonVariants({ variant: "outline" })}
        >
          <Eye />
        </Link>
      ),
    },
  ];
