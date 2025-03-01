import Title from "@/components/title";
import AddCity from "./add-city";
import { deleteCityQuery, getCitiesQuery } from "@/api/city/city-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DeleteDialog from "@/components/delete-dialog";
import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import LabeledData from "@/components/labeled-data";

const City = () => {
  const { GovernorateId } = useParams();
  const { data, isLoading } = getCitiesQuery(GovernorateId!);
  const { mutate, isPending } = deleteCityQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex gap-8 flex-col justify-end">
      <Title title="City" />

      <AddCity />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {data?.length !== 0 &&
          data?.map(({ _id, name }) => (
            <Card key={_id}>
              <CardContent className="font-semibold p-4">
                <LabeledData label="Name" value={name} />
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                {/* <EditState _id={_id} /> */}

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

export default City;
