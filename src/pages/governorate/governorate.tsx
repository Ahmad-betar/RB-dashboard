import {
  deleteGovernorateQuery,
  getGovernoratesQuery,
} from "@/api/governorates/governorates-query";
import DeleteDialog from "@/components/delete-dialog";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HousePlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import AddGovernorates from "./add-governorates";
import Title from "@/components/title";
import LabeledData from "@/components/labeled-data";

const Governorate = () => {
  const { id } = useParams();
  const { data, isLoading } = getGovernoratesQuery(id!);
  const { mutate, isPending } = deleteGovernorateQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end">
      <Title title="Governorate" />

      <AddGovernorates />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.length !== 0 &&
          data?.map(({ _id, name }) => (
            <Card key={_id}>
              <CardContent className="font-semibold p-4">
                <LabeledData label="Name" value={name} />
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Link
                  to={_id}
                  className={buttonVariants({ variant: "outline" })}
                >
                  <HousePlus />
                </Link>

                <DeleteDialog
                  id={_id}
                  deleteFn={mutate}
                  isLoading={isPending}
                />
              </CardFooter>
            </Card>
          ))}
        {data?.length === 0 && <NoData />}
      </div>
    </div>
  );
};

export default Governorate;
