import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Customer } from "@/api/customer/type";

interface OrdersTableProps {
  data: Customer[];
}
const CustomerTable = ({ data }: OrdersTableProps) => {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "id",
      header: "Customer ID",
    },
    {
      accessorKey: "name",
      header: "Customer Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <>{row.original.email}</>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <Badge variant={"outline"}>{row.original.phone}</Badge>
      ),
    },
    {
      accessorKey: "lastActivity",
      header: "Last Activity",
      cell: ({ row }) =>
        new Date(row.original.lastActivity).toLocaleDateString(),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default CustomerTable;
