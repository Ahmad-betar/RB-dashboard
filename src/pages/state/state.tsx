import { deleteStateQuery, getStatesQuery } from "@/api/state/state-query";
import LoadingSpinner from "@/components/loading";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DeleteDialog from "@/components/delete-dialog";
import EditState from "./edit-state";
import AddState from "./add-state";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { Landmark } from "lucide-react";
import NoData from "@/components/no-data";
import Title from "@/components/title";

const State = () => {
  const { data, isLoading } = getStatesQuery();
  const { mutate: deleteState, isPending: isDeleting } = deleteStateQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end">
      <Title title="State" />

      <AddState />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.length !== 0 &&
          data?.map(
            ({ _id, deliveryCostPerKilo, firstKiloDeliveryCost, name }) => (
              <Card key={_id}>
                <CardContent className="font-semibold p-4">
                  <h2>Name: {name}</h2>
                  <p>First Kilo Delivery Cost: {firstKiloDeliveryCost}</p>
                  <p>Delivery Cost Per Kilo: {deliveryCostPerKilo}</p>
                </CardContent>

                <CardFooter className="flex justify-end gap-2">
                  <Link
                    to={"/state/" + _id}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Landmark />
                  </Link>

                  <EditState _id={_id} />

                  <DeleteDialog
                    id={_id}
                    deleteFn={deleteState}
                    isLoading={isDeleting}
                  />
                </CardFooter>
              </Card>
            )
          )}
        {data?.length === 0 && <NoData />}
      </div>
    </div>
  );
};

export default State;
