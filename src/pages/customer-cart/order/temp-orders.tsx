import LoadingSpinner from "@/components/loading";
import NoData from "@/components/no-data";
import Title from "@/components/title";
import TempOrdersTable from "./temp-orders-table";
import { getTempOrdersQuery } from "@/api/cutomer-cart/order/temp-orders-query";

const TempOrdersPage = () => {
  const { data, isLoading } = getTempOrdersQuery({ page: 1, limit: 10 });

  return (
    <div className="flex flex-col gap-4 mx-auto p-4">
      <Title title="Temporary Orders" />

      {isLoading && <LoadingSpinner />}

      {data?.orders.length === 0 && !isLoading ? (
        <NoData />
      ) : (
        <div className="overflow-x-auto">
          <TempOrdersTable data={data?.orders || []} />
        </div>
      )}
    </div>
  );
};

export default TempOrdersPage;
