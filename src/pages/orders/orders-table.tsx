import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { OrderType } from "@/api/order/type";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Import a checkbox component
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import RHFSelect from "@/components/rhf-select";
import { useForm } from "react-hook-form";
import { changeOrderStatusMutation } from "@/api/order/orders-query";

interface OrdersTableProps {
  data: OrderType[];
}

const OrdersTable = ({ data }: OrdersTableProps) => {
  const { control, watch, setValue } = useForm();
  const [Table, setTable] = useState<any>();
  const { mutate, isPending } = changeOrderStatusMutation();

  const getDataHandler = (table: any) => {
    setTable(table.getSelectedRowModel().rows);
  };

  useEffect(() => {
    if (Table?.length > 0) {
      Table?.map((row: any) =>
        mutate({ id: row.original._id, payload: watch("status") })
      );

      setValue("status", null);
    }
  }, [watch("status")]);

  const columns: ColumnDef<OrderType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
        <Badge variant={row.original.status as any}>
          {row.original.status}
        </Badge>
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

  return (
    <>
      <DataTable columns={columns} data={data} getData={getDataHandler} />
      <TableFooter>
        <TableRow>
          <TableCell>Selected Orders: {Table?.length}</TableCell>
          <TableCell>
            <RHFSelect
              control={control}
              placeholder="Change Order Status"
              items={[
                // { label: "Pending", value: "Pending" },
                { label: "Processing", value: "Processing" },
                { label: "Cut", value: "Cut" },
                { label: "Sewn", value: "Sewn" },
                { label: "Delivering", value: "Delivering" },
                { label: "Completed", value: "Completed" },
              ]}
              name="status"
              label=""
              disabled={Table?.length === 0 || isPending}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
};

export default OrdersTable;
