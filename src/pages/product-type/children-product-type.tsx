import {
  deleteProductType,
  getChildrenProductTypes,
} from "@/api/product-type/product-type-query";
import DeleteDialog from "@/components/delete-dialog";
import LabeledData from "@/components/labeled-data";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useLocation, useParams } from "react-router-dom";

const ChildrenProductType = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { data, isLoading } = getChildrenProductTypes(id!);
  const { mutate, isPending } = deleteProductType();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end">
      <Title title={"Children Product Type: " + state} />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.productTypes.length !== 0 &&
          data?.productTypes.map(({ _id, name, image: { url } }) => (
            <Card key={_id}>
              <CardHeader className="p-0">
                <img src={url} className="rounded-md object-cover h-60" />
              </CardHeader>

              <CardContent className="font-semibold p-4">
                <LabeledData label="Name:" value={name} />
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <DeleteDialog
                  id={_id}
                  deleteFn={mutate}
                  isLoading={isPending}
                />
              </CardFooter>
            </Card>
          ))}
        {data?.productTypes.length === 0 && <NoData />}
      </div>
    </div>
  );
};

export default ChildrenProductType;
