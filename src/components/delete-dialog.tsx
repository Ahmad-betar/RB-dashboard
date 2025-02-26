import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { UseMutateFunction } from "@tanstack/react-query";
import { Trash } from "lucide-react";
// import LoadingSpinner from "./loading";
import { toast } from "sonner";

const DeleteDialog = ({
  id,
  isLoading,
  deleteFn,
}: {
  id: string;
  deleteFn: UseMutateFunction<any, Error, string, unknown>;
  isLoading: boolean;
}) => {
  const handleDelete = () => {
    deleteFn(id, {
      onSuccess() {
        toast("Deleted successfully");
      },
      onError() {
        toast("Failed to delete");
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash className="stroke-red-500" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className={buttonVariants({
              colorScheme: "error",
            })}
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
