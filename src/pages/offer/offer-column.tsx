import { ColumnDef } from "@tanstack/react-table";
import { Offer } from "@/api/offer/type";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Pen } from "lucide-react";
import DeleteDialog from "@/components/delete-dialog";
import { deleteOfferMutation } from "@/api/offer/offer-query";
import { DataTable } from "@/components/ui/data-table";

const OfferTbale = ({ offers }: { offers: Offer[] }) => {
  const { mutate, isPending } = deleteOfferMutation();

  const offerColumns: ColumnDef<Offer>[] = [
    {
      accessorKey: "_id",
      header: "Offer ID",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "expirationDate",
      header: "Expiration Date",
      cell: ({ row }) => format(new Date(row.original.expirationDate), "PPP"),
    },
    {
      accessorKey: "numberOfProductsHaveToBuy",
      header: "Number Of Products Have To Buy",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link
            to={"/offer/edit-product/" + row.original._id}
            className={buttonVariants({
              variant: "outline",
              className: "w-fit",
            })}
          >
            <Pen /> Producs
          </Link>

          <Link
            to={row.original._id}
            className={buttonVariants({
              variant: "outline",
              className: "w-fit",
            })}
          >
            <Pen />
          </Link>
          <DeleteDialog
            deleteFn={mutate}
            id={row.original._id}
            isLoading={isPending}
          />
        </div>
      ),
    },
  ];
  return <DataTable columns={offerColumns} data={offers} />;
};

export default OfferTbale;
