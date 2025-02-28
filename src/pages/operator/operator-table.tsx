import { deleteOperatorQuery } from "@/api/operators/operators-query";
import { Operator } from "@/api/operators/type";
import DeleteDialog from "@/components/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface OperatorTableProps {
  data: Operator[];
}
const OperatorTable = ({ data }: OperatorTableProps) => {
  const { mutate, isPending } = deleteOperatorQuery();

  const columns: ColumnDef<Operator>[] = [
    {
      accessorKey: "_id",
      header: "Operator ID",
    },
    {
      accessorKey: "name",
      header: "Operator Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => `${row.original.email}`,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <Badge variant={"outline"}>{row.original.phone}</Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <DeleteDialog
            deleteFn={mutate}
            id={row.original._id}
            isLoading={isPending}
          />
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default OperatorTable;
