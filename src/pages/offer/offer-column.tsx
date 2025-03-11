import { ColumnDef } from "@tanstack/react-table";
import { Offer } from "@/api/offer/type";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Eye, Pen } from "lucide-react";
import DeleteDialog from "@/components/delete-dialog";
import { deleteOfferMutation } from "@/api/offer/offer-query";
import { DataTable } from "@/components/ui/data-table";
import RhfDialog from "@/components/rhf-dialog";

const OfferTbale = ({ offers }: { offers: Offer[] }) => {
  const { mutate, isPending } = deleteOfferMutation();

  const offerColumns: ColumnDef<Offer>[] = [
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "expirationDate",
      header: "Expiration Date",
      cell: ({ row }) =>
        new Date(row.original.expirationDate).toLocaleDateString(),
    },
    {
      accessorKey: "numberOfProductsHaveToBuy",
      header: "Number Of Products Have To Buy",
    },
    {
      accessorKey: "image",
      header: "image",
      cell: ({ row }) => (
        <RhfDialog
          content={<img className={row.original.image?.url} />}
          trigger={<img className={row.original.image?.url} />}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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

          <Link
            to={"view/" + row.original._id}
            className={buttonVariants({
              variant: "outline",
              className: "w-fit",
            })}
          >
            <Eye />
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
