import { ColumnDef } from "@tanstack/react-table";
import { CartItem } from "@/api/cutomer-cart/type";
import { Button } from "@/components/ui/button";
import {
  changeCartItemQuery,
  removeFromCartQuery,
} from "@/api/cutomer-cart/customer-cart-query";
import DeleteDialog from "@/components/delete-dialog";
import RhfDialog from "@/components/rhf-dialog";

export const cartColumns: ColumnDef<CartItem>[] = [
  {
    accessorKey: "product.title",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const { mutate: changeQuantity, isPending: isChanging } =
        changeCartItemQuery();
      const item = row.original;

      const handleQuantityChange = (quantity: number) => {
        changeQuantity({
          itemId: item._id,
          quantityChange: quantity,
        });
      };

      return (
        <div className="flex items-center gap-2">
          <Button
            disabled={isChanging}
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(-1)}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            disabled={isChanging}
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(+1)}
          >
            +
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "product.productType.name",
    header: "Type",
  },
  {
    accessorKey: "product.images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.original.product.images;
      return (
        <div className="flex flex-wrap gap-2">
          {images.map(({ url }, index) => (
            <RhfDialog
              key={index}
              trigger={
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="h-10 w-10 object-cover rounded"
                />
              }
              content={<img src={url} className="object-cover" />}
            />
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { mutate: remove, isPending: isRemoving } = removeFromCartQuery();
      const item = row.original;

      const handleRemove = () => {
        remove({ itemId: item._id });
      };

      return (
        <DeleteDialog
          id={item._id}
          deleteFn={handleRemove}
          isLoading={isRemoving}
        />
      );
    },
  },
];
